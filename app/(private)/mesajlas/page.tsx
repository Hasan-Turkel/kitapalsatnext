"use client";

import React, { useEffect, useRef } from "react";
import { useAtomValue } from "jotai"; // Jotai atomunu okuma
import {
  bookAtom,
  messageIdAtom,
  tokenAtom,
} from "@/utils/atoms";
import { Form, Formik, Field } from "formik";
import useMessages from "@/utils/useMessages";
import useUser from "@/utils/useUser";
import Loading from "@/app/Loading";
import { formatDateToTurkish } from "@/utils/funcs";
import Footer from "@/components/Footer";

const page = () => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const book = useAtomValue(bookAtom);
  const messageId = useAtomValue(messageIdAtom);
  const token = useAtomValue(tokenAtom);
  const {
    sendMessage,
    message,
    getMessage,
    isThereMessage,
    updateMessage,
    hasBeenRedOrDelete,
    loading,
    error,
  } = useMessages();
  const { user, getUser } = useUser();

const receiver = message?.participants?.filter((person:any)=>user?._id!=person?.user_id._id)[0]?.user_id?.fullname

  useEffect(() => {
    if (token) {
      getUser();

      if (!messageId) {
        isThereMessage(book?.bookId);
      } else if (messageId) {
        getMessage(messageId);
        hasBeenRedOrDelete({ date: new Date() }, messageId);
      }
    }
  }, [messageId, token]);
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [message]);

  if (token && loading) {
    return <Loading />;
  } else if (!token || error) {
    return (
      <h2 className="text-xl m-5 text-red-500 ">Mesajlaşma Yüklenemedi.</h2>
    );
  } else {
    return (
      <main >
        <section
          className="max-w-[840px] m-auto my-10 relative p-3"
          style={{ height: "70svh" }}
        >
          <h2 className="text-center">{book?.bookName}</h2>
          <p>{receiver || book?.bookSeller}</p>
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
                <p className=" text-black ">{message?.message}</p>
                <p className="text-end text-black text-xs">
                  {formatDateToTurkish(message?.date)}
                </p>
              </div>
            ))}
          </section>

          <div className="m-1 absolute bottom-0 w-11/12 ">
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
                <Form className="border border-black bg-white ps-2 rounded-lg flex ">
                  {/* Mesaj input alanı */}
                  <Field
                    required
                    type="text"
                    name="message"
                    className="w-full text-black"
                    placeholder="Mesajınız..."
                    value={values.message} // Formik'in değerini kullanıyoruz
                    onChange={handleChange} // Değer değiştirildiğinde Formik'e bildiriyoruz
                    onBlur={handleBlur} // Input'un dışına çıkıldığında yapılan işlem
                  />

                  {/* Gönder butonu */}
                  <button
                    type="submit"
                    className="border border-black text-black rounded-lg p-2"
                  >
                    Gönder
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </section>
        <div>
          <Footer fixed="" />
        </div>
      </main>
    );
  }
};

export default page;
