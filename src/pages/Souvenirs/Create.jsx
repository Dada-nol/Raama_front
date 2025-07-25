import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

      console.log("Souvenir créée !");
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
    <form className="" onSubmit={handleCreate}>
      <h2 className="flex justify-center items-center text-2xl font-medium">
        Création de votre <h3 className="text-gradient pl-1">Souvenir</h3>
      </h2>

      <div className="m-8">
        <h3 className="text-lg font-medium">
          Choisissez votre type de Memoire
        </h3>
        <div className="flex flex-col lg:flex-row justify-evenly items-center p-4 gap-4">
          {memoryType.map((memory) => (
            <button
              type="button"
              key={memory.id}
              onClick={() => setSelectedMemoryType(memory.id)}
            >
              <div
                className={`card w-80 p-4 relative group overflow-hidden rounded-xl 
    ${selectedMemoryType === memory.id ? "ring-4 ring-primary" : ""}
    bg-secondary gradient-border transition-transform duration-300 hover:scale-105 hover:text-gradient`}
              >
                {memory.title}
              </div>
            </button>
          ))}
        </div>
        {errors.memory_type && <p className="error">{errors.memory_type[0]}</p>}
      </div>

      <div className="border-2 border-primary rounded-lg m-8 flex justify-evenly items-center p-4">
        <div>
          <h3 className="text-lg font-medium">Titre</h3>
          <input
            className="text-[#000] h-8 border-2 border-transparent focus:border-[#64b000] focus:outline-none transition-colors duration-200"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
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
          {errors.cover_image && (
            <p className="error">{errors.cover_image[0]}</p>
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
