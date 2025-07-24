import axios from "axios";
import { useState } from "react";

const BtnUpload = ({ userId, id, token }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [caption, setCaption] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image_path", file);
    formData.append("caption", caption);

    try {
      await axios.post(
        `http://localhost:8000/api/souvenir/${id}/entry/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Success : afficher l'image et désactiver le bouton
      setImageSrc(URL.createObjectURL(file));
      setDisabled(true);
      setShowModal(false);
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
        onClick={() => !disabled && setShowModal(true)}
        style={{
          backgroundImage: imageSrc ? `url(${imageSrc})` : "none",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {!imageSrc && <span>Upload</span>}
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Upload une image</h2>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
            <input
              type="text"
              placeholder="Légende (facultatif)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <button onClick={() => setShowModal(false)}>Annuler</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BtnUpload;
