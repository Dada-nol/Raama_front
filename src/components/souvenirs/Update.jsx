import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../ui/Input";

function Update() {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const { id } = useParams(); // Pour récupérer l'id dans l'url c'est important de faire ça

  // Récupérer les données déjà existantes, pour les afficher dans le form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/souvenir/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
      await axios.post(`http://localhost:8000/api/souvenir/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.href = `/souvenir/${id}`;
    } catch (e) {
      if (e.response) {
        setErrors(e.response.data.errors);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <Input
        type={"text"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      {errors.title && <p className="text-danger">{errors.title[0]}</p>}

      <label className="inline-block bg-my-gradient text-white my-2 px-4 py-2 rounded cursor-pointer hover:brightness-110 hover:scale-105">
        Choisir une image
        <Input
          type={"file"}
          onChange={handleFileChange}
          className="hidden"
        ></Input>
      </label>

      {coverImage ? (
        <p className="mt-2 text-sm text-text">{coverImage.name}</p>
      ) : (
        coverImageUrl && (
          <img
            src={`http://localhost:8000/storage/${coverImageUrl}`}
            alt="cover actuelle"
            className="m-auto my-2 w-40 h-auto rounded"
          />
        )
      )}

      <button
        className={`bg-my-gradient w-32 h-10 rounded-lg text-text hover:brightness-110 hover:scale-105 transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : "Modifier"}
      </button>
    </form>
  );
}

export default Update;
