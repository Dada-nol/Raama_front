import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import panda3 from "../../assets/img/panda3.jpg";
import EntryFeed from "./EntryFeed";

function Show() {
  const [souvenir, setSouvenir] = useState("");
  const [title, setTitle] = useState("");
  const [cover_image, setCover_image] = useState("");

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
          setSouvenir(res.data);
          setTitle(res.data.title);
          setCover_image(res.data.cover_image);
        })
        .catch((e) => console.error(e));
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="flex items-center justify-center relative w-full h-60">
        {cover_image ? (
          <div
            className="absolute inset-0 bg-center bg-repeat bg-contain opacity-60"
            style={{
              backgroundImage: `url('http://localhost:8000/storage/${cover_image}')`,
            }}
          ></div>
        ) : (
          <div
            className="absolute inset-0 bg-center bg-repeat bg-contain opacity-60"
            style={{
              backgroundImage: `url('${panda3}')`,
            }}
          ></div>
        )}

        <div className="relative z-10 p-4 text-white text-lg font-medium">
          <h1>{title}</h1>
        </div>
      </div>

      {/*       <div className="roadmap">
        <div className="roadmap-items">
          <h4>Insert your entry</h4>
          <div className="entries">
            <EntryList souvenir={souvenir} id={id}></EntryList>
          </div>
        </div>
      </div>

      <div>
        <Delete></Delete>
      </div> */}

      <EntryFeed
        souvenir={souvenir}
        entries={souvenir.entries}
        members={souvenir.users}
        id={id}
      ></EntryFeed>
    </>
  );
}

export default Show;
