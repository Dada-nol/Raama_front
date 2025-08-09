import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SouvenirSetting from "./SouvenirSetting";

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
        className="w-8 h-8 text-primary absolute top-2 right-5 "
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
            className="bg-[#1E1E1E] w-full sm:w-[400px] p-6 overflow-auto shadow-xl"
          >
            <SouvenirSetting></SouvenirSetting>
          </div>
        </div>
      )}
    </>
  );
}

export default SouvenirSettingModale;
