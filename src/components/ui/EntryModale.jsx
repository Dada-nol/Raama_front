import { useState } from "react";

const EntryModale = ({ entry }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Empêche de fermer quand on clique dans la modale
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
