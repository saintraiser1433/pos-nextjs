'use client';
import { useGlobal } from '@/context/GlobalProvider';
import React from 'react';

const PageHeader = () => {
  const global = useGlobal();
  return (
    <div className='flex flex-col '>
      <h1 className='text-2xl font-semibold'>
        List of{' '}
        <span className='capitalize'>{global.state?.title || 'Unknown'}</span>
      </h1>
      <span className='italic text-sm'>
        Here's the list of {global.state?.title || 'unknown'} in Next POS Gen
      </span>
    </div>
  );
};

export default PageHeader;
