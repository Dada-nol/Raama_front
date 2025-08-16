import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

/**
 * Context gérant l'authentification de l'utilisateur.
 *
 * Fonctionnalités :
 * - Récupère les informations de l'utilisateur connecté à l'initialisation via `/api/user`.
 * - Gère le loading lors de la récupération des données.
 * - Vérifie un `pendingInviteToken` stocké en localStorage et redirige vers le souvenir correspondant si présent.
 * - Permet de se déconnecter via `/api/logout` et de supprimer le token local.
 *
 * @module AuthContext
 * @property {Object|null} user - Objet utilisateur connecté ou null si non connecté
 * @property {Function} setUser - Fonction pour mettre à jour l'utilisateur dans le context
 * @property {boolean} loading - Indique si les données utilisateur sont en cours de chargement
 * @property {Function} logout - Fonction pour déconnecter l'utilisateur
 *
 * @example
 * import { useAuth } from './AuthContext';
 * const { user, logout } = useAuth();
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. On récupère l'utilisateur à l'initialisation
  const fetchUser = async () => {
    try {
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 2. Quand user est chargé et connecté, on check le pendingInviteToken
  useEffect(() => {
    if (!loading && user) {
      const token = localStorage.getItem("pendingInviteToken");
      if (token) {
        localStorage.removeItem("pendingInviteToken");
        axios
          .get(`http://localhost:8000/api/invite/${token}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            navigate(`/souvenir/${res.data.souvenir_id}`);
          })
          .catch(() => {
            navigate("/");
          });
      }
    }
  }, [loading, user, navigate]);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {
      console.error("Erreur lors de la déconnexion API", e);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
