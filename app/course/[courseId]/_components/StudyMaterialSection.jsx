'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

function StudyMaterialSection({ courseId, course }) {
  const [studyTypeContent, setStudyTypeContent] = useState();

  const MaterialList = [
    {
      name: 'Notes/Chapters',
      icon: '/notes.png',
      path: '/notes',
      desc: 'Notes and chapters of the course',
      type: 'notes',
    },
    {
      name: 'Flashcards',
      icon: '/flashcard.png',
      path: '/flashcard',
      desc: 'Remember the key points of the course',
      type: 'flashcard',
    },
    {
      name: 'Quiz',
      icon: '/quiz.png',
      path: '/quiz',
      desc: 'Great way to test your knowledge',
      type: 'quiz',
    },
    {
      name: 'Question/Answer',
      icon: '/qa.png',
      path: '/qa',
      desc: 'Ask your doubts and get answers',
      type: 'qa',
    },
  ];

  useEffect(() => {
    GenerateFlashcardContent();
    GetStudyMaterial();
  }, []);

  const GenerateFlashcardContent = async () => {
    console.log('Generating flashcard content...');


    const chaptersArray = course?.courseLayout?.studyMaterial?.chapters || [];
    const chapters = chaptersArray.map(chap => chap.title).join(', ');
    
    console.log('Flashcard Topics:', chapters);


    try {
      const result = await axios.post('/api/study-type-content', {
        courseId: courseId,
        type: 'flashcard',
        chapters: chapters,
      });
      console.log('Flashcard content generation response:', result.data);
    } catch (error) {
      console.error('Error generating flashcard content:', error);
    }
  };

  const GetStudyMaterial = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'ALL',
      });
      setStudyTypeContent(result.data.result);
    } catch (error) {
      console.error('Error fetching study materials:', error);
    }
  };

  return (
    <section className="my-16 px-4 lg:px-8">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">📚 Study Material</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MaterialList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white border border-gray-100 shadow-md hover:shadow-xl rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 mb-4 relative">
              <Image
                src={item.icon}
                alt={item.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-2 mb-6">{item.desc}</p>
            <Link href={`/course/${courseId}${item.path}`} passHref>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 transition-all">
                View
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StudyMaterialSection;
