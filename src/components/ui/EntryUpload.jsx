import axios from "axios";
import { useState } from "react";

const EntryUpload = ({ id, user, date, onUploadSuccess }) => {
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleFileChange = async (e) => {
    // const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image_path", selectedFile);
    formData.append("caption", caption);
    formData.append("date", date); // si besoin côté API

    try {
      await axios.post(
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

      if (typeof onUploadSuccess === "function") {
        onUploadSuccess(); // Pour prévenir le parent qu'on a uploadé une image
      }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.response?.data);
      alert(error.response?.data?.message || "Erreur inconnue");
    }
  };

  return (
    <>
      <button
        className="image-upload-button"
        disabled={disabled}
        onClick={() => setShowModal(true)}
      >
        {user.pseudo || user.firstname ? (
          <p>Upload for {user.pseudo || user.firstname}</p>
        ) : (
          <p>Upload</p>
        )}
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ajouter une photo</h2>

            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <input
              type="text"
              placeholder="Légende (facultatif)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)}>Annuler</button>
              <button onClick={handleFileChange}>Valider</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EntryUpload;
