"use client";
import { FC, useState } from "react";
import { Formik, Field, Form } from "formik";
import SelectBookImageButton from "./SelectBookImageButton";
import Image from "next/image";
import * as Yup from "yup"; // Yup'u dahil ediyoruz
import useBooks from "@/utils/useBooks";
import { Book } from "@/types";

interface SetInfoBookProps {
  arrange: boolean;
  onClose: () => void;
  book: Book;
}

const SetInfoBook: FC<SetInfoBookProps> = ({ arrange, onClose, book }) => {
  const [file, setFile] = useState<File[]>([]);

  // Yup validasyon şeması
  const validationSchema = Yup.object({
    name: Yup.string().required("Kitabın adı zorunludur."), // Kitap adı zorunlu ve string
    author: Yup.string().required("Yazar adı zorunludur."), // Yazar adı zorunlu ve string
    bookStore: Yup.string().required("Yayınevi adı zorunludur."), // Yayınevi adı zorunlu ve string
    publishmentYear: Yup.number().required("Basım yılı zorunludur."), // Basım yılı zorunlu
    description: Yup.string().required("Açıklama zorunludur."), // Açıklama zorunlu ve string
    price: Yup.string().required("Fiyat zorunludur."), // Açıklama zorunlu ve string
  });

  const { sendBook, arrangeBook } = useBooks();

  return (
    <section className="max-w-[840px] m-auto mt-10">
      {!arrange && (
        <h2 className="text-3xl">Satmak istediğin Kitabın Bilgilerini Gir!</h2>
      )}

      <Formik
        enableReinitialize
        initialValues={
          arrange
            ? book
            : {
                name: "",
                author: "",
                bookStore: "",
                publishmentYear: new Date().getFullYear().toString(),
                description: "",
                price: "",
              }
        }
        validationSchema={validationSchema} // Validation şemasını burada uyguluyoruz
        onSubmit={(values, action) => {
          // Formu submit etme işlemleri
          arrange? arrangeBook(book?._id, values, file[0]) :
          sendBook(values, file[0]);
          arrange && onClose();
          action.resetForm();
          setFile([]);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <div className="my-5 flex flex-wrap gap-5">
              <div className="my-4">
                <label className={arrange ?'text-black':''} htmlFor="name">Kitabın Adı</label> <br />
                <div className="border bg-white max-w-[350px] px-2 rounded-lg">
                  <Field
                  className='text-black'
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                  />
                </div>
                {touched.name && errors.name && (
                  <div className="text-red-500 text-xs">{errors.name}</div>
                )}
              </div>

              <div className="my-4">
                <label className={arrange ?'text-black':''} htmlFor="author">Yazar Adı</label> <br />
                <div className="border bg-white max-w-[350px] px-2 rounded-lg">
                  <Field
                  className='text-black'
                    type="text"
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                    required
                  />
                </div>
                {touched.author && errors.author && (
                  <div className="text-red-500 text-xs">{errors.author}</div>
                )}
              </div>

              <div className="my-4">
                <label className={arrange ?'text-black':''} htmlFor="bookStore">Yayınevi Adı</label> <br />
                <div className="border bg-white max-w-[350px] px-2 rounded-lg">
                  <Field
                  className='text-black'
                    type="text"
                    name="bookStore"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bookStore}
                    required
                  />
                </div>
                {touched.bookStore && errors.bookStore && (
                  <div className="text-red-500 text-xs">{errors.bookStore}</div>
                )}
              </div>
              <div className="my-4">
                <label className={arrange ?'text-black':''} htmlFor="price">Fiyat TL*</label> <br />
                <div className="border bg-white max-w-[350px] px-2 rounded-lg">
                  <Field
                  className='text-black'
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    required
                  />
                </div>
                {touched.price && errors.price && (
                  <div className="text-red-500 text-xs">{errors.price}</div>
                )}
              </div>

              <div className="my-4">
                <label className={arrange ?'text-black':''} htmlFor="publishmentYear">Basım Yılı</label> <br />
                <div className="border bg-white max-w-[350px] px-2 rounded-lg">
                  <Field
                  className='text-black'
                    type="number"
                    name="publishmentYear"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.publishmentYear}
                    required
                  />
                </div>
                {touched.publishmentYear && errors.publishmentYear && (
                  <div className="text-red-500 text-xs">
                    {errors.publishmentYear}
                  </div>
                )}
              </div>

              <div className="my-4">
                <label className={arrange ?'text-black':''} htmlFor="description">Açıklama</label> <br />
                <div className="border bg-white max-w-[350px] px-2 rounded-lg">
                  <Field
                    className="resize-none text-black  h-[100px]"
                    as="textarea"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    required
                  />
                </div>
                {touched.description && errors.description && (
                  <div className="text-red-500 text-xs">
                    {errors.description}
                  </div>
                )}
              </div>
            </div>

            {/* Dosya seçme */}
            <div className="my-4">
              <SelectBookImageButton file={file} setFile={setFile} />
            </div>

            {/* Yüklenen dosya görseli */}
            <div className="my-4">
              {file[0] ? (
                <Image
                  src={URL.createObjectURL(file[0])} // Görselin URL'si
                  alt="Book Image"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              ) : (
                arrange &&
                book?.photo && (
                  <Image
                    src={book?.photo} // Görselin URL'si
                    alt="Book Image"
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                )
              )}
            </div>

            {/* Yayımlama ve düzenleme butonları */}
            <div className="my-4">
              {arrange ? (
                <div className="flex gap-5">
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    İptal Et
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="rounded-lg bg-blue-400 p-3 h-[40px] w-[350px] hover:bg-blue-700 transition-colors duration-500 ease-in-out"
                >
                  Yayınla
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default SetInfoBook;
