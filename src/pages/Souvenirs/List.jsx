import axios from "axios";
import { useEffect, useState } from "react";

function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/api/souvenirs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        {data.map((souvenir) => (
          <p key={souvenir.id}>{souvenir.name}</p>
        ))}
      </div>

      <a href="/souvenir-create">Créer souvenir</a>
    </>
  );
}

export default List;
