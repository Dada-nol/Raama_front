import Souvenirs from "./Souvenirs/List";

function Home() {
  return (
    <>
      <div>
        <h1>Ma page d'accueil !</h1>
        <p>Bienvenue sur (Panda)Raama !</p>
      </div>

      <div>
        <Souvenirs></Souvenirs>
      </div>
    </>
  );
}

export default Home;
