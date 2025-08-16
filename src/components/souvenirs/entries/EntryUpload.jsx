import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Input from "../../ui/Input";
import api from "../../../api/api";

/**
 * Composant permettant de créer une nouvelle entry (photo) pour un utilisateur donné.
 *
 * Fonctionnalités :
 * - Bouton d’upload cliquable si l'utilisateur actuel correspond à l'utilisateur cible.
 * - Ouvre une modale pour choisir un fichier et saisir une légende facultative.
 * - Upload de l'image via l’API avec `api` et `multipart/form-data`.
 * - Gestion des erreurs de validation renvoyées par l’API.
 * - Après upload, réinitialise les champs et appelle `refreshEntries` si fourni.
 *
 * @component
 *
 * @param {Object} props
 * @param {number|string} props.id - ID du souvenir auquel l’entry appartient.
 * @param {Object} props.entryUser - Utilisateur pour lequel l’entry est créée.
 * @param {number} props.entryUser.id - ID de l'utilisateur.
 * @param {string} [props.entryUser.pseudo] - Pseudo de l'utilisateur.
 * @param {string} [props.entryUser.firstname] - Prénom de l'utilisateur.
 * @param {function} [props.refreshEntries] - Fonction pour rafraîchir la liste des entries après l'upload.
 *
 * @example
 * <EntryUpload id={souvenirId} entryUser={user} refreshEntries={loadEntries} />
 */
const EntryUpload = ({ id, entryUser, refreshEntries }) => {
  const { user } = useAuth();

  const isCurrentUser = user?.id === entryUser.id;

  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const handleFileChange = async (e) => {
    setIsLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("image_path", selectedFile);
    formData.append("caption", caption);

    try {
      await api.post(
        `http://localhost:8000/api/souvenir/${id}/entry/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDisabled(true);
      setShowModal(false);
      setSelectedFile(null);
      setCaption("");

      if (typeof refreshEntries === "function") {
        refreshEntries();
      }
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <button
        className={`image-upload-button hover:scale-105 ${
          !isCurrentUser ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
        onClick={() => {
          if (!isCurrentUser) return;
          setShowModal(true);
        }}
      >
        {entryUser.pseudo || entryUser.firstname ? (
          <p>Upload for {entryUser.pseudo || entryUser.firstname}</p>
        ) : (
          <p>Upload</p>
        )}
      </button>

      {showModal && (
        <div onClick={handleOverlayClick} className="modal-overlay">
          <div onClick={handleModalClick} className="modal">
            <h2>Ajouter une photo</h2>

            <Input
              type={"file"}
              accept={".png,.jpg,.jpeg"}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            ></Input>

            <Input
              type={"text"}
              placeholder={"Légende (facultatif)"}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></Input>

            {errors.image_path && (
              <p className="text-danger">{errors.image_path[0]}</p>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className={`inline-block text-primary transition-transform duration-300 hover:scale-105 px-4 py-2 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleOverlayClick}
              >
                Annuler
              </button>
              <button
                className="inline-block text-primary transition-transform duration-300 hover:scale-105 px-4 py-2"
                disabled={isLoading}
                onClick={handleFileChange}
              >
                {isLoading ? "Chargement..." : "Valider"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EntryUpload;
