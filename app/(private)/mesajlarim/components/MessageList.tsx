"use client";

import { useEffect } from "react";
import MessageCard from "./MessageCard";
import useMessages from "@/utils/useMessages";
import { MessageGetType } from "@/types";
import Loading from "@/app/Loading";

const messageList = () => {
  const { getMessages, data: messages, loading, error } = useMessages();

  useEffect(() => {
    getMessages();
  }, []);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return (
      <h2 className="text-xl my-5 text-red-500 ">
        Aranan Kitaplar Yüklenemedi
      </h2>
    );
  } else {
    return (
      <section className="max-w-[840px] m-auto my-10">
        {messages?.length>0 ? messages?.map((message: MessageGetType) => (
          <MessageCard key={message?._id} message={message} />
        )) : <h2>Mesajınız bulunmuyor.</h2>}

       
      </section>
    );
  }
};

export default messageList;
