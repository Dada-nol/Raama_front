import { useState } from "react";

/**
 * Composant représentant une seule entry (photo) cliquable qui ouvre une modale.
 *
 * Fonctionnalités :
 * - Affiche la miniature de l'image dans la liste.
 * - Ouvre une modale en cliquant sur l'image.
 * - La modale affiche :
 *   - L'image en grand
 *   - La légende (caption)
 *   - La date de création formatée en français
 * - Fermeture de la modale en cliquant sur le fond ou sur le bouton ❌.
 *
 * @component
 *
 * @param {Object} props
 * @param {Object} props.entry - L’entry à afficher.
 * @param {string} props.entry.image_path - Chemin de l'image dans le stockage.
 * @param {string} props.entry.caption - Légende de l'image.
 * @param {string} props.entry.created_at - Date de création de l’entry (format ISO).
 *
 * @example
 * <EntryModale entry={entry} />
 */
const EntryModale = ({ entry }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const date = new Date(entry.created_at).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Image cliquable */}
      <div
        className="image-upload-button hover:scale-105"
        style={{
          backgroundImage: `url(http://localhost:8000/storage/${entry.image_path})`,
        }}
        onClick={() => setShowModal(true)}
      />

      {/* Modale */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex justify-end items-stretch bg-black/40 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-[#1E1E1E] w-full sm:w-[400px] p-6 overflow-auto shadow-xl"
            onClick={handleModalClick}
          >
            <div className="flex justify-end mb-4">
              <button
                className="text-white font-bold text-lg"
                onClick={handleOverlayClick}
              >
                ❌
              </button>
            </div>

            {/* Contenu de la modale */}
            <img
              src={`http://localhost:8000/storage/${entry.image_path}`}
              alt="Entry"
              className="rounded-xl mb-4 w-full object-cover"
            />
            <div className="text-[#D1D0C5]">
              <p>
                <strong>Caption :</strong> {entry.caption}
              </p>
              <p>
                <strong>Date :</strong> {date}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EntryModale;
