import useAxios from "@/utils/useAxios";
import { toast } from "react-toastify";
import { useState } from "react";
import { IMessageModel } from "@/types";
import { useSetAtom } from "jotai"; // Jotai atomunu okuma
import { messageIdAtom } from "@/utils/atoms";

const useMessages = () => {
  const axiosInstance = useAxios(); // Axios instance'ını alıyoruz
  const [data, setData] = useState([]);
  const [message, setMessage] = useState<any>();

  const setMessageId = useSetAtom(messageIdAtom);

  const sendMessage = async (values: IMessageModel) => {
    try {
      await axiosInstance.post(`/messages`, values);
      toast.success("Mesaj gönderildi..");
    } catch (error) {
      // console.log(error);
      toast.error("Mesaj gönderilemedi.");
    }
  };
  const updateMessage = async (values:{message:string}, id:string) => {
    try {
     const data =  await axiosInstance.put(`/messages/${id}`, values);
     if ("data" in data) {
      setMessage(data?.data);
   
    }
      toast.success("Mesaj gönderildi..");
    } catch (error) {
      console.log(error);
      toast.error("Mesaj gönderilemedi.");
    }
  };
  const getMessages = async () => {
    try {
      const data = await axiosInstance.get(`/messages`);
      if ("data" in data) {
        setData(data?.data);

      
      }
    } catch (error) {
      // console.log(error);
      toast.error("Mesaj gönderilemedi.");
    }
  };
  const getMessage = async (id: string) => {
    try {
      const data = await axiosInstance.get(`/messages/${id}`);

      if ("data" in data) {
        setMessage(data?.data);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Mesaj gönderilemedi.");
    }
  };
  const isThereMessage = async (id: string) => {
    try {
      const data = await axiosInstance.get(`/messages/isThereMessage/${id}`);

      if ("result" in data && "id" in data) {
        if (data?.result && typeof data?.id === "string") {
          setMessageId(data.id);
        }
      }
    } catch (error) {
      // console.log(error);
      toast.error("Mesaj gönderilemedi.");
    }
  };

  return { sendMessage, getMessages, data, getMessage, message, isThereMessage, updateMessage };
};

export default useMessages;
