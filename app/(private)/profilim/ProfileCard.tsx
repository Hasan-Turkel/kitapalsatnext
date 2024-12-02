"use client";
import useUser from "@/utils/useUser";
import { useEffect } from "react";
import Loading from "@/app/Loading";

const ProfileCard = () => {
  const { getUser, user, loading, error } = useUser();



  useEffect(() => {
    getUser();
  }, []);



  if ( loading) {
    return <Loading />;
  } else if (error) {
    return (
      <h2 className="text-xl my-5 text-red-500 ">
        Aranan Kitaplar Yüklenemedi
      </h2>
    );
  } else {


    return (
      <section className="max-w-[840px] m-auto my-10 p-3">
        <p> Ad Soyad: {user?.fullname}</p>
        <p> Email: {user?.email}</p>
      </section>
    );
  }
};

export default ProfileCard;
