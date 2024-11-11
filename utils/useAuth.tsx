import instance from "./axios";
import { useSetAtom } from "jotai";
import { tokenAtom } from "./atoms";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Login ve Register form değerlerinin tipi
interface LoginValues {
  email: string;
  password: string;
}

interface RegisterValues {
  email: string;
  password: string;
  fullName: string;
}

interface UpdatePersonalInfoValues {
  email?: string;
  fullName?: string;
  password?: string;
}

const useAuth = () => {
  const setToken = useSetAtom(tokenAtom);
  const router = useRouter();

  // Login işlemi
  const login = async (values: LoginValues) => {
    try {
      const data = await instance.post(`/auth/login`, values);
      if ("bearer" in data) {
        setToken(data?.bearer);
      }

      toast.success("Başarıyla giriş yapıldı.");
      router.push("/");
    } catch (error) {
      // console.log(error);
      toast.error("Mail adresi veya şifre yanlış.");
    }
  };
  
  const logout = async () => {
    try {
      setToken(null);
      toast.success("Başarıyla çıkış yapıldı.");
    } catch (error) {
      // console.log(error.message);
      toast.error("Çıkış yapılamadı");
    }
  };
  // Kişisel bilgileri güncelleme
  // const updatePersonalInfo = async (
  //   values: UpdatePersonalInfoValues,
  //   id: string
  // ) => {
  //   try {
  //     const { data } = await axiosWithToken.put(`/users/${id}`, values);
  //     dispatch(updatePersonalInfoSuccess({ ...data, id: data?._id }));
  //     toast.success("Kişisel bilgiler güncellendi.");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Kişisel bilgiler güncellenemedi.");
  //   }
  // };

  // Şifre sıfırlama talebi gönderme
  // const forgotPassword = async (values: { email: string }) => {
  //   try {
  //     const { data } = await axiosSimple.post(`/auth/forgot-password`, values);
  //     toast.success("Şifre yenileme maili gönderildi.");
  //     navigate("/"); // İşlem tamamlandıktan sonra anasayfaya yönlendir
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Şifre yenileme maili gönderilemedi.");
  //   }
  // };

  // Şifre yenileme
  // const renewPassword = async (values: { password: string; token: string }) => {
  //   try {
  //     const { data } = await axiosWithToken.post(
  //       `/auth/renew-password`,
  //       values
  //     );
  //     toast.success("Şifreniz yenilendi.");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Şifreniz yenilenemedi.");
  //   }
  // };

  // Kayıt işlemi
  const register = async (values: RegisterValues) => {
    try {
      const { data } = await instance.post(`/auth/register`, values);
    } catch (error) {
      console.log(error);
    }
  };

  // Çıkış yapma

  return {
    login,
    register,
    logout
    // forgotPassword,
    // updatePersonalInfo,
    // renewPassword,
  };
};

export default useAuth;
