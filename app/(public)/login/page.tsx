'use client'

import { Form, Formik, Field } from 'formik';
import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { RiEyeCloseLine } from 'react-icons/ri';

interface FormValues {
  email: string;
  password: string;
}

const page = () => {

    const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  
    const handlePasswordToggle = () => {
      setPasswordType(prev => (prev === 'password' ? 'text' : 'password'));
    };
  return (
    <section className="flex justify-center items-center h-[90svh] bg-gray-100">
    <div className="flex flex-col items-center justify-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      
      <h4 className="text-xl font-semibold mb-4">Giriş Yap</h4>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          
          actions.resetForm();
          actions.setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">E-Posta</label>
              <Field
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E-posta adresinizi girin"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">Şifre</label>
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
                  {passwordType === 'password' ? (
                    <RiEyeCloseLine className="text-xl" />
                  ) : (
                    <IoEyeOutline className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Giriş Yap!
              </button>
            </div>

            <div className="text-center mt-4">
              <span className="text-sm text-blue-500 cursor-pointer">Şifremi Unuttum</span>
              <span className="mx-2">-</span>
              <span className="text-sm text-blue-500 cursor-pointer">Kayıt Ol</span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </section>
  )
}

export default page