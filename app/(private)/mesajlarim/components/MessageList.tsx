"use client";

import { useEffect } from "react";
import MessageCard from "./MessageCard";
import useMessages from "@/utils/useMessages";
import { MessageGetType } from "@/types";

const messageList = () => {
  const { getMessages, data: messages } = useMessages();

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <section className="max-w-[840px] m-auto my-10">
      {messages?.map((message: MessageGetType) => (
        <MessageCard key={message?._id} message={message} />
      ))}
    </section>
  );
};

export default messageList;
