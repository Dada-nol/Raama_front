import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Delete from "./Delete";

function Show() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isClosed, setIsClosed] = useState(false);

  const { id } = useParams(); // Pour récupérer l'id dans l'url c'est important de faire ça

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
  return (
    <>
      <ul>
        <li>{name}</li>
        <li>{description}</li>
        <li>{coverImage}</li>
        <li style={{ color: isClosed ? "red" : "green" }}>
          {isClosed ? "Fermé" : "Ouvert"}
        </li>
      </ul>

      <div>
        <Delete></Delete>
      </div>
    </>
  );
}

export default Show;
