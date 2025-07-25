import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Create() {
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
    }
  };

  return (
    <form className="souvenir-create" onSubmit={handleCreate}>
      <h2>Create Souvenir</h2>

      <div className="form-item">
        <h3>Memory Type</h3>
        {memoryType.map((memory) => (
          <div key={memory.id} onClick={() => setSelectedMemoryType(memory.id)}>
            <div
              className={`card w-80 p-4 relative group overflow-hidden rounded-xl 
    ${selectedMemoryType === memory.id ? "ring-4 ring-green-500" : ""}
    bg-secondary gradient-border transition-transform duration-300 hover:scale-105 hover:text-gradient`}
            >
              {memory.title}
            </div>
          </div>
        ))}
        {errors.memory_type && <p className="error">{errors.memory_type[0]}</p>}
      </div>

      <div className="form-item">
        <h3>Title</h3>
        <input
          className="text-[#000]"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="error">{errors.title[0]}</p>}
      </div>

      <div className="form-item">
        <h3>Cover Image</h3>
        <input
          className="text-[#000]"
          type="file"
          name="cover_image"
          accept=".png,.jpg,.jpeg"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />
        {errors.cover_image && <p className="error">{errors.cover_image[0]}</p>}
      </div>

      <button type="submit">Créer</button>
    </form>
  );
}

export default Create;
