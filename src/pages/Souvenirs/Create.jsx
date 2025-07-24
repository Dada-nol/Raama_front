import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [memoryType, setMemoryType] = useState([]);
  const [selectedMemoryType, setSelectedMemoryType] = useState("");
  const [coverImage, setCover_image] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:8000/api/memory-type");

      setMemoryType(res.data);
      console.log("Memory type trouvé !");
    };

    fetch();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axios.post(
        "http://localhost:8000/api/souvenir",
        {
          title,
          description,
          coverImage,
          memory_type: selectedMemoryType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Souvenir créée !");
      navigate("/souvenir");
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors); // <- Laravel met les erreurs ici
      } else {
        console.error("Erreur inattendue", e);
      }
    }
  };

  return (
    <main className="main-content">
      <form className="souvenir-create" onSubmit={handleCreate}>
        <h2>Create Souvenir</h2>

        <div className="form-item">
          <h3>Memory Type</h3>
          <select onChange={(e) => setSelectedMemoryType(e.target.value)}>
            <option value="">Select your type</option>
            {memoryType.map((data) => (
              <option key={data.id} value={data.id}>
                {data.title}
              </option>
            ))}
          </select>

          {errors.memory_type && (
            <p className="error">{errors.memory_type[0]}</p>
          )}
        </div>

        <div className="form-item">
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title[0]}</p>}
        </div>

        <div className="form-item">
          <h3>Description</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="error">{errors.description[0]}</p>
          )}
        </div>

        <div className="form-item">
          <h3>Cover Image</h3>
          <input
            type=""
            value={coverImage}
            onChange={(e) => setCover_image(e.target.value)}
          />
          {errors.coverImage && <p className="error">{errors.coverImage[0]}</p>}
        </div>

        <button type="submit">Créer</button>
      </form>
    </main>
  );
}

export default Create;
