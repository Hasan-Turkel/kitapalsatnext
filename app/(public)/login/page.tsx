"use client";

import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";
import * as Yup from "yup";

import useAuth from "@/utils/useAuth";
import Link from "next/link";


interface FormValues {
  email: string;
  password: string;
}

// Yup doğrulama şemasını tanımlayın
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta zorunludur")
    .min(8, "E-posta en az 8 karakter olmalıdır"),
  password: Yup.string()
    .required("Şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .matches(/[0-9]/, "Şifre en az bir rakam içermelidir"),
});

// Login işlemi için API isteği

const Page = () => {
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const handlePasswordToggle = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const {login} = useAuth()

 

  return (
    <section className="flex justify-center items-center h-[90svh] bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">Giriş Yap</h4>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema} // Yup doğrulama şemasını ekleyin
          onSubmit={(values, actions) => {
           login(values)
            actions.resetForm();
            actions.setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            isSubmitting,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  E-Posta
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E-posta adresinizi girin"
                  required
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Şifre
                </label>
                <div className="relative">
                  <Field
                    type={passwordType}
                    name="password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Şifrenizi girin"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    onClick={handlePasswordToggle}
                  >
                    {passwordType === "password" ? (
                      <RiEyeCloseLine className="text-xl" />
                    ) : (
                      <IoEyeOutline className="text-xl" />
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting} // İstek yapılırken butonu devre dışı bırak
                >
                Giriş {isSubmitting ? 'Yapılıyor' : 'Yap'}
                </button>
              </div>

             
              <div className="text-center mt-4">
                <Link href={'/register'} className="text-sm text-blue-500 cursor-pointer">
                  Kayıt Ol
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Page;
