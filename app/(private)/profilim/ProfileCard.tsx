"use client";
import useUser from "@/utils/useUser";
import { useEffect } from "react";

const ProfileCard = () => {
  const { getUser, user } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <section className="max-w-[840px] m-auto my-10 p-3">
      <p> Ad Soyad: {user?.fullname}</p>
      <p> Email: {user?.email}</p>
    </section>
  );
};

export default ProfileCard;
