"use client";

import React, { useEffect, useRef } from "react";
import { useAtomValue } from "jotai"; // Jotai atomunu okuma
import { bookAtom, messageIdAtom, newMessageAtom } from "@/utils/atoms";
import { Form, Formik, Field } from "formik";
import useMessages from "@/utils/useMessages";
import useUser from "@/utils/useUser";

const page = () => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const book = useAtomValue(bookAtom);
  const messageId = useAtomValue(messageIdAtom);
  const {
    sendMessage,
    message,
    getMessage,
    isThereMessage,
    updateMessage,
    hasBeenRedOrDelete,
  } = useMessages();
  const { user, getUser } = useUser();

  useEffect(() => {

    if(user?.fullname) {
      
      getUser();
  
      if (!messageId) {
        isThereMessage(book?.bookId);
      } else if (messageId) {
        getMessage(messageId);
        hasBeenRedOrDelete({ date: new Date() }, messageId);
      }
    }
  }, [messageId]);
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [message]);

  const newMessage = useAtomValue(newMessageAtom);

  console.log(newMessage);
  return (
    <main className="p-3 ">
      <section
        className="max-w-[840px] m-auto my-10 relative "
        style={{ height: "70svh" }}
      >
        <h2 className="text-center">{book?.bookName}</h2>
        <p>{book?.bookSeller}</p>
        <section ref={messageBoxRef} className="max-h-[50svh] overflow-auto">
          {message?.messages?.map((message: any, i: number) => (
            <div
              key={i}
              className={
                "max-w-[300px] p-2 m-2 bg-gray-100 " +
                (user?._id == message?.user_id
                  ? "bg-green-100 ms-auto"
                  : "bg-gray-100")
              }
            >
              <p>{message?.message}</p>
              <p className="text-end text-xs">{message?.date}</p>
            </div>
          ))}
        </section>

        <div className="my-4 absolute bottom-0 w-full">
          <Formik
            initialValues={{ message: "" }} // Formun başlangıç değerleri
            onSubmit={(values, { resetForm }) => {
              messageId
                ? updateMessage(
                    { message: values?.message, date: new Date() },
                    messageId
                  )
                : sendMessage({
                    book_id: book?.bookId,
                    messages: [
                      {
                        user_id: "1",
                        date: new Date(),
                        message: values?.message,
                      },
                    ],
                    participants: [
                      { user_id: "1", lastSeen: new Date() },
                      { user_id: book?.bookSellerId, lastSeen: "0" },
                    ],
                  });
              // Mesaj gönderildikten sonra formu sıfırlamak (input temizlenir)
              resetForm();
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="border border-black ps-2 rounded-lg flex">
                {/* Mesaj input alanı */}
                <Field
                  required
                  type="text"
                  name="message"
                  className="w-full"
                  placeholder="Mesajınız..."
                  value={values.message} // Formik'in değerini kullanıyoruz
                  onChange={handleChange} // Değer değiştirildiğinde Formik'e bildiriyoruz
                  onBlur={handleBlur} // Input'un dışına çıkıldığında yapılan işlem
                />

                {/* Gönder butonu */}
                <button type="submit" className="border rounded-lg p-2">
                  Gönder
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default page;
