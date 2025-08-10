import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function SharedLink() {
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      <button
        className={`bg-primary rounded-md px-4 py-2 hover:scale-105 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
        onClick={handleCreateLink}
      >
        {isLoading ? "Loading" : "Create a link"}
      </button>
      {link && <div>{link}</div>}
      {errors.message && <p className="text-danger">{errors.message[0]}</p>}
    </>
  );
}

export default SharedLink;
