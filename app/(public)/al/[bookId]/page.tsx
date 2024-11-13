"use client";

import BookCard from "@/components/BookCard";
import Link from "next/link";
import useBooks from "@/utils/useBooks";
import useUser from "@/utils/useUser";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAtomValue } from "jotai"; // Jotai atomunu okuma
import { tokenAtom } from "@/utils/atoms";

const page = () => {
  const { book, getBook } = useBooks();
  const { user, getUser } = useUser();
  const token = useAtomValue(tokenAtom);

  const params = useParams(); // Access params using the useParams hook
  const bookId = params?.bookId; // Access the specific param after unwrapping

  useEffect(() => {
    getBook(bookId);
    token && getUser();
  }, []);

  return (
    <main className="p-3">
      <section className="max-w-[840px] m-auto my-10">
        <BookCard book={book} ads={false} />
        <p className="m-2">Açıklama: {book?.description} </p>

        <div className="m-2 flex gap-5 flewx-wrap">
          <Link href={"/mesajlas"}>

          {user?._id == book?.user_id._id ? <p className="text-xl">Bu ilan size ait.</p> :  <button className="text-white border rounded-lg p-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-500 ease-in-out">
              Satıcıya Mesaj At
            </button>}

            
           
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;
