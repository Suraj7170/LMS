'use client'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

function CourseList() {
    const {user}=useUser();
    const [courseList,setCourseList]=useState([]);
    const {totalCourse, setTotalCourse} = useContext(CourseCountContext);
    useEffect(()=>{
        user&&GetCourseList();
    },[user]);

    const GetCourseList=async() => {
        const result=await axios.post('/api/courses',{
            createdBy:user?.primaryEmailAddress?.emailAddress
        });
        console.log(result);
        setCourseList(result.data.result);
        setTotalCourse(result.data.result?.length);
    }
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-2xl'>Your Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3'>
            {courseList.map((course,index)=>(
                <CourseCardItem course={course} key={index}/>
            ))}
        </div>
    </div>
  )
}

export default CourseList