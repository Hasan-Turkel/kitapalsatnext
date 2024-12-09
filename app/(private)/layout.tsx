"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/utils/atoms";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const token = useAtomValue(tokenAtom)
  const router = useRouter();

  useEffect(() => {
    console.log(token)
    if (token==null) {
      console.log(token);
      toast.warning("Bu işlem için öncelikle giriş yapmalısınız.");
      router.push("/login");
    }
  }, [token]);

  return <section>{children}</section>;
}
