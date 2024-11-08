import LastAddedBook from "@/components/LastAddedBook";
import FindBook from "./components/FindBook";
import FoundBook from "./components/FoundBook";

const page = () => {
  return (
    <main className="p-3">
      <FindBook />
      <FoundBook/>
      <LastAddedBook/>
    </main>
  );
};

export default page;
