import BookCard from "@/components/BookCard";

const page = () => {
  return (
    <main className="p-3">
      <section className="max-w-[840px] m-auto my-10">
        <BookCard />

        <p className="m-2">Durum: Aktif</p>

        <div className="m-2 flex gap-5 flewx-wrap">
 
            <button className="text-white border rounded-lg p-3 w-[100px] bg-red-500 hover:bg-red-600 transition-colors duration-500 ease-in-out">Sil</button>
            <button className="text-white border rounded-lg p-3 w-[100px] bg-green-500 hover:bg-green-600 transition-colors duration-500 ease-in-out">Düzenle</button>
            <button className="text-white border rounded-lg p-3 w-[100px] bg-blue-500 hover:bg-blue-600 transition-colors duration-500 ease-in-out">Askıya Al</button>
           

        </div>
      </section>
    </main>
  );
};

export default page;
