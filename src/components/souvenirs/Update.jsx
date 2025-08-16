import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Input from "../ui/Input";

/**
 * Composant pour mettre à jour un souvenir existant.
 *
 * Fonctionnalités :
 * - Récupère les informations actuelles du souvenir via son ID (depuis l'URL).
 * - Permet de modifier le titre et l'image de couverture.
 * - Gère les erreurs de validation et l'état de chargement.
 * - Soumet les modifications via un appel API `PUT`.
 *
 * @component
 *
 * @example
 * <Update />
 */
function Update() {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const { id } = useParams(); // Pour récupérer l'id dans l'url c'est important de faire ça
  const apiURL = process.env.REACT_APP_LARAVEL_URL;

  // Récupérer les données déjà existantes, pour les afficher dans le form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/souvenir/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTitle(res.data.title);
        setCoverImageUrl(res.data.cover_image);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [id]);

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
    setCoverImageUrl(""); // On efface l’ancienne url
  };

  // Modification des données en faisant un appel API
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("title", title);
    if (coverImage) {
      formData.append("cover_image", coverImage);
    }
    formData.append("_method", "PUT");

    try {
      await api.post(`/souvenir/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.href = `/souvenir/${id}`;
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else if (e.response && e.response.status === 403) {
        setErrors(e.response.data);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="space-y-4 w-full">
        <div>
          <h3 className="text-lg font-medium mb-1">Titre</h3>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.title && (
            <p className="text-danger text-sm mt-1">{errors.title[0]}</p>
          )}
        </div>

        <label className="flex items-center justify-center h-12 bg-my-gradient text-white px-4 py-2 rounded-lg cursor-pointer hover:brightness-110 hover:scale-105 transition">
          Choisir une image
          <Input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        {coverImage ? (
          <p className="text-sm text-text">{coverImage.name}</p>
        ) : (
          coverImageUrl && (
            <img
              src={`${apiURL}/storage/${coverImageUrl}`}
              alt="cover actuelle"
              className="mx-auto my-2 h-40 rounded-lg"
            />
          )
        )}

        {errors.coverImage && (
          <p className="text-danger text-sm mt-1">{errors.coverImage[0]}</p>
        )}

        <button
          className={`bg-my-gradient w-36 h-10 rounded-lg text-white font-medium hover:brightness-110 hover:scale-105 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Modifier"}
        </button>

        {errors.message && (
          <p className="text-danger text-sm mt-1">{errors.message}</p>
        )}
      </form>
    </>
  );
}

export default Update;
