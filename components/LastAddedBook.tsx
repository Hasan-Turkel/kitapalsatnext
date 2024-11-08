import BookCard from "./BookCard"


const LastAddedBook = () => {
  return (
    <section className="max-w-[840px] m-auto  p-3">
         <h2 className="text-3xl my-5">Son Eklenen Kitaplar</h2>
         <div>
            <BookCard/>
         </div>
    </section>
  )
}

export default LastAddedBook