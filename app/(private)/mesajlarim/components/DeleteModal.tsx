import React, { FC } from "react";
import useMessages from '@/utils/useMessages'

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id:string
}

const DeleteModal: FC<DeleteModalProps> = ({ isOpen, onClose, id }) => {

  const {hasBeenRedOrDelete} = useMessages()

  const deleteMessage = ()=>{
   
    hasBeenRedOrDelete({date:'-1'}, id)
    onClose()

  }
  if (!isOpen) return null;

  

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-lg p-6">
        <div className="flex justify-between items-center"></div>
        <div className="mt-4">
          {" "}
          <p className="text-lg">
            Bu mesajı silmek istediğinizden emin misiniz?
          </p>
          <div className=" flex gap-5">
            <button
              onClick={deleteMessage}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Evet, Sil
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

export default DeleteModal;
