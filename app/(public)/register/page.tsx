"use client";

import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SingleValue } from "react-select";
import dynamic from "next/dynamic";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";
const Select = dynamic(() => import("react-select"), {
  ssr: false, // SSR'de render etme
});

interface Option {
  value: string;
  label: string;
}

interface FormValues {
  email: string;
  password: string;
  fullname: string;

  kvkk: boolean;
  ecom: boolean;
  termsofuse: boolean;
}

const page = () => {
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const [phone, setPhone] = useState<string>("");

  const [city, setCity] = useState<SingleValue<Option | null>>(null);
  const [district, setDistrict] = useState<SingleValue<Option | null>>(null);

  const handleChangeCity = (selected: unknown) => {
    // Öncelikle selected değerinin doğru tipe sahip olduğunu kontrol etmeliyiz
    if (
      selected === null ||
      (typeof selected === "object" && "value" in selected)
    ) {
      // Burada `selected` doğru bir Option tipindedir, o yüzden `setSelectedOption`'a aktarabiliriz.
      setCity(selected as SingleValue<Option | null>);
      setDistrict(null);
    }
  };

  const handleChangeDistrict = (selected: unknown) => {
    // Öncelikle selected değerinin doğru tipe sahip olduğunu kontrol etmeliyiz
    if (
      selected === null ||
      (typeof selected === "object" && "value" in selected)
    ) {
      // Burada `selected` doğru bir Option tipindedir, o yüzden `setSelectedOption`'a aktarabiliriz.
      setDistrict(selected as SingleValue<Option | null>);
    }
  };

  return (
    <section className="flex justify-center items-center bg-light p-4">
      <div className="border p-6 rounded bg-white w-full max-w-md shadow-md">
        <div className="text-center mb-4">
          <p className="text-2xl font-semibold">Kayıt Ol</p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            fullname: "",
            kvkk: false,
            ecom: false,
            termsofuse: false,
          }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            setPhone("");
            actions.setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex gap-4 mb-2">
                <div className="w-full my-2">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium mb-2"
                  >
                    Ad Soyad
                  </label>
                  <div className="border rounded-lg p-1">
                    <Field
                      className="w-full p-3"
                      type="text"
                      name="fullname"
                      required
                    />
                  </div>
                </div>
              </div>

              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Cep Telefon
              </label>
              <PhoneInput
                containerClass="w-full py-2 border border-gray-300 rounded-md mb-4"
                inputStyle={{ border: "none", fontSize: "15px" }}
                country={"tr"}
                value={phone}
                onChange={(value) => setPhone(value)}
              />

              <label htmlFor="email" className="block text-sm font-medium my-2">
                E-Posta
              </label>

              <div className="border rounded-lg p-1">
                <Field
                  className="w-full p-3 "
                  type="email"
                  name="email"
                  required
                />
              </div>

              <label
                htmlFor="password"
                className="block text-sm font-medium my-2"
              >
                Şifre
              </label>
              <div className="relative mb-4 border rounded-lg p-2">
                <Field
                  className="w-full p-3 "
                  type={passwordType}
                  name="password"
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  onClick={() =>
                    setPasswordType(
                      passwordType === "password" ? "text" : "password"
                    )
                  }
                >
                  {passwordType === "password" ? (
                    <RiEyeCloseLine className="text-xl" />
                  ) : (
                    <IoEyeOutline className="text-xl" />
                  )}
                </button>
              </div>

              <div className="my-4">
        <label htmlFor="city">İl</label> <br />
        <div className="border px-2 rounded-lg">
          <Select
            required={true}
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
        <div className="border px-2 rounded-lg">
          <Select
            required={true}
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

              <div className="space-y-2 mb-4">
                <div>
                  <label className="flex items-center text-sm">
                    <Field type="checkbox" name="kvkk" className="mr-2" />
                    KVKK ve Açık Rıza Metnini onaylıyorum.
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <Field type="checkbox" name="ecom" className="mr-2" />
                    Tarafıma elektronik ileti gönderilmesini onaylıyorum.
                  </label>
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <Field type="checkbox" name="termsofuse" className="mr-2" />
                    Kullanım şartları metnini okudum ve onaylıyorum.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                Kayıt Ol
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <p className="text-sm">
            Zaten üye misin?{" "}
            <span className="text-blue-500 cursor-pointer">Giriş yap</span>
          </p>
          <p className="text-sm mt-2">
            Şifreni mi unuttun?{" "}
            <span className="text-blue-500 cursor-pointer">Şifre yenile</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
