"use client";
import BookCard from "@/components/BookCard";
import useBooks from "@/utils/useBooks";
import LastAddedBook from "@/components/LastAddedBook";
// import Pagination from "./Pagination";
import { useEffect } from "react";
import { Book } from "@/types";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import Loading from "@/app/Loading";

const FoundBook = () => {
  const currentUrl = window.location.href;
  const urlObj = new URL(currentUrl);
  // const params = urlObj?.search?.substring(1);
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  const { getBooks, data: books, count, loading, error } = useBooks();

  useEffect(() => {
    params && getBooks(1, params);
  }, [params]);

  if (params && loading) {
    return <Loading />;
  } else if (error) {
    return (
      <h2 className="text-xl m-5 text-red-500 ">
        Aranan Kitaplar Yüklenemedi
      </h2>
    );
  } else {
    return (
      <>
        {params && (
          <section className="max-w-[840px] m-auto my-10">
            <h2 className="text-3xl my-5">
              Aradığınız kriterlere uygun{" "}
              {count > 0 ? count + " kitap bulundu." : "kitap bulunamadı."}
            </h2>

            {count > 0 && (
              <div>
                {books.map((book: Book) => (
                  <BookCard ads={false} key={book?._id} book={book} />
                ))}
                <Pagination count={count} getBooks={getBooks} params={params} />
              </div>
            )}
          </section>
        )}

        {count == 0 && <LastAddedBook />}
      </>
    );
  }
};

export default FoundBook;
