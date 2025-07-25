import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Home() {
  const { user } = useAuth();
  const [souvenirs, setSouvenirs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/souvenirs/recent")
      .then((response) => setSouvenirs(response.data))
      .catch((error) => console.error("Erreur :", error));
  }, []);
  return (
    <>
      <h2 className="flex justify-center items-center">
        Bienvenue {user.firstname} !
      </h2>

      <div className="border-2 border-primary m-8">
        <h3 className="flex justify-start p-4">Recent</h3>

        <ul className="flex justify-between items-center p-4">
          {souvenirs.map((souvenir) => (
            <li className="card relative group overflow-hidden rounded-xl bg-secondary shadow-[0_0_5px_1px_#64b000] transition-transform duration-300 hover:scale-105">
              <p>{souvenir.title}</p>
              <p>{souvenir.description}</p>
              {/* <p>{souvenir.cover_image}</p> */}
              <p>{souvenir.memory_points}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-2 border-primary m-8">
        <h3 className="flex justify-start p-4">Créer de nouveau souvenirs</h3>

        <ul className="flex justify-between items-center p-4">
          <li className="card relative group overflow-hidden rounded-xl bg-secondary shadow-[0_0_5px_1px_#64b000] transition-transform duration-300 hover:scale-105">
            1
          </li>
          <li className="card relative group overflow-hidden rounded-xl bg-secondary shadow-[0_0_5px_1px_#64b000] transition-transform duration-300 hover:scale-105">
            2
          </li>
          <li className="card relative group overflow-hidden rounded-xl bg-secondary shadow-[0_0_5px_1px_#64b000] transition-transform duration-300 hover:scale-105">
            3
          </li>
        </ul>
      </div>

      <div>{/* <Souvenirs></Souvenirs> */}</div>
    </>
  );
}

export default Home;
