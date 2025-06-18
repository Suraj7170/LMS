'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FlashcardItem from './_component/flashcardItem';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function FlashCards() {
  const { courseId } = useParams();
  const [flashCards, setFlashCards] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});

  useEffect(() => {
    GetFlashCards();
  }, []);

  const GetFlashCards = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId,
        studyType: 'flashcard',
        content: null,
      });
      setFlashCards(result.data.content); // assuming array of flashcards
    } catch (error) {
      console.error('Failed to fetch flashcards:', error);
    }
  };

  const handleClick = (index) => {
    setFlippedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className='flex flex-col items-center justify-center p-10 gap-10'>
      <h2 className='font-bold text-5xl'>FlashCards</h2>
      <p className='font-semibold text-2xl'>FlashCards: The Ultimate Tool to Lock in Concepts!</p>

      <Carousel>
        <CarouselContent>
          {flashCards?.map((flashcard, index) => (
            <CarouselItem key={index} className='flex items-center justify-center gap-4'>
              <FlashcardItem
                flashcard={flashcard}
                isFlipped={!!flippedStates[index]}
                handleClick={() => handleClick(index)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default FlashCards;
