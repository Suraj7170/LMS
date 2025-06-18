import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import React from 'react';

function CourseIntroCards({ course }) {
  const chapters = course?.courseLayout?.studyMaterial?.chapters ?? [];

  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 border border-gray-200 shadow-lg rounded-2xl bg-white">
      <div className="flex-shrink-0">
        <Image src="/knowledge.png" alt="Course Icon" width={90} height={90} className="rounded-md" />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{course?.topic}</h2>
          <p className="text-gray-600 mt-2 text-sm">{course?.courseLayout?.studyMaterial?.summary}</p>
        </div>

        <div className="mt-4">
          <Progress value={0} className="h-2 bg-gray-100" />
          <h2 className="mt-3 font-medium text-blue-600">
            Total Chapters: {chapters.length}
          </h2>
        </div>

        {/* Uncomment if you want to show chapter titles */}
        {/* <div className="mt-4">
          {chapters.map((chapter, index) => (
            <p key={index} className="text-sm text-gray-700">📘 {chapter.title}</p>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default CourseIntroCards;
