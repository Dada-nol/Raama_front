import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();
  return (
    <>
      <h2 className="flex justify-center items-center">
        Bienvenue {user.firstname} !
      </h2>

      <div className="border-2 border-primary m-5">
        <h3 className="flex justify-start p-4">Recent</h3>

        <ul className="flex justify-between items-center p-4">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>

      <div className="border-2 border-primary m-5">
        <h3 className="flex justify-start p-4">Créer de nouveau souvenirs</h3>

        <ul className="flex justify-between items-center p-4">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>

      <div>{/* <Souvenirs></Souvenirs> */}</div>
    </>
  );
}

export default Home;
