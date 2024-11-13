import { Book } from "@/types";
import BookCard from "./BookCard";
import { getBooks } from "@/utils/getBooks";


const LastAddedBook = async () => {

  const books = await getBooks();

  console.log(books)
  return (
    <section className="max-w-[840px] m-auto  p-3">
      <h2 className="text-3xl my-5">Son Eklenen Kitaplar</h2>
      <div>
      {books.map((book: Book) => (
        <BookCard ads={false} key={book?._id} book={book} />
      ))}
      </div>
    </section>
  );
};

export default LastAddedBook;
