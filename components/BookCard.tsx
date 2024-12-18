'use client'

import { Book } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useSetAtom } from "jotai";
import { bookIdAtom } from "@/utils/atoms";
interface BookCardProps {
  ads: boolean;
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ ads, book }) => {
  const id = book?._id;

  const setBookId = useSetAtom(bookIdAtom)
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center p-2 border rounded-lg  gap-2 my-2 " +
        (book?.isActive == false && "opacity-70")
      }
    >
      {book && (
        <>
          <Image
            src={book?.photo || "/book.jpg"} // Buraya gerçek görsel yolunuzu yazın
            alt="A description of the image"
            width={200} // Genişlik
            height={200} // Yükseklik
            className="object-contain col-auto" // object-fit: contain
          />

          <div className="col-span-2">
            <Link
              className="text-sky-700"
              href={ads ? `/ilanlarim/detay` : `/al/detay`}
              onClick={()=>setBookId(id)}
            >
              {book?.name}
            </Link>
            <p>Fiyat: {book?.price} TL </p>
            <p>Yazar: {book?.author}</p>
            <p>Satıcı: {book?.user_id?.fullname}</p>
            <p>Yayınevi: {book?.bookStore}</p>
            <p>Basım Yılı: {book?.publishmentYear}</p>
            <p>İl: {book?.user_id?.city?.label}</p>
            <p>İlçe: {book?.user_id?.district?.label}</p>
          </div>

          {book?.isActive == false &&  <p>Bu ilan aktif değil.</p>}
        </>
      )}
    </div>
  );
};

export default BookCard;
