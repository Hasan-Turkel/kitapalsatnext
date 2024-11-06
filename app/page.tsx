import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main
      className={"flex justify-center items-center " + styles.mainBackground}
    >
      <div>
        <h2 className="text-5xl text-white text-center mb-5">
          İkinci El Kitabın Adresi
        </h2>

        <div className="flex text-white justify-center text-3xl gap-3">
          <p className="">
            İster <span className="text-orange-500">Al</span>{" "}
          </p>
          <p>
            İster <span className="text-blue-500">Sat</span>
          </p>
        </div>
      </div>
    </main>
  );
}
