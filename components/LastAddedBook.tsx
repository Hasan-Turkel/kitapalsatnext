'use client'

import { Book } from "@/types";
import BookCard from "./BookCard";
import useBooks from "@/utils/useBooks";
import Pagination from "./Pagination";
import { useEffect } from "react";

const LastAddedBook =  () => {
  const {getLastBooks, last:books, lastCount} = useBooks()

  useEffect(() => {
    getLastBooks(1)
  }, [])
  
 
  return (
    <section className="max-w-[840px] m-auto  p-3">
      <h2 className="text-3xl my-5">Son Eklenen Kitaplar</h2>
      <div>
        {books.map((book: Book) => (
          <BookCard ads={false} key={book?._id} book={book} />
        ))}
      </div>
      <Pagination count = {lastCount} getBooks={getLastBooks} params=""/>
    </section>
  );
};

export default LastAddedBook;
