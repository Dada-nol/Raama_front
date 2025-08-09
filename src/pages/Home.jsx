import { LockClosedIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import panda3 from "../assets/img/panda3.jpg";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  const [souvenirs, setSouvenirs] = useState([]);
  const [memoryType, setMemoryType] = useState([]);

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

    axios
      .get("http://localhost:8000/api/recent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setSouvenirs(response.data))
      .catch((error) => console.error("Erreur :", error));
  }, []);
  return (
    <>
      <h2 className="flex justify-center items-center text-2xl font-medium">
        Bienvenue {user?.firstname} !
      </h2>

      <div className=" mx-8">
        <h3 className="flex justify-start p-4 text-lg font-medium">Recent</h3>

        <ul className="flex justify-start gap-6 items-center mb-8">
          {souvenirs.map((souvenir) => (
            <li
              key={souvenir.id}
              className="card w-80 p-4 relative group overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient"
            >
              <a href={`souvenir/${souvenir.id}`}>
                {souvenir.cover_image ? (
                  <img
                    src={
                      souvenir.cover_image
                        ? `http://localhost:8000/storage/${souvenir.cover_image}`
                        : "none"
                    }
                    alt="souvenir"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={panda3}
                    alt="panda dans un arbre"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <p className="w-fit">{souvenir.title}</p>
                <p className="w-fit">{souvenir.memory_points}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-2 border-primary mx-8">
        <h3 className="flex justify-start p-4 text-lg font-medium">
          Créer de nouveaux <p className="text-gradient pl-1">souvenirs</p>
        </h3>

        <ul className="flex justify-between items-center p-4 gap-6">
          {memoryType.map((memory) =>
            memory.isAvailable ? (
              <li
                key={memory.id}
                className="card w-80 p-4 relative group overflow-hidden rounded-xl bg-secondary gradient-border transition-transform duration-300 hover:scale-105 hover:text-gradient"
              >
                <a href={`souvenir/create?memory_type_id=${memory.id}`}>
                  {memory.title}
                </a>
              </li>
            ) : (
              <li className="cursor-not-allowed w-80 h-28 p-4 relative overflow-hidden bg-secondary border-2 border-danger opacity-60">
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                  <LockClosedIcon className="w-6 h-6 text-white" />
                  <p className="text-white font-bold">{memory.title}</p>
                  <p className="text-sm text-gray-200">
                    Indisponible pour le moment
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
      </div>

      <div>{/* <Souvenirs></Souvenirs> */}</div>
    </>
  );
}

export default Home;
