"use client";

import BookCard from "@/components/BookCard";
import { useState } from "react";
import DeleteModal from "./components/DeleteModal";
import SuspendModal from "./components/SuspendModal";
import ArrangeModal from "./components/ArrangeModal";
import useBooks from "@/utils/useBooks";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/Loading";
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

  const { book, getBook, deleteBook, toogleActivateBook, loading, error } = useBooks();

  const params = useParams(); // Access params using the useParams hook
  const ilanId = params?.ilanId; // Access the specific param after unwrapping

  useEffect(() => {
    getBook(ilanId);
  }, []);

  if ( loading) {
    return <Loading />;
  } else if (error) {
    return (
      <h2 className="text-xl my-5 text-red-500 ">
       İlan Yüklenemedi
      </h2>
    );
  } else {

    return (
      <main className="p-3">
        <section className="max-w-[840px] m-auto my-10">
          <BookCard book={book} ads={false} />
  
          <p className="m-2">Durum: {book?.isActive ? "Aktif" : "Aktif Değil"}</p>
          <p className="m-2">Açıklama: {book?.description} </p>
  
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
              {book?.isActive ? "Askıya Al" : "Aktif Et"}
            </button>
          </div>
          <DeleteModal
            isOpen={isModalOpen?.delete}
            onClose={closeDeleteModal}
            deleteBook={deleteBook}
            id={ilanId}
          />
          <SuspendModal
            isOpen={isModalOpen?.suspend}
            onClose={closeSuspendModal}
            toogleActivateBook={toogleActivateBook}
            id={ilanId}
            isActive={book?.isActive}
          />
          <ArrangeModal
            isOpen={isModalOpen?.arrange}
            onClose={closeArrangeModal}
            book={book}
          />
        </section>
      </main>
    );

  }

 
};

export default page;
