"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SingleValue } from "react-select";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/navigation";

const Select = dynamic(() => import("react-select"), {
  ssr: false, // Disable SSR for the select component
});

interface Option {
  value: string;
  label: string;
}

const FindBook = () => {
  const [city, setCity] = useState<SingleValue<Option | null>>(null);
  const [district, setDistrict] = useState<SingleValue<Option | null>>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Handle city change
  const handleChangeCity = (selected: unknown) => {
    if (
      selected === null ||
      (typeof selected === "object" && "value" in selected)
    ) {
      setCity(selected as SingleValue<Option | null>);
      setDistrict(null); // Clear the district when city changes
    }
  };

  // Handle district change
  const handleChangeDistrict = (selected: unknown) => {
    if (
      selected === null ||
      (typeof selected === "object" && "value" in selected)
    ) {
      setDistrict(selected as SingleValue<Option | null>);
    }
  };

  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    // `window` nesnesine sadece istemci tarafında erişebiliriz.
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Tarayıcıda geçerli URL'yi alıyoruz
    }
  }, []);

  const handleSave = (values: any) => {
    if (!currentUrl) return; // currentUrl henüz alınmamışsa çık

    const urlObj = new URL(currentUrl);
    const params = new URLSearchParams(urlObj?.search);
    const keysToRemove = [
      "bookName",
      "authorName",
      "publisher",
      "publicationYear",
      "city",
      "district",
      "page",
    ];

    // Gereksiz parametreleri silme
    keysToRemove.forEach((key) => params.delete(key));

    // Yeni parametreleri ekleme
    if (values?.bookName) params.append("bookName", values?.bookName);
    if (values?.authorName) params.append("authorName", values?.authorName);
    if (values?.publisher) params.append("publisher", values?.publisher);
    if (values?.publicationYear)
      params.append("publicationYear", values?.publicationYear);
    if (values?.city) params.append("city", values?.city?.value);
    if (values?.district) params.append("district", values?.district?.value);

    // URL'yi yönlendirme
    router.push(`/al?${params.toString()}`);
  };

  return (
    <section className="max-w-[840px] m-auto mt-10">
      <div className="my-5">
        <button
          className="rounded-lg border p-2"
          onClick={() => setOpen(!open)}
        >
          Arama ekranını {open ? "kapat" : "aç"}
        </button>
      </div>
      <div
        className={
          " transition-max-height duration-500 ease-in-out " +
          (open ? "" : "max-h-0 overflow-hidden")
        }
      >
        <h2 className="text-3xl">Almak İstediğin Kitabı Kolayca Bul !</h2>

        <Formik
          initialValues={{
            bookName: "",
            authorName: "",
            publisher: "",
            publicationYear: "",
          }}
          onSubmit={(values, action) => {
            console.log(values);
            handleSave({ ...values, city, district });
            setOpen(false);
          }}
        >
          {({ values, handleChange, handleBlur, resetForm }) => (
            <Form>
              <div className="my-5 flex flex-wrap gap-5">
                <div className="my-4">
                  <label htmlFor="bookName">Kitabın Adı</label> <br />
                  <div className="border bg-white max-w-[350px] px-2 rounded-lg">
                    <Field
                      className="text-black"
                      type="text"
                      id="bookName"
                      name="bookName"
                      value={values.bookName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label htmlFor="authorName">Yazar Adı</label> <br />
                  <div className="border  bg-white max-w-[350px] px-2 rounded-lg">
                    <Field
                      className="text-black"
                      type="text"
                      id="authorName"
                      name="authorName"
                      value={values.authorName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label htmlFor="publisher">Yayınevi Adı</label> <br />
                  <div className="border  bg-white max-w-[350px] px-2 rounded-lg">
                    <Field
                      className="text-black"
                      type="text"
                      id="publisher"
                      name="publisher"
                      value={values.publisher}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label htmlFor="publicationYear">Basım Yılı</label> <br />
                  <div className="border  bg-white w-[350px] px-2 rounded-lg">
                    <Field
                      className="text-black"
                      type="number"
                      id="publicationYear"
                      name="publicationYear"
                      value={values.publicationYear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label htmlFor="city">İl</label> <br />
                  <div className="border  bg-white w-[350px] px-2 rounded-lg">
                    <Select
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          boxShadow: "none",
                          border: "none",
                          outline: "none",
                          height: "40px",
                          minWidth: "260px",
                          cursor: "pointer",
                          backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="gray" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
                          backgroundRepeat: "no-repeat",
                          backgroundPositionX: "100%",
                          backgroundPositionY: "50%",
                        }),
                        option: (baseStyles) => ({
                          ...baseStyles,
                          border: "none",
                          boxShadow: "none",
                          cursor: "pointer",
                          color: "black",
                        }),
                      }}
                      className="selectbox"
                      value={city}
                      onChange={handleChangeCity}
                      options={getCities().map((city) => ({
                        value: city.code,
                        label: city.name,
                      }))}
                      isSearchable={true} // Enable the search functionality
                      placeholder="İl Seçiniz"
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label htmlFor="district">İlçe</label> <br />
                  <div className="border  bg-white w-[350px] px-2 rounded-lg">
                    <Select
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          boxShadow: "none",
                          border: "none",
                          outline: "none",
                          height: "40px",
                          minWidth: "260px",
                          cursor: "pointer",
                          backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="gray" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
                          backgroundRepeat: "no-repeat",
                          backgroundPositionX: "100%",
                          backgroundPositionY: "50%",
                        }),
                        option: (baseStyles) => ({
                          ...baseStyles,
                          border: "none",
                          boxShadow: "none",
                          cursor: "pointer",
                          color: "black",
                        }),
                      }}
                      className="selectbox"
                      value={district}
                      onChange={handleChangeDistrict}
                      options={getDistrictsByCityCode(city?.value || "82").map(
                        (district) => ({
                          value: district,
                          label: district,
                        })
                      )}
                      isSearchable={true} // Enable the search functionality
                      placeholder="İlçe Seçiniz"
                    />
                  </div>
                </div>
              </div>
              <div className="my-4 flex gap-2 flex-wrap">
                <button
                  type="submit"
                  className="text-white rounded-lg bg-blue-500 p-3 h-[40px] w-[350px] hover:bg-blue-600 transition-colors duration-500 ease-in-out"
                >
                  Ara
                </button>
                <button
                  type="button"
                  className="text-white rounded-lg bg-yellow-500 p-3 h-[40px] w-[350px] hover:bg-yellow-600 transition-colors duration-500 ease-in-out"
                  onClick={() => {
                    resetForm();
                    handleSave({});
                  }}
                >
                  Filtreleri Temizle
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default FindBook;
