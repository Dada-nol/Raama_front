import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  return (
    <main className="main-content">
      <div>
        <h1>Bienvenue {user.pseudo} !</h1>
      </div>

      <div>{/* <Souvenirs></Souvenirs> */}</div>
    </main>
  );
}

export default Home;
