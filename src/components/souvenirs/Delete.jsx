import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

/**
 * Composant pour supprimer un souvenir.
 *
 * Fonctionnalités :
 * - Supprime le souvenir identifié par l'`id` dans l'URL via un appel API.
 * - Redirige vers la page d'accueil après suppression.
 *
 * @component
 *
 * @example
 * <Delete />
 */
function Delete() {
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setErrors({});

    try {
      await api.delete(`/souvenir/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      navigate("/");
    } catch (e) {
      if (e.response && e.response.status === 403) {
        setErrors(e.response.data);
      } else {
        console.error("Erreur innatendu", e);
      }
    }
  };

  return (
    <>
      {errors.message && (
        <p className="text-danger text-sm mt-1">{errors.message}</p>
      )}
      <button
        className="bg-danger rounded-md px-4 py-2 hover:scale-105 text-white"
        onClick={handleDelete}
      >
        Supprimer
      </button>
    </>
  );
}

export default Delete;
