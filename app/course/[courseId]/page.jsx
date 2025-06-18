'use client'

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseIntroCards from './_components/CourseIntroCards';
import StudyMaterialSection from './_components/StudyMaterialSection';
import ChapterList from './_components/ChapterList';

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const GetCourse = async () => {
      try {
        const res = await fetch('/api/courses?courseId=' + courseId);
        if (!res.ok) throw new Error('Failed to fetch course');
        const data = await res.json();
        setCourse(data.result);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    GetCourse();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>No course found</div>;

  return (
    <div>
      <div className="mx-10 md:mx-36 lg:mx-60 mt-10 p-5">
        <CourseIntroCards course={course} />
        <StudyMaterialSection courseId={courseId} course={course} />
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default Course;
