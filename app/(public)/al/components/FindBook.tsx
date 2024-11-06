"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { getCities, getDistrictsByCityCode } from "turkey-neighbourhoods";

interface Option {
  value: string;
  label: string;
}

const FindBook = () => {

    const [city, setCity] = useState<SingleValue<Option | null>>(null);
  const [district, setDistrict] = useState<SingleValue<Option | null>>(null);
  return (
    <section className="max-w-[840px] m-auto mt-10">
    <h2 className="text-3xl">Almak İstediğin Kitabı Kolayca Bul !</h2>
    <div className="my-5 flex flex-wrap gap-5">
      <div className="my-4">
        <label htmlFor="name">Kitabın Adı</label> <br />
        <div className="border max-w-[350px] px-2 rounded-lg">
          <input type="text" />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="author">Yazar Adı</label> <br />
        <div className="border max-w-[350px] px-2 rounded-lg">
          <input type="text" />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="bookStore">Yayınevi Adı</label> <br />
        <div className="border max-w-[350px] px-2 rounded-lg">
          <input type="text" />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="pulishmentYear">Basım Yılı</label> <br />
        <div className="border w-[350px] px-2 rounded-lg">
          <input type="number" defaultValue={new Date().getFullYear()} />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="city">İl</label> <br />
        <div className="border w-[350px] px-2 rounded-lg">
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
            onChange={(value) => {
              setCity(value);
              setDistrict(null);
            }}
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
            onChange={(value) => setDistrict(value)}
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
      <button className="rounded-lg bg-blue-400 p-3 h-[40px] w-[350px] hover:bg-blue-700 transition-colors duration-500 ease-in-out">
        Ara
      </button>
    </div>
  </section>
  )
}

export default FindBook