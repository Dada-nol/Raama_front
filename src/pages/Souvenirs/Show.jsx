import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Delete from "./Delete";
import BtnUpload from "../../components/ui/BtnUpload";

function Show() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

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
          setDescription(data.description);
          setCoverImage(data.cover_image);
        })
        .catch((e) => console.error(e));
    };

    fetchData();
  }, [id]);

  return (
    <main className="main-content">
      <div className="souvenir-header">
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>

      <div className="souvenir-nav">
        <button className="souvenir-nav-items" onClick="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
        <button className="souvenir-nav-items" onClick="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
        <button className="souvenir-nav-items" onClick="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
        <button className="souvenir-nav-items" onClick="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
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
    </main>
  );
}

export default Show;
