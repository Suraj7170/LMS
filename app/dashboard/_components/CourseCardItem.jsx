import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CourseCardItem({ course }) {
  return (
    <div className='border rounded-2xl shadow-md p-5 bg-white'>
      <div className='flex justify-between items-start'>
        <Image src='/knowledge.png' alt='Course Icon' width={60} height={60} />

        <h2 className='text-[10px] px-2 p-1 bg-blue-500 text-white rounded-full'>{new Date().toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric'
        })}</h2>
      </div>

      <h2 className='mt-4 font-semibold text-lg text-gray-800'>{course?.topic}</h2>

      <p className='text-sm mt-2 line-clamp-2 text-gray-500'>
        {course?.courseLayout?.studyMaterial?.summary || 'No summary available.'}
      </p>

      <div className='mt-4'>
        <Progress value={0} />
      </div>

      <div className='mt-4 flex justify-end'>
        {course?.status=='Generating'?
        <h2 className='text-[12px] p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400'>
            <RefreshCcw className='h-4 w-4'/>
            Generating...</h2> :
        <Link href={'/course/'+course?.courseId}>
        <Button className='bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'>View</Button>
        </Link>
        }
      </div>
    </div>
  );
}

export default CourseCardItem;
