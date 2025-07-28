import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BtnUpload from "../../components/ui/BtnUpload";
import Delete from "./Delete";

function Show() {
  const [title, setTitle] = useState("");
  const [cover_image, setCover_image] = useState("");

  const { id } = useParams(); // Pour récupérer l'id dans l'url c'est important de faire ça
  const token = localStorage.getItem("token"); // ou sessionStorage

  // Récupérer les données déjà existantes, pour les afficher dans le form
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:8000/api/souvenir/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          console.log(res.data.title);
          setTitle(data.title);
          setCover_image(data.cover_image);
        })
        .catch((e) => console.error(e));
    };

    fetchData();
  }, [id, token]);

  return (
    <>
      <div className="flex items-center justify-center relative w-full h-60">
        <div
          className="absolute inset-0 bg-center bg-repeat bg-contain opacity-60"
          style={{
            backgroundImage: `url('http://localhost:8000/storage/${cover_image}')`,
          }}
        ></div>

        <div className="relative z-10 p-4 text-white text-lg font-medium">
          <h1>{title}</h1>
        </div>
      </div>

      <div className="roadmap">
        <div className="roadmap-items">
          <h4>Insert your entry</h4>
          <div className="entries">
            <BtnUpload id={id} token={token}></BtnUpload>
            <BtnUpload></BtnUpload>
            <BtnUpload></BtnUpload>
            <BtnUpload></BtnUpload>
          </div>
        </div>
      </div>

      <div>
        <Delete></Delete>
      </div>
    </>
  );
}

export default Show;
