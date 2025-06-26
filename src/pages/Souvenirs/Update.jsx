import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  const { id } = useParams(); // Pour récupérer l'id dans l'url c'est important de faire ça
  const navigate = useNavigate();

  // Récupérer les données déjà existantes, pour les afficher dans le form
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8000/api/souvenir/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const data = res.data;
          setName(data.name);
          setDescription(data.description);
          setCoverImage(data.cover_image);
          setIsClosed(data.is_closed);
        })
        .catch((e) => console.error(e));
    };

    fetchData();
  }, [id]);

  // Modification des données en faisant un appel API
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/souvenir/${id}`,
        {
          name,
          description,
          cover_image: coverImage,
          is_close: isClosed,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Souvenir modifié !");
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
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
        onChange={(e) => setCoverImage(e.target.value)}
      />

      <select
        value={isClosed ? "1" : "0"}
        onChange={(e) => setIsClosed(e.target.value === "1")}
      >
        <option value="0">Ouvert</option>
        <option value="1">Fermé</option>
      </select>
      {/* <input
        type="checkbox"
        value={isClosed}
        onChange={(e) => setIsClosed(e.target.value)}
      /> */}

      <button type="submit">Modifier</button>
    </form>
  );
}

export default Update;
