import useAxios from "@/utils/useAxios";
import { toast } from "react-toastify";
import { useState } from "react";
import { IMessageModel } from "@/types";
import { useSetAtom } from "jotai"; // Jotai atomunu okuma
import { messageIdAtom, newMessageAtom } from "@/utils/atoms";
import { useRouter } from "next/navigation";

const useMessages = () => {
  const axiosInstance = useAxios(); // Axios instance'ını alıyoruz
  const [data, setData] = useState([]);
  const [message, setMessage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const setMessageId = useSetAtom(messageIdAtom);
  const setNewMessage = useSetAtom(newMessageAtom);

  const sendMessage = async (values: IMessageModel) => {
    setLoading(true);
    try {
      const data = await axiosInstance.post(`/messages`, values);
      if ("data" in data) {
        setMessage(data?.data);
        if ("_id" in data?.data) {
          setMessageId(data?.data?._id);
        }
      }
      toast.success("Mesaj gönderildi..");
    } catch (error) {
      // console.log(error);
      toast.error("Mesaj gönderilemedi.");
    } finally {(setLoading(false))}
  };
  const updateMessage = async (
    values: { message: string; date: any },
    id: string
  ) => {
    setLoading(true)
    try {
      const data = await axiosInstance.put(`/messages/${id}`, values);
      if ("data" in data) {
        setMessage(data?.data);
      }
      toast.success("Mesaj gönderildi..");
    } catch (error) {
    
      toast.error("Mesaj gönderilemedi.");
    } finally {(setLoading(false))}
  };
  const hasBeenRedOrDelete = async (values: { date: any }, id: string) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/messages/redOrDelete/${id}`, values);
      isNewMessage();
      values?.date == "-1" && toast.success("Mesaj silindi.");
      values?.date == "-1" && router.push("/");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const getMessages = async () => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(`/messages`);
      if ("data" in data) {
        setData(data?.data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const getMessage = async (id: string) => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(`/messages/${id}`);

      if ("data" in data) {
        setMessage(data?.data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const isThereMessage = async (id: string) => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(`/messages/isThereMessage/${id}`);

      if ("result" in data && "id" in data) {
        if (data?.result && typeof data?.id === "string") {
          setMessageId(data.id);
        }
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const isNewMessage = async () => {
    setLoading(true);
    try {
      const data = await axiosInstance.get(`/messages/isNewMessage`);

      if ("data" in data) {
        setNewMessage(data?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    getMessages,
    data,
    getMessage,
    message,
    isThereMessage,
    updateMessage,
    isNewMessage,
    hasBeenRedOrDelete,
    loading,
    error,
  };
};

export default useMessages;
