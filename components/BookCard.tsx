import Image from "next/image";

const BookCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center p-2 border rounded-lg  gap-2 ">
      <Image
        src="/book.jpg" // Buraya gerçek görsel yolunuzu yazın
        alt="A description of the image"
        width={200} // Genişlik
        height={200} // Yükseklik
        className="object-contain col-auto" // object-fit: contain
      />

      <div className="col-span-2">
        <p>Anadolu Üniversitesi Yayınları Medeni Hukuk 1 Ders Kitabı </p>
        <p>Komisyon</p>
        <p>Satıcı: Hasan Türkel</p>
        <p>Yayınevi: Alfa</p>
        <p>Basım Yılı: 2004</p>
        <p>Durum: İyi</p>
        <p>İl: İzmir</p>
        <p>İlçe: Konak</p>
      </div>
    </div>
  );
};

export default BookCard;
