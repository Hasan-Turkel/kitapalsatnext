"use client";
import { useState, FC } from "react";
import { FaFastForward, FaFastBackward } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
interface PaginationProps {
  count: number;
  getBooks: (page: number, params: string) => void;
  params: string;
}

const Pagination: FC<PaginationProps> = ({ count, getBooks, params }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(count / 5);
  const next = totalPages > page;
  const previous = count > 0 && page > 1;

  const searchParams = useSearchParams(); // mevcut query parametrelerini al
  const newParams = new URLSearchParams(searchParams); // URLSearchParams nesnesine dönüştür

  newParams.delete("page");

  const modifiedParams = newParams.toString();

  const handlePage = (num: number) => {
    setPage(num);
    !params && getBooks(num, modifiedParams);
  };

  return (
    <div className="flex justify-center">
      {previous && (
        <div className="flex gap-2 p-2 items-center ">
          <Link
            href={modifiedParams ? `?page=1&${modifiedParams}` : `?page=1`}
            scroll={false}
            role="button"
            className="text-lg bg-orange-500 p-2 rounded-full cursor-pointer w-[30px] h-[30px] flex items-center"
            onClick={() => handlePage(1)}
          >
            <FaFastBackward />
          </Link>

          <Link
            href={
              modifiedParams
                ? `?page=${page - 1}&${modifiedParams}`
                : `?page=${page - 1}`
            }
            scroll={false}
            role="button"
            className="text-lg bg-orange-500 p-2 rounded-full cursor-pointer "
            onClick={() => handlePage(page - 1)}
          >
            Önceki Sayfa
          </Link>
        </div>
      )}
      {next && (
        <div className=" flex gap-2 p-2 items-center ">
          <Link
            href={
              modifiedParams
                ? `?page=${page + 1}&${modifiedParams}`
                : `?page=${page + 1}`
            }
            scroll={false}
            role="button"
            className="text-lg bg-blue-500 p-2 rounded-full cursor-pointer"
            onClick={() => handlePage(page + 1)}
          >
            Sonraki Sayfa
          </Link>
          <Link
            href={
              modifiedParams
                ? `?page=${Math.ceil(count / 5)}&${modifiedParams}`
                : `?page=${Math.ceil(count / 5)}`
            }
            scroll={false}
            role="button"
            className="text-lg bg-blue-500 p-2 rounded-full cursor-pointer w-[30px] h-[30px] flex items-center"
            onClick={() => handlePage(Math.ceil(count / 5))}
          >
            <FaFastForward />
          </Link>
        </div>
      )}
    </div>
  );
};

// export default Pagination;

export default dynamic(() => Promise.resolve(Pagination), { ssr: false });
