'use client';

import React, { useState, useEffect } from 'react';
import SelectOption from './_component/SelectOption';
import TopicInput from './_component/TopicInput';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation'; // ✅ FIXED

function Create() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  useEffect(() => {
    console.log('FormData Updated:', formData);
  }, [formData]);

  const GenerateCourseOutline = async () => {
    try {
      const courseId = uuidv4();
      setLoading(true);
      const response = await axios.post('/api/generate-course-outline', {
        courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress
      });
      setLoading(false);
      router.replace('/dashboard'); // ✅ Still works as expected in App Router
      console.log('Course Outline:', response.data);
    } catch (error) {
      setLoading(false);
      console.error('Error generating course outline:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20 gap-5">
      <h2 className="font-bold text-4xl text-blue-600">
        Start Building Your Personal Study Material
      </h2>
      <p className="text-gray-500 text-lg">
        Fill all details in order to generate study material for your next project
      </p>

      <div className="mt-10 w-full">
        {step === 0 ? (
          <SelectOption selectedStudyType={(value) => handleUserInput('studyType', value)} />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput('topic', value)}
            setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
          />
        )}
      </div>

      <div className="flex justify-between w-full mt-8">
        {step !== 0 && (
          <Button className='cursor-pointer' variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step === 0 ? (
          <Button className='cursor-pointer' onClick={() => setStep(step + 1)}>
            Next
          </Button>
        ) : (
          <Button
            className='cursor-pointer'
            onClick={GenerateCourseOutline}
            disabled={loading} // ✅ FIXED typo: `disable` → `disabled`
          >
            {loading ? <Loader className='animate-spin' /> : 'Generate'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Create;
