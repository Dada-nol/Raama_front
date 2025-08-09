import axios from "axios";
import { useEffect, useState } from "react";
import panda3 from "../../assets/img/panda3.jpg";

function List() {
  const [data, setData] = useState([]);
  const [memoryType, setMemoryType] = useState([]);
  const [errors, setErrors] = useState({});
  const [sortOption, setSortOption] = useState("memory_type");
  const [searchTerm, setSearchTerm] = useState("");

  const options = ["title", "created_at", "updated_at", "memory_type"];

  const handleSort = (e) => {
    setSortOption(e);
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.users?.some((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

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
      <h2 className="flex justify-center p-4 text-lg font-medium">
        My <p className="text-gradient pl-1">souvenirs</p>
      </h2>

      <section className="flex border-2 border-primary rounded-lg mx-8 gap-48">
        <div className="flex flex-col justify-center items-start p-4">
          <h3>Sort by</h3>
          <ul className="flex gap-6">
            {options.map((option) => (
              <li key={option}>
                <button
                  className="bg-my-gradient w-fit h-8 rounded-lg px-4"
                  onClick={() => handleSort(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center items-start p-4">
          <h3>Search souvenir or member</h3>
          <input
            placeholder="ex : Jhon"
            value={searchTerm}
            type="text"
            className="text-[#000] rounded-md w-60 h-8 border-2 border-transparent focus:border-[#64b000] focus:outline-none transition-colors duration-200"
            onChange={handleFilter}
          />
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 mx-8">
        {sortOption === "memory_type" ? (
          memoryType.map((type) => (
            <div key={type.id}>
              <h3 className="text-lg font-medium text-left" key={type.id}>
                {type.title}
              </h3>

              <ul className="flex justify-start gap-6 items-center">
                {errors.message && <p className="error">{errors.message}</p>}

                {filteredData
                  .filter((souvenir) => souvenir.memory_type_id === type.id)
                  .map((souvenir) => (
                    <li
                      key={souvenir.id}
                      className="card w-80 p-4 relative overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient"
                    >
                      <a href={`souvenir/${souvenir.id}`}>
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
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className="flex flex-wrap gap-4 justify-center my-8">
            {[...filteredData]
              .sort((a, b) => {
                if (sortOption === "title") {
                  return a[sortOption].localeCompare(b[sortOption]);
                } else {
                  return new Date(b[sortOption]) - new Date(a[sortOption]);
                }
              })
              .map((souvenir) => (
                <li
                  key={souvenir.id}
                  className="card w-80 p-4 relative overflow-hidden rounded-xl bg-secondary hover:shadow-[0_0_5px_#64b000] transition-transform duration-300 hover:scale-105 border-2 border-primary hover:text-gradient"
                >
                  <a href={`souvenir/${souvenir.id}`}>
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
                  </a>
                </li>
              ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default List;
