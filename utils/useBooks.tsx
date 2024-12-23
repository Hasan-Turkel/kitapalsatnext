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
  const [last, setLast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const [lastCount, setLastCount] = useState(0);
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
    setLoading(true);
    try {
      const data = await axiosInstance.get(`books/personalBooks`);
      if ("data" in data) {
        setData(data?.data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const getBooks = async (page: number, queryParams = "") => {
    
   setLoading(true)
    try {
      const data = await axiosInstance.get(queryParams.includes('page') ? 
      `books/?${queryParams}` :
        `books/?page=${page}${queryParams && "&" + queryParams}`
      );

      if ("data" in data) {
        setData(data?.data);
      }
      if ("count" in data && typeof data?.count == "number") {
        setCount(data?.count);
      }
    } catch (error) {
      setError(true);
    }   finally {(setLoading(false))}
  };
  const getLastBooks = async (page: number) => {
    setLoading(true)
    try {
      const data = await axiosInstance.get(`books/?page=${page}`);

      if ("data" in data) {
        setLast(data?.data);
      }
      if ("count" in data && typeof data?.count == "number") {
        setLastCount(data?.count);
      }
    } catch (error) {
      setError(true);
    }  finally {(setLoading(false))}
  }; 
  const getBook = async (id: any) => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(`books/${id}`);
      if ("data" in data) {
        setBook(data?.data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const deleteBook = async (id: any) => {
    setLoading(true);
    try {
      const data = await axiosInstance.put(`books/${id}`, { isDeleted: true });
      toast.success("Kitap başarıyla silindi.");

      setTimeout(() => {
        router.push("/ilanlarim");
      }, 2000);
    } catch (error) {
      toast.error("Kitap silinemedi.");
    }finally {
      setLoading(false);
    }
  };
  const toogleActivateBook = async (id: any, isActive: boolean) => {
    setLoading(true);
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
      toast.error(
        `Kitap  ${isActive ? "askıya alınamadı." : "aktif edilemedi."}`
      );
    } finally {
      setLoading(false);
    }
  };

  const sendBook = async (
    values: FormValues,
    img: File | null
  ): Promise<void> => {
    setLoading(true);
    try {
      let imgUrl = "";
      if (img) {
        const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "";
        const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";

        const form = new FormData();
        form.append("file", img); // Yüklemek istediğiniz dosya
        form.append("upload_preset", uploadPreset); // Cloudinary'den aldığınız upload preset
        form.append("cloud_name", cloudinaryName); // Cloudinary cloud name

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
            {
              method: "POST",
              body: form,
            }
          );

          const data = await response.json();

          if (data.secure_url) {
            imgUrl = data.secure_url; // Yüklenen görselin URL'sini alır
          } else {
            toast.error("Görsel Yüklenemedi.");
          }
        } catch (error) {
          toast.error("Görsel Yüklenemedi.");
        }
      }

      let formValues = imgUrl ? { ...values, photo: imgUrl } : values;
      await axiosInstance.post(`books`, formValues);
      // Başarı durumunda bildirim ve yönlendirme
      toast.success("Kitap başarıyla yayınlandı.");
      router.push("/ilanlarim");
    } catch (error) {
      // Hata durumunda bildirim

      toast.error("Kitap yayınlanamadı");
    } finally {
      setLoading(false);
    }
  };
  const arrangeBook = async (
    id: string,
    values: FormValues,
    img: File | null
  ): Promise<void> => {

    setLoading(true);
    try {
      let imgUrl = "";
      if (img) {
        const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME || "";
        const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET || "";

        const form = new FormData();
        form.append("file", img); // Yüklemek istediğiniz dosya
        form.append("upload_preset", uploadPreset); // Cloudinary'den aldığınız upload preset
        form.append("cloud_name", cloudinaryName); // Cloudinary cloud name

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
            {
              method: "POST",
              body: form,
            }
          );

          const data = await response.json();

          if (data.secure_url) {
            imgUrl = data.secure_url; // Yüklenen görselin URL'sini alır
          } else {
            toast.error("Görsel Yüklenemedi.");
          }
        } catch (error) {
          toast.error("Görsel Yüklenemedi.");
        }
      }

      let formValues = imgUrl ? { ...values, photo: imgUrl } : values;
      await axiosInstance.put(`books/${id}`, formValues, {});
      // Başarı durumunda bildirim ve yönlendirme
      toast.success("Kitap başarıyla düzenlendi.");
      router.push("/ilanlarim");
    } catch (error) {
      // Hata durumunda bildirim

      toast.error("Kitap düzenlenemedi.");
    }  finally {
      setLoading(false);
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
    count,
    last,
    lastCount,
    getLastBooks,
    loading,
    error,
  };
};

export default useBooks;
