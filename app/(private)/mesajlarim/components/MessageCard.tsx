"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FC, useEffect } from "react";
import { MessageGetType } from "@/types";
import { useSetAtom } from "jotai"; // Jotai atomunu okuma
import { bookAtom, messageIdAtom } from "@/utils/atoms";
import useUser from "@/utils/useUser";
import DeleteModal from "./DeleteModal";

interface MessageCardProps {
  message: MessageGetType;
}

const MessageCard: FC<MessageCardProps> = ({ message }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getUser, user } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const setBook = useSetAtom(bookAtom);
  const setMessageId = useSetAtom(messageIdAtom);

  const filtered =
    message.participants?.filter(
      (participant) => participant?.user_id == user._id
    )[0]?.lastSeen == "0" ||
    new Date(
      message.participants?.filter(
        (participant) => participant?.user_id == user._id
      )[0]?.lastSeen
    ).getTime() <
      new Date(message.messages[message.messages.length - 1].date).getTime();

  const handleSetBook = () => {
    setBook({
      bookId: message?.book_id?._id,
      bookName: message?.book_id?.name,
      bookSellerId: message?.book_id?.user_id._id,
      bookSeller: message?.book_id?.user_id?.fullname,
    });
    setMessageId(message?._id);
  };

  return (
    <div className=" relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center p-2 border rounded-lg  gap-2 ">
      <Image
        src={message?.book_id?.photo || "/book.jpg"} // Buraya gerçek görsel yolunuzu yazın
        alt="A description of the image"
        width={100} // Genişlik
        height={100} // Yükseklik
        className="object-contain col-auto" // object-fit: contain
      />
      <Link href={"/mesajlas"} onClick={handleSetBook}>
        <div className="col-span-2">
          <p>{message?.book_id?.name} </p>
          <p>{message?.book_id?.user_id?.fullname} </p>
          <p>{message?.messages.slice(-1)[0].date}</p>
        </div>
      </Link>

      <button
        className="bg-red-500 hover:bg-red-600 transition-colors duration-500 ease-in-out ms-auto w-[100px] rounded-lg p-2 text-white"
        onClick={openDeleteModal}
      >
        Sil
      </button>
      {filtered && (
        <span className="absolute top-0 right-0  text-red-500 mx-2">
          Okunmamış mesajınız var
        </span>
      )}

      <DeleteModal isOpen={isModalOpen} onClose={closeDeleteModal} id={message?._id}/>
    </div>
  );
};

export default MessageCard;
