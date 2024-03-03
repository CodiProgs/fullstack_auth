import LogInForm from '@/components/LogInForm';
import React from 'react';

function page() {
  return (
    <div className='max-w-xl mx-auto py-6 bg-bg_soft absolute top-1/4 left-0 right-0 h-max w-full'>
      <div className='w-[80%] mx-auto flex flex-col items-center'>
        <h1 className="text-3xl font-bold capitalize mb-8">Sign in with</h1>
        <div className='my-4 text-stone-300'>- OR -</div>
        <LogInForm />
      </div>
    </div>
  );
}

export default page;