import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/scss/souvenirPage.scss";

function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCover_image] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/souvenir",
        {
          name,
          description,
          coverImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Souvenir créée !");
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="main-content">
      <form className="form-souvenir" onSubmit={handleCreate}>
        <h2>Create Souvenir</h2>
        <div className="form-item">
          <h3>Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <h3>Description</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-item">
          <h3>Cover Image</h3>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCover_image(e.target.value)}
          />
        </div>

        <button type="submit">Créer</button>
      </form>
    </main>
  );
}

export default Create;
