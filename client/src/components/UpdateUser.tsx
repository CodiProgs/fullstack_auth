"use client"

import React from 'react';
import Input from './Input';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '@/graphql/mutation/UpdateUser';
import { GetUserProfileQuery, UpdateUserMutation } from '@/gql/graphql';
import { GraphQLErrorExtensions } from 'graphql';
import { useSession } from 'next-auth/react';
import { GET_USER_PROFILE } from '@/graphql/queries/GetUserProfile';

function UpdateUser() {
  const { data: sessionData, update } = useSession();
  const [updateUser] = useMutation<UpdateUserMutation>(UPDATE_USER);
  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({});

  const { data, loading, error } = useQuery<GetUserProfileQuery>(GET_USER_PROFILE, { variables: { nickname: sessionData?.user.nickname } })

  const [updateData, setUpdateData] = React.useState({
    name: '',
    surname: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({})
    const response = await updateUser({
      variables: {
        name: updateData.name,
        surname: updateData.surname
      }
    }).catch(error => {
      if (error && error.graphQLErrors[0] && error.graphQLErrors[0].extensions) {
        setErrors(error.graphQLErrors[0].extensions)
      }
    })

    if (response && !response.errors) {
      await update({
        name: updateData.name,
        surname: updateData.surname,
      })
    }
  }

  return (
    <form className='flex flex-col w-full gap-4' onSubmit={onSubmit}>
      <Input type="text" label='Name' value={data?.getUserProfile.name} onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} error={errors?.name as string} />
      <Input type="text" label='Surname' value={data?.getUserProfile.surname} onChange={(e) => setUpdateData({ ...updateData, surname: e.target.value })} error={errors?.surname as string} />
      <div className='flex justify-between items-center gap-4'>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 text-center rounded'>Update</button>
      </div>
    </form>
  );
}

export default UpdateUser;