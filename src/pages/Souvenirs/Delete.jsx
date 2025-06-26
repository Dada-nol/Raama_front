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

  return <button onClick={handleDelete}>Delete</button>;
}

export default Delete;
