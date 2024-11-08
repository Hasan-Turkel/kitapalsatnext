"use client";

import BookCard from "@/components/BookCard";
import { useState } from "react";
import DeleteModal from "./components/DeleteModal";
import SuspendModal from "./components/SuspendModal";
import ArrangeModal from "./components/ArrangeModal";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    delete: false,
    suspend: false,
    arrange: false,
  });

  const openDeleteModal = () => {
    setIsModalOpen({ ...isModalOpen, delete: true });
  };
  const openSuspendModal = () => {
    setIsModalOpen({ ...isModalOpen, suspend: true });
  };
  const openArrangeModal = () => {
    setIsModalOpen({ ...isModalOpen, arrange: true });
  };

  const closeDeleteModal = () => {
    setIsModalOpen({ ...isModalOpen, delete: false });
  };
  const closeSuspendModal = () => {
    setIsModalOpen({ ...isModalOpen, suspend: false });
  };
  const closeArrangeModal = () => {
    setIsModalOpen({ ...isModalOpen, arrange: false });
  };
  return (
    <main className="p-3">
      <section className="max-w-[840px] m-auto my-10">
        <BookCard />

        <p className="m-2">Durum: Aktif</p>
        <p className="m-2">Açıklama: Yeni gibidir. Hiçbir sorunu yoktur. </p>

        <div className="m-2 flex gap-5 flewx-wrap">
          <button
            className="text-white border rounded-lg p-3 w-[100px] bg-red-500 hover:bg-red-600 transition-colors duration-500 ease-in-out"
            onClick={openDeleteModal}
          >
            Sil
          </button>
          <button
            className="text-white border rounded-lg p-3 w-[100px] bg-green-500 hover:bg-green-600 transition-colors duration-500 ease-in-out"
            onClick={openArrangeModal}
          >
            Düzenle
          </button>
          <button
            className="text-white border rounded-lg p-3 w-[100px] bg-blue-500 hover:bg-blue-600 transition-colors duration-500 ease-in-out"
            onClick={openSuspendModal}
          >
            Askıya Al
          </button>
        </div>
        <DeleteModal isOpen={isModalOpen?.delete} onClose={closeDeleteModal} />
        <SuspendModal
          isOpen={isModalOpen?.suspend}
          onClose={closeSuspendModal}
        />
        <ArrangeModal
          isOpen={isModalOpen?.arrange}
          onClose={closeArrangeModal}
        />
      </section>
    </main>
  );
};

export default page;
