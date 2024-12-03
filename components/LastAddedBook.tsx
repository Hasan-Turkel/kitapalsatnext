"use client";

import { Book } from "@/types";
import BookCard from "./BookCard";
import useBooks from "@/utils/useBooks";
import Pagination from "./Pagination";
import { useEffect } from "react";
import Loading from "@/app/Loading";

const LastAddedBook = () => {
  const { getLastBooks, last: books, lastCount, loading, error } = useBooks();

  useEffect(() => {
    getLastBooks(1);
  }, []);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return (
      <h2 className="text-xl m-5 text-red-500 ">
        Son Eklenen Kitaplar Yüklenemedi
      </h2>
    );
  } else {
    return (
      <section className="max-w-[840px] m-auto  p-3">
        <h2 className="text-3xl my-5">Son Eklenen Kitaplar</h2>
        <div>
          {books.map((book: Book) => (
            <BookCard ads={false} key={book?._id} book={book} />
          ))}
        </div>
        <Pagination count={lastCount} getBooks={getLastBooks} params="" />
      </section>
    );
  }
};

export default LastAddedBook;
