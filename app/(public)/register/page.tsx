"use client";

import { Form, Formik, Field } from "formik";
import { useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import "react-phone-input-2/lib/style.css";
import { SingleValue } from "react-select";
import dynamic from "next/dynamic";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import * as Yup from "yup"; // Import Yup for validation
import useAuth from "@/utils/useAuth";

const Select = dynamic(() => import("react-select"), {
  ssr: false, // Don't render on SSR
});

interface Option {
  value: string;
  label: string;
}

interface FormValues {
  email: string;
  password: string;
  fullname: string;
}

const page = () => {
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const [city, setCity] = useState<SingleValue<Option | null>>(null);
  const [district, setDistrict] = useState<SingleValue<Option | null>>(null);

  const handleChangeCity = (selected: unknown) => {
    if (
      selected === null ||
      (typeof selected === "object" && "value" in selected)
    ) {
      setCity(selected as SingleValue<Option | null>);
      setDistrict(null); // Clear district when city changes
    }
  };

  const handleChangeDistrict = (selected: unknown) => {
    if (
      selected === null ||
      (typeof selected === "object" && "value" in selected)
    ) {
      setDistrict(selected as SingleValue<Option | null>);
    }
  };

  // Validation schema with Yup
  const validationSchema = Yup.object({
    fullname: Yup.string(),
    email: Yup.string()
      .email("Geçersiz email adresi"),
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
      .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
      .matches(/[0-9]/, "Şifre en az bir rakam içermelidir"),
    city: Yup.object().nullable(),
    district: Yup.object().nullable()
  });

  const { register } = useAuth();

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
            city: city,
            district: district,
          }}
          validationSchema={validationSchema} // Apply validation schema
          onSubmit={(values, actions) => {
            register({...values, city, district});
            actions.resetForm();
            setCity(null);
            setDistrict(null);
            actions.setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            isSubmitting,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              {/* Fullname Field */}
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
                  {touched.fullname && errors.fullname && (
                    <div className="text-red-500 text-xs">
                      {errors.fullname}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <label htmlFor="email" className="block text-sm font-medium my-2">
                E-Posta
              </label>
              <div className="border rounded-lg p-1">
                <Field
                  className="w-full p-3"
                  type="email"
                  name="email"
                  required
                />
              </div>
              {touched.email && errors.email && (
                <div className="text-red-500 text-xs">{errors.email}</div>
              )}

              {/* Password Field */}
              <label
                htmlFor="password"
                className="block text-sm font-medium my-2"
              >
                Şifre
              </label>
              <div className="relative border rounded-lg p-2">
                <Field
                  className="w-full p-3"
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
              {touched.password && errors.password && (
                <div className="text-red-500 text-xs">{errors.password}</div>
              )}

              {/* City Field */}
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
                    isSearchable={true}
                    placeholder="İl Seçiniz"
                  />
                
                </div>
              </div>

              {/* District Field */}
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
                    isSearchable={true}
                    placeholder="İlçe Seçiniz"
                  />
                
                </div>
              </div>

              {/* Submit Button */}
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
            <Link href="/login" className="text-blue-500 cursor-pointer">
              Giriş yap
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
