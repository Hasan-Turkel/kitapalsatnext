"use client";

import BookCard from "@/components/BookCard";
import { Book } from "@/types";
import useBooks from "@/utils/useBooks";
import { useEffect } from "react";
import Loading from "@/app/Loading";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/atoms";

const AdsList = () => {
  const { data: books, getPersonalBooks, loading, error } = useBooks();
  const token = useAtomValue(tokenAtom)

  useEffect(() => {
   token && getPersonalBooks();
  }, [token]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return (
      <h2 className="text-xl m-5 text-red-500 ">
        İlanlar Yüklenemedi
      </h2>
    );
  } else {
    return (
      <section className="max-w-[840px] m-auto my-10">
        {books?.length>0? books.map((book: Book) => (
          <BookCard ads={true} key={book?._id} book={book} />
        )): <h2>İlanınız Bulunmuyor.</h2>}
       
      </section>
    );
  }
};

export default AdsList;
