import { PencilIcon, UserIcon } from "@heroicons/react/24/outline";
import Input from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";

/**
 * Page Profil de l'utilisateur connecté.
 *
 * Fonctionnalités :
 * - Affiche les informations principales de l'utilisateur : nom, prénom, email.
 * - Utilise le contexte `AuthContext` pour récupérer les informations du compte connecté.
 * - Inclut un lien vers la page `AccountSettings` pour modifier les informations.
 * - Les champs sont en lecture seule (`readOnly`) et ne peuvent pas être modifiés directement sur cette page.
 *
 * Composants internes utilisés :
 * - Input : champ de saisie réutilisable en lecture seule.
 * - PencilIcon : icône pour le lien vers la modification des informations.
 * - UserIcon : icône représentant l'utilisateur.
 *
 * @module Profil
 * @returns {JSX.Element} Page affichant les informations du profil utilisateur
 */
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

      <h3 className="text-gradient text-left text-xl w-fit mx-8 mt-4">
        Mes informations
      </h3>

      <section className="relative border-2 border-primary p-4 mx-4 sm:mx-8 mb-4 rounded-lg">
        <div className="flex flex-col lg:flex-row md:justify-evenly md:items-center gap-4 mt-3">
          <div className="flex-1 min-w-[200px] text-left">
            <p className="font-semibold text-sm mb-1">Nom</p>
            <Input type="text" value={user.name} readOnly />
          </div>
          <div className="flex-1 min-w-[200px] text-left">
            <p className="font-semibold text-sm mb-1">Prénom</p>
            <Input type="text" value={user.firstname} readOnly />
          </div>
          <div className="flex-1 min-w-[200px] text-left">
            <p className="font-semibold text-sm mb-1">Email</p>
            <Input type="text" value={user.email} readOnly />
          </div>
        </div>

        <a
          className="absolute top-2 right-3 border border-primary p-2 rounded hover:scale-105 hover:gradient-border transition"
          href="/account-setting"
        >
          <PencilIcon className="w-4 h-4" />
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
