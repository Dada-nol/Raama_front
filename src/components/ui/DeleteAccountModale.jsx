import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccountModale = ({ entry }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();
  // Method de suppression de compte
  const deleteAccount = async () => {
    await axios.delete("http://localhost:8000/api/user", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    localStorage.removeItem("token");

    navigate("/register");
  };

  return (
    <>
      {/* Image cliquable */}
      <button
        className="bg-danger rounded-md px-4 py-2 hover:scale-105"
        onClick={() => setShowModal(true)}
      >
        Supprimer le compte ?
      </button>

      {/* Modale */}
      {showModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div
            className="relative bg-[#1E1E1E] w-full sm:w-[400px] p-6 overflow-auto shadow-xl"
            onClick={handleModalClick}
          >
            <div className=" mb-4">
              <p className="text-center">Êtes vous sûr de votre choix ?</p>

              <button
                className="absolute text-white font-bold text-lg top-3 right-3"
                onClick={handleOverlayClick}
              >
                ❌
              </button>
            </div>

            {/* Contenu de la modale */}
            <div className="flex flex-row justify-evenly">
              <button
                className="bg-danger py-1 px-2 rounded-md"
                onClick={deleteAccount}
              >
                Oui
              </button>
              <button
                className="bg-primary py-1 px-2 rounded-md"
                onClick={handleOverlayClick}
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccountModale;
