'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ViewNotes() {
  const { courseId } = useParams();
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'notes',
    });
    setNotes(result?.data?.notes || []);
  };

  const handleNext = () => {
    if (stepCount < notes.length) {
      setStepCount(stepCount + 1);
    }
  };

  const handlePrev = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
    }
  };

  return notes?.length ? (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Navigation */}
      {stepCount < notes.length && (
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={stepCount === 0}>
            ← Previous
          </Button>
          <div className="flex-1 mx-4 flex gap-2">
            {notes.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index <= stepCount ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={stepCount >= notes.length}
          >
            {stepCount === notes.length - 1 ? 'Finish' : 'Next →'}
          </Button>
        </div>
      )}

      {/* Notes content */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 transition-all duration-300">
        {stepCount < notes.length ? (
          <div
            className="prose max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: notes[stepCount]?.notes }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">🎉 End of Notes</h2>
            <p className="text-gray-600">You've completed all the notes in this course!</p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2"
              onClick={() => router.push(`/course/${courseId}`)}
            >
              Go To Course Page
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500 mt-10">No notes available.</div>
  );
}

export default ViewNotes;
