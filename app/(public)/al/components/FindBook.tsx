"use client";

import { useState } from "react";
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

  // Formik validation schema

  const currentUrl = window.location.href;
  const urlObj = new URL(currentUrl);
  const handleSave = (values:any) => {
    const params = new URLSearchParams(urlObj?.search);
    const keysToRemove = [
      "bookName",
      "authorName",
      "publisher",
      "publicationYear",
      "city",
      "district",
    ];

    keysToRemove.forEach((key) => params.delete(key));
    if (values?.bookName) {
      params.append("bookName", values?.bookName);
    }
    if (values?.authorName) {
      params.append("authorName", values?.authorName);
    }
    if (values?.publisher) {
      params.append("publisher", values?.publisher);
    }
    if (values?.publicationYear) {
      params.append("publicationYear", values?.publicationYear);
    }
    if (values?.city) {
      params.append("city", values?.city?.value);
    }
    if (values?.district) {
      params.append("district", values?.district?.value);
    }
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
            // Handle form submission
            handleSave({ ...values, city, district });
            setOpen(false)
            action.resetForm()
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className="my-5 flex flex-wrap gap-5">
                <div className="my-4">
                  <label htmlFor="bookName">Kitabın Adı</label> <br />
                  <div className="border max-w-[350px] px-2 rounded-lg">
                    <Field
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
                  <div className="border max-w-[350px] px-2 rounded-lg">
                    <Field
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
                  <div className="border max-w-[350px] px-2 rounded-lg">
                    <Field
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
                  <div className="border w-[350px] px-2 rounded-lg">
                    <Field
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
                  <div className="border w-[350px] px-2 rounded-lg">
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
                  <div className="border w-[350px] px-2 rounded-lg">
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
              <div className="my-4">
                <button
                  type="submit"
                  className="text-white rounded-lg bg-blue-500 p-3 h-[40px] w-[350px] hover:bg-blue-600 transition-colors duration-500 ease-in-out"
                >
                  Ara
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
