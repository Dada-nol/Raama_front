import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SouvenirSetting from "./SouvenirSetting";

/**
 * Composant pour afficher une modale de paramètres d'un souvenir.
 *
 * Fonctionnalités :
 * - Affiche un bouton avec une icône "ellipsis" pour ouvrir la modale.
 * - La modale recouvre l'écran avec un fond semi-transparent et flouté.
 * - Clique sur le fond ferme la modale, clique à l'intérieur la conserve ouverte.
 * - Contient le composant <SouvenirSetting /> pour gérer les réglages du souvenir.
 *
 * @component
 *
 * @example
 * <SouvenirSettingModale />
 */
function SouvenirSettingModale() {
  const [showModal, setShowModal] = useState(false);

  const handleOverlayClick = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <button
        className="w-8 h-8 text-primary absolute top-1 right-2 "
        onClick={() => setShowModal(true)}
      >
        <EllipsisVerticalIcon></EllipsisVerticalIcon>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div
            onClick={handleModalClick}
            className="bg-secondary w-full sm:w-[400px] md:w-[800px] p-6 overflow-auto max-h-[80vh] shadow-xl"
          >
            <SouvenirSetting></SouvenirSetting>
          </div>
        </div>
      )}
    </>
  );
}

export default SouvenirSettingModale;
