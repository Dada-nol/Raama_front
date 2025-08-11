import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function SharedLink() {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const { id } = useParams();

  const handleCreateLink = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await axios.post(
        `http://localhost:8000/api/souvenirs/${id}/invite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLink(res.data.invite_link);
    } catch (e) {
      if (e.response && e.response.status === 403) {
        setErrors(e.response.data.errors);
      } else {
        console.error("Erreur inattendue", e);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-3 items-center w-full">
        <button
          className={`bg-primary text-white rounded-lg px-6 py-2 font-medium hover:scale-105 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
          onClick={handleCreateLink}
        >
          {isLoading ? "Loading..." : "Create a link"}
        </button>

        {link && (
          <div className="flex flex-col items-stretch gap-3 mt-4 w-full">
            {/* Champ du lien */}
            <input
              type="text"
              value={link}
              readOnly
              className="flex-1 px-4 py-2 text-sm rounded-lg border border-primary bg-secondary text-text shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition"
            />

            {/* Bouton Copier */}
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-my-gradient text-white font-semibold shadow-lg hover:brightness-110 hover:scale-105 transition"
            >
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>
        )}

        {errors.message && (
          <p className="text-danger text-sm">{errors.message[0]}</p>
        )}
      </div>
    </>
  );
}

export default SharedLink;
