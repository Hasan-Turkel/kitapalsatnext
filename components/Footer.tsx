import Link from "next/link";


interface FooterProps {
  fixed:string
  }

  const Footer: React.FC<FooterProps> = ({ fixed }) => {
  return (
    <footer className={"w-full px-5 py-3 bg-gray-800 flex justify-between flex-wrap bottom-0  " + fixed}>
      <div style={{ width: "300px" }}>
        <Link href="/" className="text-white text-xl">
          <h1 className="text-xl text-nowrap m-1">İkinciElKitapAlSat</h1>
        </Link>
      </div>
      <div>
          <h2 className="text-lg text-white text-center mb-5">
            İkinci El Kitabın Adresi
          </h2>

          <div className="flex text-white justify-center text-md gap-3">
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
    </footer>
  );
};

export default Footer;
