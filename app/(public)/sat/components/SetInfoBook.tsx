import { FC, useState } from "react";
import { Formik, Field, Form } from "formik";
import SelectBookImageButton from "./SelectBookImageButton";
import Image from "next/image";

interface SetInfoBookProps {
  arrange: boolean;
  onClose: () => void;
}

const SetInfoBook: FC<SetInfoBookProps> = ({ arrange, onClose }) => {
  const [file, setFile] = useState<File[]>([]);

  return (
    <section className="max-w-[840px] m-auto mt-10">
      {!arrange && (
        <h2 className="text-3xl">Satmak istediğin Kitabın Bilgilerini Gir!</h2>
      )}

      <Formik
        initialValues={{
          name: "",
          author: "",
          bookStore: "",
          pulishmentYear: new Date().getFullYear().toString(),
          description: "",
        }}
        onSubmit={(values, action) => {
          // Formu submit etme işlemleri
          console.log("Form values:", values);
          console.log("Selected file:", file);
          action.resetForm()
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div className="my-5 flex flex-wrap gap-5">
              <div className="my-4">
                <label htmlFor="name">Kitabın Adı</label> <br />
                <div className="border max-w-[350px] px-2 rounded-lg">
                  <Field
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                  />
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="author">Yazar Adı</label> <br />
                <div className="border max-w-[350px] px-2 rounded-lg">
                  <Field
                    type="text"
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                    required
                  />
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="bookStore">Yayınevi Adı</label> <br />
                <div className="border max-w-[350px] px-2 rounded-lg">
                  <Field
                    type="text"
                    name="bookStore"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bookStore}
                    required
                  />
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="pulishmentYear">Basım Yılı</label> <br />
                <div className="border max-w-[350px] px-2 rounded-lg">
                  <Field
                    type="number"
                    name="pulishmentYear"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pulishmentYear}
                    required
                  />
                </div>
              </div>

              <div className="my-4">
                <label htmlFor="description">Açıklama</label> <br />
                <div className="border max-w-[350px] px-2 rounded-lg">
                  <Field
                    className="resize-none h-[100px]"
                    as="textarea"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dosya seçme */}
            <div className="my-4">
              <SelectBookImageButton file={file} setFile={setFile} />
            </div>

            {/* Yüklenen dosya görseli */}
            {file[0] && (
              <div className="my-4">
                <Image
                  src={URL.createObjectURL(file[0])} // Görselin URL'si
                  alt="Book Image"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            )}

            {/* Yayımlama ve düzenleme butonları */}
            <div className="my-4">
              {arrange ? (
                <div className="flex gap-5">
                  <button
                    type="button"
                    onClick={onClose}
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
