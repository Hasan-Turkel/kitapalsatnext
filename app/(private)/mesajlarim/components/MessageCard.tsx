import Image from "next/image"


const MessageCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center p-2 border rounded-lg  gap-2 ">
      <Image
        src="/book.jpg" // Buraya gerçek görsel yolunuzu yazın
        alt="A description of the image"
        width={100} // Genişlik
        height={100} // Yükseklik
        className="object-contain col-auto" // object-fit: contain
      />

      <div className="col-span-2">
        <p>Hasan Türkel </p>
        <p>Anadolu Üniversitesi Yayınları Medeni Hukuk 1 Ders Kitabı </p>
        <p>07.11.2024 15.41 </p>
       
      </div>
    </div>
  )
}

export default MessageCard