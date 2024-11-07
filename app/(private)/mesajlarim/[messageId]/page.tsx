'use client'

import React, { useEffect, useRef } from 'react';

const page = () => {

    const messageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, []);
  return (
    <main className="p-3 ">
      <section className="max-w-[840px] m-auto my-10 relative " style={{height:'70svh'}}>
        <h2 className="text-center">Türk Özel Hukuku Kişiler Hukuku</h2>
        <p>Hasan Türkel</p>
        <section  ref={messageBoxRef} className="max-h-[50svh] overflow-auto">
          <div className="max-w-[300px] bg-gray-100 p-2 m-2">
            <p>Merhabalar Hala satışta mı ?</p>
            <p className='text-end text-xs'>07.11.2024 -  15.41</p>
          </div>
          <div className="max-w-[300px] bg-green-100 p-2 m-2 ms-auto">
            <p>Hayır malesef satıştan kalktı. </p>
          </div>
          <div className="max-w-[300px] bg-gray-100 p-2 m-2">
            <p>Merhabalar Hala satışta mı ?</p>
          </div>
          <div className="max-w-[300px] bg-green-100 p-2 m-2 ms-auto">
            <p>Hayır malesef satıştan kalktı. </p>
          </div>
          <div className="max-w-[300px] bg-gray-100 p-2 m-2">
            <p>Merhabalar Hala satışta mı ?</p>
          </div>
          <div className="max-w-[300px] bg-green-100 p-2 m-2 ms-auto">
            <p>Hayır malesef satıştan kalktı. </p>
          </div>
          <div className="max-w-[300px] bg-gray-100 p-2 m-2">
            <p>Merhabalar Hala satışta mı ?</p>
          </div>
          <div className="max-w-[300px] bg-green-100 p-2 m-2 ms-auto">
            <p>Hayır malesef satıştan kalktı. </p>
          </div>
        </section>

        <div className="my-4 absolute bottom-0 w-full">
        <div className="border border-black ps-2 rounded-lg flex ">
          <input type="text" className='w-full' placeholder="Mesajınız..."/>
          <button className=' border rounded-lg p-2'>Gönder</button>
        </div>
      </div>
      </section>
    </main>
  );
};

export default page;
