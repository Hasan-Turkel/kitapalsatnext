'use client'

import { Book } from "@/types";
import BookCard from "./BookCard";
import useBooks from "@/utils/useBooks";
import Pagination from "./Pagination";
import { useEffect } from "react";

const LastAddedBook =  () => {
  const {getBooks, data:books, count} = useBooks()

  useEffect(() => {
    getBooks(1)
  }, [])
  
 
  return (
    <section className="max-w-[840px] m-auto  p-3">
      <h2 className="text-3xl my-5">Son Eklenen Kitaplar</h2>
      <div>
        {books.map((book: Book) => (
          <BookCard ads={false} key={book?._id} book={book} />
        ))}
      </div>
      <Pagination count = {count} getBooks={getBooks}/>
    </section>
  );
};

export default LastAddedBook;
