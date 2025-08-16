import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Delete from "./Delete";
import SharedLink from "./SharedLink";
import Update from "./Update";

/**
 * Composant pour gérer les paramètres d'un souvenir.
 *
 * Fonctionnalités :
 * - Création d'un lien de partage via le composant <SharedLink />.
 * - Modification des informations du souvenir via le composant <Update />.
 * - Zone "Danger" pour la suppression du souvenir via le composant <Delete />.
 * - Affichage responsive avec une grille sur 1 ou 2 colonnes selon la taille d'écran.
 *
 * @component
 *
 * @example
 * <SouvenirSetting />
 */
function SouvenirSetting() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create shared link */}
        <section className="bg-secondary rounded-xl shadow-md p-6 border border-primary">
          <h2 className="text-xl font-semibold mb-4 text-text">
            Créer un lien de partage
          </h2>
          <div className="flex flex-col items-center gap-4">
            <SharedLink />
          </div>
        </section>

        {/* Update souvenir */}
        <section className="bg-secondary rounded-xl shadow-md p-6 border border-primary">
          <h2 className="text-xl font-semibold mb-4 text-text">
            Modifier les infos du souvenir
          </h2>
          <div className="flex flex-col items-center gap-4">
            <Update />
          </div>
        </section>
      </div>

      {/* Danger zone */}
      <section className="mt-6 bg-secondary rounded-xl shadow-md border border-red-500 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center text-red-500">
          <ExclamationTriangleIcon className="h-10 w-10 mr-2" />
          <p className="font-medium">Cette action est irreversible !</p>
        </div>
        <Delete />
      </section>
    </>
  );
}

export default SouvenirSetting;
