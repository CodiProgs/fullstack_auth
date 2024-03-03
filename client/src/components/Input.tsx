import React from 'react';

type Props = {
  type: string,
  label: string,
  error?: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ type, label, error, value, onChange }: Props) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={label}>{label}</label>
      <input type={type} id={label} defaultValue={value} className='w-full rounded-sm py-2 outline-none px-4 bg-bg' onChange={onChange} />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
}

export default Input;