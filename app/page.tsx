import LastAddedBook from "@/components/LastAddedBook";
import styles from "./page.module.css";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <section
        className={"flex justify-center items-center " + styles.mainBackground}
      >
        <div>
          <h2 className="text-5xl text-white text-center mb-5">
            İkinci El Kitabın Adresi
          </h2>

          <div className="flex text-white justify-center text-3xl gap-3">
            <p className="">
              İster{" "}
              <Link href={"/al"} className="text-orange-500">
                Al
              </Link>{" "}
            </p>
            <p>
              İster{" "}
              <Link href={"/sat"} className="text-blue-500">
                Sat
              </Link>
            </p>
          </div>
        </div>
      </section>
      <LastAddedBook />

     <Footer fixed=""/>
    </main>
  );
}
