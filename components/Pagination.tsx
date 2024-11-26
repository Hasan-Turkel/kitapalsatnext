"use client";
import { useState, FC } from "react";
import { FaFastForward, FaFastBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface PaginationProps {
  count: number;
  getBooks: (page: number, params:string) => void;
  params:string
}

const Pagination: FC<PaginationProps> = ({ count, getBooks, params }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const next = Math.ceil(count / 10) > page;
  const previous = Math.ceil(count / 10) < page ;

  const handlePage = (num: number) => {
    router.push(`/?page=${num}`);
    setPage(num);
    getBooks(num, params);
  };
  return (
    <div className="flex justify-center">
      {previous && (
        <div className="flex gap-2 p-2 items-center ">
          <p
            role="button"
            className="text-lg bg-orange-500 p-2 rounded-full cursor-pointer w-[30px] h-[30px] flex items-center"
            onClick={() => handlePage(1)}
          >
            <FaFastBackward />
          </p>

          <p
            role="button"
            className="text-lg bg-orange-500 p-2 rounded-full cursor-pointer "
            onClick={() => handlePage(page - 1)}
          >
            Önceki Sayfa
          </p>
        </div>
      )}
      {next && (
        <div className=" flex gap-2 p-2 items-center ">
          <p
            role="button"
            className="text-lg bg-blue-500 p-2 rounded-full cursor-pointer"
            onClick={() => handlePage(page + 1)}
          >
            Sonraki Sayfa
          </p>
          <p
            role="button"
            className="text-lg bg-blue-500 p-2 rounded-full cursor-pointer w-[30px] h-[30px] flex items-center"
            onClick={() => handlePage(Math.ceil(count / 10))}
          >
            <FaFastForward />
          </p>
        </div>
      )}
    </div>
  );
};

export default Pagination;
