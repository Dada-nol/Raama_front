import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  return (
    <main>
      <div>
        <h1 className="title">Bienvenue {user.pseudo} !</h1>
      </div>

      <div>{/* <Souvenirs></Souvenirs> */}</div>
    </main>
  );
}

export default Home;
