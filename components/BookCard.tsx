import { Book } from "@/app/(private)/ilanlarim/components/AdsList";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BookCardProps {
  ads: boolean;
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ ads, book }) => {
  const id = book?._id;
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center p-2 border rounded-lg  gap-2 my-2 " +
        (book?.isActive == false && "opacity-50")
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
              href={ads ? `/ilanlarim/${id}` : `/al/${id}`}
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
        </>
      )}
    </div>
  );
};

export default BookCard;
