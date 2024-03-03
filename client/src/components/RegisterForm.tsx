"use client";

import { RegisterMutation } from '@/gql/graphql';
import { REGISTER } from '@/graphql/mutation/Register';
import { useMutation } from '@apollo/client';
import { GraphQLErrorExtensions } from 'graphql';
import { useRouter } from 'next/navigation';
import React from 'react';
import Input from './Input';
import Link from 'next/link';

function RegisterForm() {
  const router = useRouter();

  const [register] = useMutation<RegisterMutation>(REGISTER);
  const [errors, setErrors] = React.useState<GraphQLErrorExtensions>({});

  const [registerData, setRegisterData] = React.useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({})

    const response = await register({
      variables: {
        name: registerData.name,
        surname: registerData.surname,
        email: registerData.email,
        nickname: registerData.email.split('@')[0],
        password: registerData.password,
        passwordConfirm: registerData.passwordConfirm,
      }
    }).catch(error => {
      if (error && error.graphQLErrors[0] && error.graphQLErrors[0].extensions) {
        setErrors(error.graphQLErrors[0].extensions)
      }
    })

    if (response && response.data) {
      router.push(`/login`);
    }
  };
  return (
    <form className='flex flex-col w-full gap-4' onSubmit={onSubmit}>
      <Input type="text" label="Name" onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} error={errors?.name as string} />
      <Input type="text" label="Surname" onChange={(e) => setRegisterData({ ...registerData, surname: e.target.value })} error={errors?.surname as string} />
      <Input type="email" label="Email" onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} error={errors?.email as string} />
      <Input type="password" label="Password" onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} error={errors?.password as string} />
      <Input type="password" label="Confirm password" onChange={(e) => setRegisterData({ ...registerData, passwordConfirm: e.target.value })} error={errors?.passwordConfirm as string} />
      <div className='flex justify-between items-center gap-4'>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 text-center rounded '>Register</button>
        <Link href="/login" className='hover:text-blue-500 p-2 text-center'>Already have an account?</Link>
      </div>
    </form>
  );
}

export default RegisterForm;