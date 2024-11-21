"use client";

import BookCard from "@/components/BookCard";
import { Book } from "@/types";
import useBooks from "@/utils/useBooks";
import { useEffect } from "react";


const AdsList = () => {
  const { data: books, getPersonalBooks } = useBooks();

  useEffect(() => {
    getPersonalBooks();
  }, []);

 

  return (
    <section className="max-w-[840px] m-auto my-10">
      {books.map((book: Book) => (
        <BookCard ads={true} key={book?._id} book={book} />
      ))}
    </section>
  );
};

export default AdsList;
