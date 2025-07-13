import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  return (
    <>
      <div>
        <h1 className="title">Bienvenue {user.pseudo} !</h1>
      </div>

      <div>{/* <Souvenirs></Souvenirs> */}</div>
    </>
  );
}

export default Home;
