"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { URL_SERVER } from '@/utils/variables';
import SignOutButton from './SignOutButton';

function Header() {
  const { data: session, status } = useSession()
  return (
    <header className='flex justify-between items-center py-4 h-[64px]'>
      <Link href="/">Home</Link>
      {status !== 'loading' ? (status === 'authenticated' ? (
        <div className='flex items-center gap-2'>
          <Link href={`/user/${session.user?.nickname}`}>
            {session.user?.avatar !== 'null' ? (
              <Image src={session.user?.avatar!.indexOf('http') === -1 ? URL_SERVER + session.user?.avatar! : session.user.avatar!} alt="avatar" width={1920} height={1080} className='w-[32px] h-[32px] rounded-full object-cover' />
            ) : (
              <div className='w-[32px] h-[32px] rounded-full bg-slate-500'></div>
            )}
          </Link>
          <SignOutButton />
        </div>
      ) : (
        <button onClick={() => signIn()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>Login</button>
      )) : (
        <p>Loading...</p>
      )}
    </header>
  );
}

export default Header;