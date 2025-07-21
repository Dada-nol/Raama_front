import axios from "axios";
import { useEffect, useState } from "react";

function List() {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setErrors({});

      try {
        const res = await axios.get("http://localhost:8000/api/souvenirs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setData(res.data);
      } catch (e) {
        if (e.response && e.response.status === 401) {
          setErrors(e.response.data); // <- Laravel met les erreurs ici
        } else {
          console.error("Erreur inattendue", e);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <main className="main-content">
      <h2>My Souvenirs</h2>
      <form>
        <select>
          <option>Sort by</option>
          <option value="title">Title</option>
          <option value="points">Points</option>
        </select>
      </form>
      <ul className="list">
        {/* {errors.message && <p className="error">{errors.message}</p>} */}

        {data.map((souvenir) => (
          <a
            href={`souvenir/${souvenir.id}`}
            className="card"
            key={souvenir.id}
          >
            <li className="list-items">
              <h3>{souvenir.title}</h3>
              <div>
                <p>{souvenir.memory_type_id}</p>
                <p>Memory points : {souvenir.memory_points}</p>
              </div>
            </li>
          </a>
        ))}
      </ul>
    </main>
  );
}

export default List;
