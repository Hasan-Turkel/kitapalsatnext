import Footer from "@/components/Footer";
import FindBook from "./components/FindBook";
import FoundBook from "./components/FoundBook";

const page = () => {
  return (
    <>
    
    <main className="p-3">
      
      <FindBook />
      <FoundBook />
    </main>
    <div className="h-[150px]">

    <Footer fixed="fixed"/>
    </div>
    </>
  );
};

export default page;
