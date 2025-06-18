import { Button } from '@/components/ui/button';
import React from 'react';

function QuizCardItem({ quiz }) {
  console.log("Quiz item:", quiz);
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-10 transition hover:shadow-xl">
      <h2 className="text-center font-semibold text-2xl text-gray-800 mb-4">
        {quiz?.question}
      </h2>
      <h3 className="text-lg text-green-600 font-medium">
        Answer: <span className="font-semibold">{quiz?.answer}</span>
      </h3>
    </div>
  );
}

export default QuizCardItem;
