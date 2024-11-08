import BookCard from "@/components/BookCard";

const page = () => {
  return (
    <main className="p-3">
      <section className="max-w-[840px] m-auto my-10">
        <BookCard />
        <p className="m-2">Açıklama: Yeni gibidir. Hiçbir sorunu yoktur. </p>

        <div className="m-2 flex gap-5 flewx-wrap">
          <button className="text-white border rounded-lg p-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-500 ease-in-out">
            Satıcıya Mesaj At
          </button>
        </div>
      </section>
    </main>
  );
};

export default page;
