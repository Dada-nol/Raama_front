import { LockClosedIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../components/ui/Input";

/**
 * Page de création d'un nouveau Souvenir.
 *
 * Fonctionnalités :
 * - Permet à l'utilisateur de créer un souvenir en sélectionnant un type de mémoire disponible.
 * - Permet de saisir un titre et d'uploader une image de couverture (max 10 Mo).
 * - Récupère les types de mémoire depuis l'API au montage du composant.
 * - Envoie les données via un `POST` à l'API `/souvenir` avec FormData pour l'upload.
 * - Gestion des erreurs de validation et affichage des messages.
 * - Redirection vers `/souvenir` après création réussie.
 *
 * Composants internes utilisés :
 * - Input : champ de saisie réutilisable.
 * - LockClosedIcon : icône pour indiquer un type de mémoire indisponible.
 *
 * @module Create
 * @returns {JSX.Element} Formulaire de création d'un nouveau souvenir
 */
function Create() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [memoryType, setMemoryType] = useState([]);
  const [selectedMemoryType, setSelectedMemoryType] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [errors, setErrors] = useState({});

  const [searchParams] = useSearchParams();
  const memoryTypeId = searchParams.get("memory_type_id");

  const navigate = useNavigate();

  // Charger les memory types une seule fois au montage
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/memory-type");
        setMemoryType(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  // Mettre à jour le selectedMemoryType si memoryTypeId change
  useEffect(() => {
    if (memoryTypeId) {
      setSelectedMemoryType(Number(memoryTypeId));
    }
  }, [memoryTypeId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (coverImage && coverImage.size > 10 * 1024 * 1024) {
      setErrors({ cover_image: ["Le fichier est trop lourd (max 10Mo)."] });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("memory_type", selectedMemoryType);
    if (coverImage) {
      formData.append("cover_image", coverImage);
    }

    try {
      await axios.post("http://localhost:8000/api/souvenir", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // nécessaire pour l'upload
        },
      });

      navigate("/souvenir");
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2 className="flex flex-wrap justify-center items-center text-2xl font-medium">
        Création de votre <span className="text-gradient pl-1">Souvenir</span>
      </h2>

      <div className="m-8">
        <h3 className="text-lg font-medium">
          Choisissez votre type de Memoire
        </h3>
        <div className="flex flex-wrap justify-center p-4 gap-4">
          {memoryType.map((memory) =>
            memory.isAvailable ? (
              <button
                type="button"
                key={memory.id}
                onClick={() => setSelectedMemoryType(memory.id)}
                className="card h-28 relative w-80 p-4 shadow-md hover:shadow-lg group overflow-hidden  bg-secondary gradient-border transition-transform duration-300 hover:scale-105 hover:text-gradient"
              >
                <div
                  className={` 
    ${selectedMemoryType === memory.id ? "ring-4 ring-primary" : ""}
    flex items-center justify-center w-full h-full block text-lg font-medium text-text hover:text-gradient transition-colors`}
                >
                  {memory.title}
                </div>
              </button>
            ) : (
              <div className="cursor-not-allowed w-80 h-28 p-4 relative overflow-hidden bg-secondary border-2 border-danger opacity-60">
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1">
                  <LockClosedIcon className="w-6 h-6 text-white" />
                  <p className="text-white font-bold">{memory.title}</p>
                  <p className="text-sm text-gray-200">
                    Indisponible pour le moment
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        {errors.memory_type && (
          <p className="text-danger">{errors.memory_type[0]}</p>
        )}
      </div>

      <div className="border-2 border-primary rounded-lg m-8 flex flex-col lg:flex-row justify-center items-center gap-10 p-4">
        <div className="w-full max-w-md lg:max-w-sm">
          <h3 className="text-lg font-medium">Titre</h3>
          <Input
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>

          {errors.title && <p className="text-danger">{errors.title[0]}</p>}
        </div>

        <div className="">
          <h3 className="text-lg font-medium">Image de couverture</h3>
          <label className="inline-block bg-my-gradient text-white px-4 py-2 rounded cursor-pointer hover:brightness-110 hover:scale-105">
            Choisir une image
            <input
              type="file"
              name="cover_image"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="hidden"
            />
          </label>
          {coverImage && (
            <p className="mt-2 text-sm text-text">{coverImage.name}</p>
          )}
          {errors.cover_image && (
            <p className="text-danger">{errors.cover_image[0]}</p>
          )}
        </div>
      </div>

      <button
        className={`bg-my-gradient w-32 h-10 rounded-lg text-text hover:brightness-110 hover:scale-105 transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : "Créer"}
      </button>
    </form>
  );
}

export default Create;
