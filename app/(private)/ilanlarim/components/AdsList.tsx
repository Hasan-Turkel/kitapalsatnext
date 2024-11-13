"use client";

import BookCard from "@/components/BookCard";
import useBooks from "@/utils/useBooks";
import { useEffect } from "react";

interface Location {
  value: string;  // Şehir veya ilçe ID'si (string)
  label: string;  // Şehir veya ilçe adı (string)
  _id: string;    // MongoDB benzersiz ID'si (string)
}

interface User {
  city: Location;            // Şehir bilgisi (Location tipinde)
  createdAt: string;         // Kullanıcının oluşturulma tarihi (ISO 8601 formatında string)
  district: Location;        // İlçe bilgisi (Location tipinde)
  email: string;             // Kullanıcı e-posta adresi (string)
  fullname: string;          // Kullanıcı adı soyadı (string)
  is_superadmin: boolean;    // Süper admin mi? (boolean)
  password: string;          // Şifre (hashlenmiş veya normal string olarak saklanabilir)
  updatedAt: string;         // Kullanıcı güncellenme tarihi (ISO 8601 formatında string)
  __v: number;               // MongoDB versiyon numarası (number)
  _id: string;               // Kullanıcı ID'si (MongoDB ID'si, string)
}


export interface Book {
  author: string;           // Yazar adı (string)
  price: string;           // Yazar adı (string)
  bookStore: string;        // Kitapçı adı (string)
  createdAt: string;        // Kitap oluşturulma tarihi (ISO 8601 formatında string)
  description: string;      // Kitap açıklaması (string)
  isActive: boolean;        // Kitap aktif mi (boolean)
  isDeleted: boolean;       // Kitap silindi mi (boolean)
  name: string;             // Kitap adı (string)
  photo: string;            // Kitap fotoğrafı URL (string)
  publishmentYear: string;  // Yayın yılı (string)
  updatedAt: string;        // Kitap güncellenme tarihi (ISO 8601 formatında string)
  user_id:User;          // Kullanıcı ID'si (string)
  __v: number;              // MongoDB versiyon numarası (number)
  _id: string;              // Kitap ID'si (string)
}


const AdsList = () => {
  const { data: books, getPersonalBooks } = useBooks();

  useEffect(() => {
    getPersonalBooks();
  }, []);

  console.log(books)

  return (
    <section className="max-w-[840px] m-auto my-10">
      {books.map((book:Book) => (
        <BookCard ads={true} key={book?._id} book={book}/>
      ))}
    </section>
  );
};

export default AdsList;
