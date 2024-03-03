"use client"

import { DeleteUserMutation } from '@/gql/graphql';
import { DELETE_USER } from '@/graphql/mutation/DeleteUser';
import { useGlobalStore } from '@/storage/GlobalStorage';
import { useMutation } from '@apollo/client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

function DeleteUser() {
  const [deleteUser] = useMutation<DeleteUserMutation>(DELETE_USER)
  const { data } = useSession()
  const handleDeleteUser = async () => {
    const res = await deleteUser({
      variables: {
        id: data?.user.id
      }
    })
    if (res && res.data) {
      signOut();
      useGlobalStore.setState({ token: undefined });
    }
  }

  return (
    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded' onClick={handleDeleteUser}>Delete User</button>
  );
}

export default DeleteUser;