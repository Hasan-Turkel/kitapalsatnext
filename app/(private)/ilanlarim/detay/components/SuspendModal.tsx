import React, { FC } from "react";

interface SuspendModalProps {
  isOpen: boolean;
  id: any;
  isActive: boolean;
  onClose: () => void;
  toogleActivateBook: (id: any, isActive: boolean) => void;
}

const SuspendModal: FC<SuspendModalProps> = ({
  isOpen,
  onClose,
  id,
  toogleActivateBook,
  isActive,
}) => {
  if (!isOpen) return null;

  const handleActivate = () => {
    toogleActivateBook(id, isActive);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-lg p-6">
        <div className="flex justify-between items-center"></div>
        <div className="mt-4">
          {" "}
          <p className="text-lg text-black">
            Bu ilanı {isActive? 'askıya almak': 'aktif etmek'}  istediğinizden emin misiniz?
          </p>
          <div className=" flex gap-5">
            <button
              onClick={handleActivate}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >

              {isActive? 'Evet, Askıya Al ': 'Aktif Et'}
              
            </button>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              İptal Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspendModal;
