'use client'


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const MessageCard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center p-2 border rounded-lg  gap-2 ">
      <Image
        src="/book.jpg" // Buraya gerçek görsel yolunuzu yazın
        alt="A description of the image"
        width={100} // Genişlik
        height={100} // Yükseklik
        className="object-contain col-auto" // object-fit: contain
      />
      <Link href={"mesajlas"}>
        <div className="col-span-2">
          <p>Hasan Türkel </p>
          <p>Anadolu Üniversitesi Yayınları Medeni Hukuk 1 Ders Kitabı </p>
          <p>07.11.2024 15.41 </p>
        </div>
      </Link>

      <button className="bg-red-500 hover:bg-red-600 transition-colors duration-500 ease-in-out ms-auto w-[100px] rounded-lg p-2 text-white" onClick={openDeleteModal}>
        Sil
      </button>
      <DeleteModal isOpen={isModalOpen} onClose={closeDeleteModal}/>
    </div>
  );
};

export default MessageCard;
