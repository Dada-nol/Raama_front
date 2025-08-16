import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import api from "../api/api";
import panda3 from "../assets/img/panda3.jpg";
import { useAuth } from "../context/AuthContext";

/**
 * Page d'accueil de l'utilisateur après connexion.
 *
 * Fonctionnalités :
 * - Affiche un message de bienvenue avec le prénom de l'utilisateur.
 * - Affiche les souvenirs récents récupérés via l'API `/recent`.
 * - Affiche la liste des types de souvenirs disponibles pour créer de nouveaux souvenirs.
 * - Chaque type de souvenir peut être cliquable pour créer un nouveau souvenir ou indisponible si `isAvailable` est false.
 *
 * Composants internes utilisés :
 * - LockClosedIcon pour indiquer les souvenirs indisponibles.
 *
 * @module Home
 * @returns {JSX.Element} La page d'accueil avec les souvenirs récents et les options de création
 */
function Home() {
  const { user } = useAuth();
  const [souvenirs, setSouvenirs] = useState([]);
  const [memoryType, setMemoryType] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/memory-type");
        setMemoryType(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();

    api
      .get("/recent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setSouvenirs(response.data))
      .catch((error) => console.error("Erreur :", error));
  }, []);
  return (
    <>
      <h2 className="flex justify-center items-center text-3xl font-semibold text-text mb-8">
        Bienvenue {user?.firstname} !
      </h2>

      <div className=" mx-8">
        <h3 className="flex justify-start px-4 py-2 text-lg font-semibold border-b border-primary mb-6">
          Recent
        </h3>

        {souvenirs ? (
          <ul className="flex flex-wrap gap-6 items-start mb-10">
            {souvenirs.map((souvenir) => (
              <li
                key={souvenir.id}
                className="card relative group w-80 p-4 group overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient"
              >
                <a href={`souvenir/${souvenir.id}`}>
                  <img
                    src={
                      souvenir.cover_image
                        ? `http://localhost:8000/storage/${souvenir.cover_image}`
                        : panda3
                    }
                    alt="souvenir"
                    className="w-full h-48 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all"
                  />
                  <div className="mt-3">
                    <p className="text-lg font-medium group-hover:text-gradient transition-colors">
                      {souvenir.title}
                    </p>
                    <p className="text-sm text-gray-300">
                      {souvenir.memory_points} points
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-10">
            Vous devez créer de nouveaux souvenir pour les voir s'afficher ici
          </p>
        )}
      </div>

      {/* Section Créer souvenirs */}
      <div className="border-2 border-primary mx-8 rounded-xl shadow-md">
        <h3 className="flex items-center p-4 text-lg font-semibold border-b border-primary">
          Créer de nouveaux <p className="text-gradient pl-1">souvenirs</p>
        </h3>

        <ul className="flex flex-wrap justify-center p-6 gap-6">
          {memoryType.map((memory) =>
            memory.isAvailable ? (
              <li
                key={memory.id}
                className="card relative w-80 p-4 shadow-md hover:shadow-lg overflow-hidden  bg-secondary gradient-border transition-transform duration-300 hover:scale-105 hover:text-gradient"
              >
                <a
                  className="flex items-center justify-center w-full h-full block text-lg font-medium text-text hover:text-gradient transition-colors"
                  href={`souvenir/create?memory_type_id=${memory.id}`}
                >
                  {memory.title}
                </a>
              </li>
            ) : (
              <li
                key={memory.id}
                className="cursor-not-allowed w-80 h-28 p-4 relative overflow-hidden bg-secondary border-2 border-danger opacity-60"
              >
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1">
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
    </>
  );
}

export default Home;
