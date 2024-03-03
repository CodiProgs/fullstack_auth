import DeleteUser from '@/components/DeleteUser';
import UpdateImage from '@/components/UpdateImage';
import UpdateUser from '@/components/UpdateUser';
import React from 'react';

function page() {
  return (
    <div className='max-w-xl mx-auto py-6 bg-bg_soft absolute top-1/4 left-0 right-0 h-max w-full'>
      <div className='w-[80%] mx-auto flex flex-col items-center'>
        <h1 className="text-3xl font-bold capitalize mb-8">Settings</h1>
        <UpdateUser />
        <UpdateImage />
        <div className='mt-4'>
          <DeleteUser />
        </div>
      </div>
    </div>
  );
}

export default page;