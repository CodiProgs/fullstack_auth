"use client";

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './Header';

function GlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const array = ['/admin'] // '/register', '/login',
  return (
    <>
      {array.includes(pathname) ?
        (<>{children}</>) : (
          <div className='max-w-7xl mx-auto'>
            <Header />
            {children}
          </div>
        )}
    </>
  );
}

export default GlobalLayout;