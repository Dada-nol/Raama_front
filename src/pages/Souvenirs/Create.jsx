import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleCreate}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        value={coverImage}
        onChange={(e) => setCover_image(e.target.value)}
      />

      <button type="submit">Créer</button>
    </form>
  );
}

export default Create;
