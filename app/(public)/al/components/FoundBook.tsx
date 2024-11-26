"use client";
import BookCard from "@/components/BookCard";
import useBooks from "@/utils/useBooks";
import LastAddedBook from "@/components/LastAddedBook";
// import Pagination from "./Pagination";
import { useEffect } from "react";
import { Book } from "@/types";
import {  useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

const FoundBook = () => {
  const currentUrl = window.location.href;
  const urlObj = new URL(currentUrl);
  // const params = urlObj?.search?.substring(1);
  const searchParams = useSearchParams()
 const params = searchParams.toString()

  const { getBooks, data: books, count } = useBooks();

  useEffect(() => {
    params&&getBooks(1, params);
    
  }, [params]);

  

  return (
    <>
    {params&& <section className="max-w-[840px] m-auto my-10">
        <h2 className="text-3xl my-5">
          Aradığınız kriterlere uygun {count} kitap bulundu.
        </h2>

        {count >0&& <div>
          {books.map((book: Book) => (
            <BookCard ads={false} key={book?._id} book={book} />
          ))}
        </div>}

        <Pagination count = {count} getBooks={getBooks} params={params}/>
      </section>}
     
      {count==0&&  <LastAddedBook />}
    
    </>
  );
};

export default FoundBook;
