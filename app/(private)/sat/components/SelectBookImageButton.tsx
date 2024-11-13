import { useRef, useState } from "react";

interface SelectBookImageButtonProps {
    file: File[]; // Dosya dizisi
    setFile: React.Dispatch<React.SetStateAction<File[]>>; // Dosyaları değiştirecek fonksiyon
  }

// Tipleri belirliyoruz
const SelectBookImageButton: React.FC<SelectBookImageButtonProps> = ({ file, setFile }) =>  {
  

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    hiddenFileInput?.current?.click(); // input'u tetikliyoruz
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Seçilen dosyaları alıyoruz
    const fileUploaded = Array.from(event.target.files || []);
    setFile(fileUploaded); // Dosyaları state'e ekliyoruz
  };

  return (
    <>
      <button
      type="button"
        className="partner-button rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2"
        onClick={handleClick}
      >
        <span className="text-2xl font-light">+</span> Fotoğraf Seç
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }} // Inputu gizli tutuyoruz
      />
    </>
  );
};

export default SelectBookImageButton;
