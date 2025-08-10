import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
