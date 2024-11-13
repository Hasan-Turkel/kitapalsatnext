import React, { FC } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  id: any;
  onClose: () => void;
  deleteBook: (id:any) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ isOpen, onClose, deleteBook, id }) => {
  if (!isOpen) return null;

  const handleDelete = ()=> {
    deleteBook(id);
    onClose()

  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-lg p-6">
        <div className="flex justify-between items-center"></div>
        <div className="mt-4">
          {" "}
          <p className="text-lg">
            Bu ilanı silmek istediğinizden emin misiniz?
          </p>
          <div className=" flex gap-5">
            <button
              onClick={handleDelete}
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
