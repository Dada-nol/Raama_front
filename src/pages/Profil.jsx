import { UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

function Profil() {
  const { user } = useAuth();

  const createdAtDate = new Date(user.created_at);
  const formattedDate = createdAtDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="h-20 w-20 text-white border border-white rounded-full p-5 mb-2">
          <UserIcon />
        </div>
        <p>{user.name}</p>
        <p>Membre depuis le {formattedDate}</p>
      </section>

      <h3 className="text-gradient text-left text-xl w-fit mx-8">
        Mes informations
      </h3>
      <section className="border-2 border-primary mx-8 mb-4">
        <div></div>
      </section>

      <h3 className="text-gradient text-left text-xl w-fit mx-8">
        Statistques
      </h3>
      <section className="border-2 border-primary mx-8 mb-4">
        <div></div>
      </section>
    </>
  );
}

export default Profil;
