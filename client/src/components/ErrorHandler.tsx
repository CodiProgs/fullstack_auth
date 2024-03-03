"use client"

import React, { useEffect, useState } from 'react';
import ModalWindow from './ModalWindow';

function ErrorHandler({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const listenUnexpectedError = () => {
      setShow(true);
      setErrorMessage("The website encountered an unexpected error. Please try again later.")
    };
    const listenUnauthenticatedError = () => {
      setShow(true);
      setErrorMessage("You are not authorized.")
    };

    window.addEventListener("UnexpectedError", listenUnexpectedError);
    window.addEventListener("UnauthenticatedError", listenUnauthenticatedError);
    return () => {
      window.removeEventListener("UnexpectedError", listenUnexpectedError)
      window.removeEventListener("UnauthenticatedError", listenUnauthenticatedError)
    };
  }, []);
  return (
    <>
      {children}
      {show && <ModalWindow setShow={setShow} message={errorMessage!} />}
    </>
  );
}

export default ErrorHandler;