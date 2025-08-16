import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/api/souvenir/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log("Souvenir supprimé !");
    navigate("/");
  };

  return (
    <button
      className="bg-danger rounded-md px-4 py-2 hover:scale-105"
      onClick={handleDelete}
    >
      Supprimer
    </button>
  );
}

export default Delete;
