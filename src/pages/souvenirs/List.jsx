import { useEffect, useState } from "react";
import api from "../../api/api";
import panda3 from "../../assets/img/panda3.jpg";

/**
 * Page listant les souvenirs de l'utilisateur.
 *
 * Fonctionnalités :
 * - Récupère la liste des souvenirs via l'API `/souvenirs` avec authentification Bearer token.
 * - Récupère les types de mémoire via l'API `/memory-type`.
 * - Permet de trier les souvenirs par titre, date de création, points mémoire ou type de mémoire.
 * - Permet de rechercher un souvenir ou un membre par nom.
 * - Affiche les souvenirs sous forme de cartes avec image de couverture (ou image par défaut).
 * - Gère les souvenirs indisponibles pour certains types de mémoire.
 * - Gestion des erreurs de requête et affichage des messages d'erreur.
 *
 * Composants internes utilisés :
 * - panda3 : image par défaut pour les souvenirs sans image.
 *
 * @module List
 * @returns {JSX.Element} Liste filtrable et triable des souvenirs de l'utilisateur
 */
function List() {
  const [data, setData] = useState([]);
  const [memoryType, setMemoryType] = useState([]);
  const [errors, setErrors] = useState({});
  const [sortOption, setSortOption] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");

  const options = ["title", "created_at", "memory_points", "memory_type"];

  const handleSort = (e) => {
    setSortOption(e);
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.users?.some((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setErrors({});

      try {
        const res = await api.get("/souvenirs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setData(res.data);
      } catch (e) {
        if (e.response && e.response.status === 401) {
          setErrors(e.response.data); // <- Laravel met les erreurs ici
        } else {
          console.error("Erreur inattendue", e);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 className="flex justify-center p-4 text-lg sm:text-xl md:text-2xl font-medium text-center">
        Mes <p className="text-gradient pl-1">souvenirs</p>
      </h2>

      <section className="flex flex-col md:flex-row border-2 border-primary rounded-lg mx-4 md:mx-8 gap-6 md:gap-12 lg:gap-48 p-4">
        <div className="flex flex-col justify-center items-start w-full md:w-auto">
          <h3 className="mb-2">Trier par</h3>
          <ul className="flex flex-wrap gap-4">
            {options.map((option) => (
              <li key={option}>
                <button
                  className="bg-my-gradient w-fit h-8 rounded-lg px-4 text-sm md:text-base hover:brightness-110 transition"
                  onClick={() => handleSort(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center items-start w-full md:w-auto">
          <h3 className="mb-2">Rechercher un souvenir ou un membre</h3>
          <input
            placeholder="ex : Jhon"
            value={searchTerm}
            type="text"
            className="text-[#000] rounded-md w-full sm:w-60 h-8 border-2 border-transparent focus:border-[#64b000] focus:outline-none transition-colors duration-200 px-2"
            onChange={handleFilter}
          />
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 mx-4 md:mx-8">
        {sortOption === "memory_type" ? (
          memoryType.map((type) => (
            <div key={type.id} className="w-full">
              <h3 className="text-lg font-medium text-left mt-4 mb-2">
                {type.title}
              </h3>

              <ul className="flex flex-wrap gap-4 md:gap-6">
                {errors.message && <p className="error">{errors.message}</p>}

                {filteredData
                  .filter((souvenir) => souvenir.memory_type_id === type.id)
                  .map((souvenir) => (
                    <li
                      key={souvenir.id}
                      className="card w-full sm:w-72 md:w-80 p-4 relative overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient"
                    >
                      <a href={`souvenir/${souvenir.id}`}>
                        {souvenir.cover_image ? (
                          <img
                            src={`http://localhost:8000/storage/${souvenir.cover_image}`}
                            alt="souvenir"
                            className="w-full h-40 sm:h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <img
                            src={panda3}
                            alt="panda dans un arbre"
                            className="w-full h-40 sm:h-48 object-cover rounded-lg"
                          />
                        )}
                        <p className="w-fit">{souvenir.title}</p>
                        <p className="w-fit">{souvenir.memory_points}</p>
                      </a>
                    </li>
                  ))}

                {!type.isAvailable && (
                  <li className="w-full sm:w-72 md:w-80 p-4 border-2 border-danger bg-secondary opacity-60 flex items-center justify-center text-center">
                    <p className="text-danger">Bientôt disponible</p>
                  </li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <ul className="flex flex-wrap gap-4 my-8">
            {[...filteredData]
              .sort((a, b) => {
                const valA = a[sortOption];
                const valB = b[sortOption];

                // Texte
                if (typeof valA === "string" && typeof valB === "string") {
                  return valA.localeCompare(valB);
                }

                // Nombre
                if (typeof valA === "number" && typeof valB === "number") {
                  return valB - valA;
                }

                // Date (ou string de date)
                const dateA = new Date(valA);
                const dateB = new Date(valB);
                if (!isNaN(dateA) && !isNaN(dateB)) {
                  return dateB - dateA;
                }

                return 0; // valeurs non comparables
              })

              .map((souvenir) => (
                <li
                  key={souvenir.id}
                  className="card w-full sm:w-72 md:w-80 p-4 relative overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient"
                >
                  <a href={`souvenir/${souvenir.id}`}>
                    {souvenir.cover_image ? (
                      <img
                        src={`http://localhost:8000/storage/${souvenir.cover_image}`}
                        alt="souvenir"
                        className="w-full h-40 sm:h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={panda3}
                        alt="panda dans un arbre"
                        className="w-full h-40 sm:h-48 object-cover rounded-lg"
                      />
                    )}
                    <p className="w-fit">{souvenir.title}</p>
                    <p className="w-fit">{souvenir.memory_points}</p>
                  </a>
                </li>
              ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default List;
