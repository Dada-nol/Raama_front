import axios from "axios";
import { useEffect, useState } from "react";
import panda3 from "../../assets/img/panda3.jpg";

function List() {
  const [data, setData] = useState([]);
  const [memoryType, setMemoryType] = useState([]);
  const [errors, setErrors] = useState({});
  const [sortOption, setSortOption] = useState("memory_type");

  const options = ["title", "created_at", "updated_at", "memory_type"];

  const handleSort = (e) => {
    setSortOption(e);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/memory-type");
        setMemoryType(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setErrors({});

      try {
        const res = await axios.get("http://localhost:8000/api/souvenirs", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setData(res.data);
        console.log(res.data);
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
    <>
      <h2>My Souvenirs</h2>

      <div className="flex justify-center items-center gap-6">
        {options.map((option) => (
          <button
            className="bg-my-gradient w-fit h-8 rounded-lg px-4"
            onClick={() => handleSort(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {sortOption === "memory_type" ? (
        memoryType.map((type) => (
          <>
            <h3 key={type.id}>{type.title}</h3>

            <ul className="flex justify-start gap-6 items-center mb-8">
              {errors.message && <p className="error">{errors.message}</p>}

              {data
                .filter((souvenir) => souvenir.memory_type_id === type.id)
                .map((souvenir) => (
                  <a href={`souvenir/${souvenir.id}`} key={souvenir.id}>
                    <li className="card w-80 p-4 relative group overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient">
                      {souvenir.cover_image ? (
                        <img
                          src={
                            souvenir.cover_image
                              ? `http://localhost:8000/storage/${souvenir.cover_image}`
                              : "none"
                          }
                          alt="souvenir"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          src={panda3}
                          alt="panda dans un arbre"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      <p className="w-fit">{souvenir.title}</p>
                      <p className="w-fit">{souvenir.memory_points}</p>
                      <p className="w-fit">{souvenir.memory_type_id}</p>
                    </li>
                  </a>
                ))}
            </ul>
          </>
        ))
      ) : (
        <ul className="flex flex-wrap gap-6 justify-center">
          {[...data]
            .sort((a, b) => {
              if (sortOption === "title") {
                return a[sortOption].localeCompare(b[sortOption]);
              } else {
                return new Date(b[sortOption]) - new Date(a[sortOption]);
              }
            })
            .map((souvenir) => (
              <a href={`souvenir/${souvenir.id}`} key={souvenir.id}>
                <li className="card w-80 p-4 relative group overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient">
                  {souvenir.cover_image ? (
                    <img
                      src={`http://localhost:8000/storage/${souvenir.cover_image}`}
                      alt="souvenir"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={panda3}
                      alt="panda dans un arbre"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <p className="w-fit">{souvenir.title}</p>
                  <p className="w-fit">{souvenir.memory_points}</p>
                  <p className="w-fit">{souvenir.memory_type_id}</p>
                </li>
              </a>
            ))}
        </ul>
      )}
    </>
  );
}

export default List;
