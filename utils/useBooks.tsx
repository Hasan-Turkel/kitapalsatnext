import useAxios from "@/utils/useAxios";
import { useAtomValue } from "jotai";
import { tokenAtom } from "./atoms";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Book } from "@/types";

// Login ve Register form değerlerinin tipi
interface FormValues {
  name: string;
  author: string;
  bookStore: string;
  publishmentYear: string;
  description: string;
  price: string;
}

const useBooks = () => {
  const axiosInstance = useAxios(); // Axios instance'ını alıyoruz
  const router = useRouter();
  const token = useAtomValue(tokenAtom);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [book, setBook] = useState<Book>({
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
  });

  const getPersonalBooks = async () => {
    try {
      const data = await axiosInstance.get(`books/personalBooks`);
      if ("data" in data) {
        setData(data?.data);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Mail adresi veya şifre yanlış.");
    }
  };
  const getBooks = async (page:number) => {
    try {
      const data = await axiosInstance.get(`books/?page=${page}`);
      console.log(page)
      if ("data" in data) {
        setData(data?.data);
      }
      if ("count" in data && typeof data?.count == 'number') {
        setCount(data?.count);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Mail adresi veya şifre yanlış.");
    }
  };
  const getBook = async (id: any) => {
    try {
      const data = await axiosInstance.get(`books/${id}`);
      if ("data" in data) {
        setBook(data?.data);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Mail adresi veya şifre yanlış.");
    }
  };
  const deleteBook = async (id: any) => {
    try {
      const data = await axiosInstance.put(`books/${id}`, { isDeleted: true });
      toast.success("Kitap başarıyla silindi.");

      setTimeout(() => {
        router.push("/ilanlarim");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Hata");
    }
  };
  const toogleActivateBook = async (id: any, isActive: boolean) => {
    try {
      const data = await axiosInstance.put(`books/${id}`, {
        isActive: !isActive,
      });

      toast.success(
        `Kitap başarıyla ${isActive ? "askıya alındı." : "aktif edildi."}`
      );

      setTimeout(() => {
        router.push("/ilanlarim");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Hata");
    }
  };

  const sendBook = async (
    values: FormValues,
    img: File | null
  ): Promise<void> => {
    // Token'ı Jotai'dan alıyoruz

    // FormData nesnesi oluşturuluyor

    const formData = new FormData();
    if (img) formData.append("file", img);
    formData.append("name", values.name);
    formData.append("author", values.author);
    formData.append("bookStore", values.bookStore);
    formData.append("publishmentYear", values.publishmentYear);
    formData.append("description", values.description);
    formData.append("price", values.price);

    try {
      // POST isteği
      await axios.post(`http://127.0.0.1:8000/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`, // Authorization header'ı ekliyoruz
        },
      });
      // Başarı durumunda bildirim ve yönlendirme
      toast.success("Kitap başarıyla yayınlandı.");
      router.push("/ilanlarim");
    } catch (error) {
      // Hata durumunda bildirim
      console.error(error);
      toast.error("Bir hata oluştu.");
    }
  };
  const arrangeBook = async (
    id: string,
    values: FormValues,
    img: File | null
  ): Promise<void> => {
    // Token'ı Jotai'dan alıyoruz

    // FormData nesnesi oluşturuluyor

    const formData = new FormData();
    if (img) formData.append("file", img);
    formData.append("name", values.name);
    formData.append("author", values.author);
    formData.append("bookStore", values.bookStore);
    formData.append("publishmentYear", values.publishmentYear);
    formData.append("description", values.description);
    formData.append("price", values.price);

    try {
      // POST isteği
      await axios.put(`http://127.0.0.1:8000/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`, // Authorization header'ı ekliyoruz
        },
      });
      // Başarı durumunda bildirim ve yönlendirme
      toast.success("Kitap başarıyla düzenlendi.");
      router.push("/ilanlarim");
    } catch (error) {
      // Hata durumunda bildirim
      console.error(error);
      toast.error("Bir hata oluştu.");
    }
  };

  return {
    sendBook,
    getPersonalBooks,
    data,
    book,
    getBook,
    deleteBook,
    toogleActivateBook,
    arrangeBook,
    getBooks,
    count
  };
};

export default useBooks;
