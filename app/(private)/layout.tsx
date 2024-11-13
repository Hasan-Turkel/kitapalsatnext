"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Storage from "@/utils/storage";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Storage?.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      toast.warning("Bu işlem için öncelikle giriş yapmalısınız.");
      router.push("/login");
    }
  }, [token]);

  return <section>{children}</section>;
}
