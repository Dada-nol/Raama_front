import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import panda3 from "../../assets/img/panda3.jpg";
import EntryContainer from "../../components/souvenirs/entries/EntryContainer";

/**
 * Page affichant un souvenir spécifique avec ses entrées.
 *
 * Fonctionnalités :
 * - Récupère les détails d'un souvenir via l'API `/souvenir/:id`.
 * - Récupère les entrées (photos, contributions) associées au souvenir via `/souvenir/:id/entry`.
 * - Affiche le titre et l'image de couverture du souvenir (ou image par défaut si absente).
 * - Affiche le nombre de photos publiées et les points mémoire du souvenir.
 * - Passe les données au composant `EntryContainer` pour l'affichage des contributions.
 * - Permet de rafraîchir les entrées après ajout ou modification via `refreshEntries`.
 *
 * Composants internes utilisés :
 * - panda3 : image par défaut pour la couverture.
 * - EntryContainer : affichage des contributions du souvenir.
 *
 * @module SouvenirEntries
 * @returns {JSX.Element} Détail d'un souvenir avec ses entrées
 */
function SouvenirEntries() {
  const [souvenir, setSouvenir] = useState("");
  const [entries, setEntries] = useState([]);
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

  const fetchEntries = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/souvenir/${id}/entry`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEntries(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

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

      <ul className="flex justify-start gap-6 px-4 pt-2 ">
        {/* Disable for now */}
        {/*         <li className="text-gradient">
          {souvenir.memory_points} Memory points
        </li> */}
        <li className="text-gradient">
          {souvenir.entries?.length} photos publiés
        </li>
        <li className="text-gradient">
          {souvenir.memory_points} memory points
        </li>
      </ul>

      <EntryContainer
        members={souvenir.users}
        entries={entries}
        id={id}
        refreshEntries={fetchEntries}
      ></EntryContainer>
    </>
  );
}

export default SouvenirEntries;
