import SetInfoBook from "@/app/(private)/sat/components/SetInfoBook";
import React, { FC } from "react";

interface ArrangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArrangeModal: FC<ArrangeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-lg p-6">
        <div className="flex justify-between items-center"></div>
        <div className="mt-4 max-h-[80svh] overflow-auto">
          {" "}
          <SetInfoBook arrange={true} onClose={onClose}/>
         
        </div>
      </div>
    </div>
  );
};

export default ArrangeModal;
