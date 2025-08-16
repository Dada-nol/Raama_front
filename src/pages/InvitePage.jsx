import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Page gérant les invitations à un "souvenir" via un token.
 *
 * Fonctionnalités :
 * - Récupère le token depuis l'URL avec useParams.
 * - Effectue une requête GET à l'API pour valider l'invitation.
 * - Redirige vers la page du souvenir si le token est valide.
 * - Si l'utilisateur n'est pas connecté (401), enregistre le token en localStorage
 *   et redirige vers la page de connexion.
 * - Affiche un message d'erreur si le lien est invalide ou expiré.
 *
 * @module InvitePage
 * @returns {JSX.Element|null} Retourne null si redirection, sinon un message de chargement ou d'erreur
 */
export default function InvitePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/invite/${token}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        navigate(`/souvenir/${res.data.souvenir_id}`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          localStorage.setItem("pendingInviteToken", token);
          navigate("/login");
        } else {
          setError("Lien d'invitation invalide ou expiré.");
        }
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return null;
}
