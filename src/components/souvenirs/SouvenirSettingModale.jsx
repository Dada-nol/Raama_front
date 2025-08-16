import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ReactDOM from "react-dom";
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

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/40 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-secondary w-full sm:w-[400px] md:w-[800px] p-6 overflow-auto max-h-[80vh] shadow-xl"
      >
        <SouvenirSetting />
      </div>
    </div>
  );

  return (
    <>
      <button
        className="w-8 h-8 text-primary absolute top-1 right-2 "
        onClick={() => setShowModal(true)}
      >
        <EllipsisVerticalIcon />
      </button>

      {showModal && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
}

export default SouvenirSettingModale;
