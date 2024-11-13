import useAxios from "@/utils/useAxios"
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
  fullname: string;
  city: { value: string; label: string } | null;
  district: { value: string; label: string } | null;
}

interface UpdatePersonalInfoValues {
  email?: string;
  fullName?: string;
  password?: string;
}

const useAuth = () => {
  const axiosInstance = useAxios(); // Axios instance'ını alıyoruz
  const setToken = useSetAtom(tokenAtom);
  const router = useRouter();

  // Login işlemi
  const login = async (values: LoginValues) => {
    try {
      const data = await axiosInstance.post(`/auth/login`, values);
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
      router.push("/");
    } catch (error) {
      // console.log(error.message);
      toast.error("Çıkış yapılamadı");
    }
  };

  // Kayıt işlemi
  const register = async (values: RegisterValues) => {
    try {
      const data = await axiosInstance.post(`/auth/register`, values);
      if ("bearer" in data) {
        setToken(data?.bearer);
      }

      toast.success("Başarıyla kayıt olundu.");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Mail adresi veya şifre yanlış.");
    }
  };

  // Çıkış yapma

  return {
    login,
    register,
    logout,
    // forgotPassword,
    // updatePersonalInfo,
    // renewPassword,
  };
};

export default useAuth;
