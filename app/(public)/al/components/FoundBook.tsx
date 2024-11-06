import BookCard from "@/components/BookCard"


const FoundBook = () => {
  return (
    <section className="max-w-[840px] m-auto my-10">
         <h2 className="text-3xl my-5">Aradığınız kriterlere uygun 20 kitap bulundu.</h2>
         <div>
            <BookCard/>
         </div>
    </section>
  )
}

export default FoundBook