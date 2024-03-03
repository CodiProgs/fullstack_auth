"use client"

import React, { useEffect } from 'react';

function ModalWindow({ setShow, message }: { setShow: React.Dispatch<React.SetStateAction<boolean>>, message: string }) {

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000)
  }, []);

  return (
    <div className='fixed bg-bg_soft text-center top-[30px] left-0 right-0 mx-auto max-w-[300px] w-full px-[30px] py-[20px] h-max min-h-[100px] border border-blueColor z-50 flex items-center flex-col gap-4 rounded-lg'>
      <p>{message}</p>
    </div>
  );
}

export default ModalWindow;