import { useState } from "react";
import "../../styles/scss/entry.scss";

function BtnUpload() {
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setShowModal(false);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <button
        className="image-upload-button"
        style={{
          backgroundImage: imageSrc ? `url(${imageSrc})` : "none",
        }}
        onClick={() => setShowModal(true)}
      >
        {!imageSrc && <span>Upload</span>}
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Upload une image PNG</h2>
            <input type="file" accept="image/png" onChange={handleFileChange} />
            <button onClick={() => setShowModal(false)}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BtnUpload;
