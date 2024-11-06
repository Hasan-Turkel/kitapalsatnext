"use client";

import { useState } from "react";
import SelectBookImageButton from "./SelectBookImageButton";
import Image from "next/image";

const SetInfoBook = () => {
  const [file, setFile] = useState<File[]>([]); // Dosyaları tutacak state

  console.log(file);
  return (
    <section className="max-w-[840px] m-auto mt-10">
      <h2 className="text-3xl">Satmak istediğin Kitabın Bilgilerini Gir!</h2>
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
          <SelectBookImageButton file={file} setFile={setFile} />
        </div>

        {file[0] && (
          <div className="my-4">
            <Image
              src={URL.createObjectURL(file[0])} // Buraya gerçek görsel yolunuzu yazın
              alt="A description of the image"
              width={200} // Genişlik
              height={200} // Yükseklik
              className="object-contain" // object-fit: contain
            />
          </div>
        )}
      </div>
      <div className="my-4">
        <button className="rounded-lg bg-blue-400 p-3 h-[40px] w-[350px] hover:bg-blue-700 transition-colors duration-500 ease-in-out">
          Yayınla
        </button>
      </div>
    </section>
  );
};

export default SetInfoBook;
