"use client";

import SetInfoBook from "./components/SetInfoBook";


const page = () => {

  const book = {
    author: "",
    price: "",
    bookStore: "",
    createdAt: new Date().toISOString(),
    description: "",
    isActive: true,
    isDeleted: false,
    name: "",
    photo: "",
    publishmentYear: "",
    updatedAt: new Date().toISOString(),
    user_id: {
      city: {
        value: "", // Şehir veya ilçe ID'si ('')
        label: "", // Şehir veya ilçe adı ('')
        _id: "", // MongoDB benzersiz ID'si ('')
      }, // Şehir bilgisi (Location tipinde)
      createdAt: "", // Kullanıcının oluşturulma tarihi (ISO 8601 formatında '')
      district: {
        value: "", // Şehir veya ilçe ID'si ('')
        label: "", // Şehir veya ilçe adı ('')
        _id: "", // MongoDB benzersiz ID'si ('')
      }, // İlçe bilgisi (Location tipinde)
      email: "", // Kullanıcı e-posta adresi ('')
      fullname: "", // Kullanıcı adı soyadı ('')
      is_superadmin: false, // Süper admin mi? (boolean)
      password: "", // Şifre (hashlenmiş veya normal '' olarak saklanabilir)
      updatedAt: "", // Kullanıcı güncellenme tarihi (ISO 8601 formatında '')           // MongoDB versiyon numarası (number)
      _id: "",
    },
    __v: 0,
    _id: "654321",
  }
  const onClose = () => null;
  return (
    <main className="p-3">
      <SetInfoBook arrange={false} onClose={onClose} book={book}/>
    </main>
  );
};

export default page;
