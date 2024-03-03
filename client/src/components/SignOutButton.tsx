"use client"

import { LogoutMutation } from '@/gql/graphql';
import { LOGOUT } from '@/graphql/mutation/Logout';
import { useGlobalStore } from '@/storage/GlobalStorage';
import { useMutation } from '@apollo/client';
import { signOut } from 'next-auth/react';
import React from 'react';

function SignOutButton() {
  const [logout] = useMutation<LogoutMutation>(LOGOUT);
  const handleSignOut = async () => {
    await logout().then(() => {
      signOut();
      useGlobalStore.setState({ token: null });
    })

  }

  return (
    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded ml-4' onClick={handleSignOut}>Logout</button>
  );
}

export default SignOutButton;