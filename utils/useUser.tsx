import { User } from "@/types";
import useAxios from "@/utils/useAxios";
// import { useAtomValue } from "jotai";
// import { tokenAtom } from "./atoms";
// import { useRouter } from "next/navigation";
import { useState } from "react";

const initialState: User = {
  _id: "",
  fullname: "",
  email: "",
  password: "",
  city: { value: "", label: "", _id: "" },
  district: { value: "", label: "", _id: "" },
  is_superadmin: false,
};

const useUsers = () => {
  const axiosInstance = useAxios(); // Axios instance'ını alıyoruz
  //   const token = useAtomValue(tokenAtom);
  const [user, setUser] = useState<User>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getUser = async () => {
    try {
      const data = await axiosInstance.get(`users/1`);
      if ("data" in data) {
        setUser(data?.data);
      }
    } catch (error) {
      setError(true)
    } finally {setLoading(false)}
  };

  return {
    getUser,
    user,
    loading,
    error
  };
};

export default useUsers;
