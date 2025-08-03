import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

function Profil() {
  const { user } = useAuth();

  /*   const createdAtDate = new Date(user.created_at);
  const formattedDate = createdAtDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }); */

  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="h-20 w-20 text-white border border-white rounded-full p-5 mb-2">
          <UserIcon />
        </div>
        <p>{user.name}</p>
      </section>

      <h3 className="text-gradient text-left text-xl w-fit mx-8">
        Mes informations
      </h3>
      <section className="relative border-2 border-primary p-4 mx-8 mb-4">
        <div className="flex justify-evenly items-center">
          <div className="text-left">
            <p>Name</p>
            <Input type={"text"} value={user.name} readOnly></Input>
          </div>
          <div className="text-left">
            <p>Firstname</p>
            <Input type={"text"} value={user.firstname} readOnly></Input>
          </div>
          <div className="text-left">
            <p>Email</p>
            <Input type={"text"} value={user.email} readOnly></Input>
          </div>
        </div>
        <a
          className="absolute top-3 right-3 border border-primary p-2 text-center hover:scale-105 hover:gradient-border"
          href="/account-setting"
        >
          <PencilIcon className="w-6 h-6"></PencilIcon>
        </a>
      </section>

      {/* Disabled for now */}
      {/*       <h3 className="text-gradient text-left text-xl w-fit mx-8">
        Statistiques
      </h3>
      <section className="border-2 border-primary p-4 mx-8 mb-4">
        <p>Membre depuis le {formattedDate}</p>
      </section> */}
    </>
  );
}

export default Profil;
