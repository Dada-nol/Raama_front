import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  const [souvenirs, setSouvenirs] = useState([]);

  const memories = ["One per Day", "Simple Album", "Mysteries's Box"];

  useEffect(() => {
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

      <div className="border-2 border-primary m-8">
        <h3 className="flex justify-start p-4 text-lg font-medium">Recent</h3>

        <ul className="flex justify-evenly items-center p-4">
          {souvenirs.map((souvenir) => (
            <a href={`souvenir/${souvenir.id}`} key={souvenir.id}>
              <li className="card w-80 p-4 relative group overflow-hidden rounded-xl bg-secondary shadow-[0_0_5px_1px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient">
                <img
                  src={
                    souvenir.cover_image
                      ? `http://localhost:8000/storage/${souvenir.cover_image}`
                      : "none"
                  }
                  alt="souvenir"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="w-fit">{souvenir.title}</p>
                <p className="w-fit">{souvenir.memory_points}</p>
              </li>
            </a>
          ))}
        </ul>
      </div>

      <div className="border-2 border-primary m-8">
        <h3 className="flex justify-start p-4 text-lg font-medium">
          Créer de nouveau souvenirs
        </h3>

        <ul className="flex justify-between items-center p-4">
          {memories.map((memory) => (
            <a href={`souvenir/create`} key={memory}>
              <li className="card w-80 p-4 relative group overflow-hidden rounded-xl bg-secondary gradient-border transition-transform duration-300 hover:scale-105 hover:text-gradient">
                {memory}
              </li>
            </a>
          ))}
        </ul>
      </div>

      <div>{/* <Souvenirs></Souvenirs> */}</div>
    </>
  );
}

export default Home;
