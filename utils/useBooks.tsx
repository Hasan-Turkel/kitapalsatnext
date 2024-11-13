import useAxios from "@/utils/useAxios"
import { useAtomValue } from "jotai";
import { tokenAtom } from "./atoms";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

// Login ve Register form değerlerinin tipi
interface FormValues {
  name: string;
  author: string;
  bookStore: string;
  publishmentYear: string;
  description: string;
  price:string
}

const useBooks = () => {
  const axiosInstance = useAxios(); // Axios instance'ını alıyoruz
  const router = useRouter();
  const token = useAtomValue(tokenAtom);
  const [data, setfirst] = useState([]);

  const getPersonalBooks = async () => {
    try {
      console.log("girdi");
      const data = await axiosInstance.get(`books/personalBooks`);
      if ("data" in data) {
        setfirst(data?.data);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Mail adresi veya şifre yanlış.");
    }
  };

  const sendBook = async (
    values: FormValues,
    img: File | null
  ): Promise<void> => {
    // Token'ı Jotai'dan alıyoruz

    // FormData nesnesi oluşturuluyor

    console.log(values);
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

  return {
    sendBook,
    getPersonalBooks,
    data,
  };
};

export default useBooks;
