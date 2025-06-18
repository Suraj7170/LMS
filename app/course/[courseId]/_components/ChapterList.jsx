import React from 'react';

function ChapterList({ course }) {
  const chapters = course?.courseLayout?.studyMaterial?.chapters ?? [];

  return (
    <div className="mt-5">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">📚 Chapters</h2>

      <div>
        {chapters.length === 0 ? (
          <p className="text-gray-500">No chapters found.</p>
        ) : (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-6 p-6 border border-gray-200 shadow-lg rounded-2xl bg-white mb-4"
            >
              <div className="flex-shrink-0">
                <img
                  src="/knowledge.png"
                  alt="Chapter Icon"
                  width={90}
                  height={90}
                  className="rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between w-full">
                <h2 className="text-xl font-bold text-gray-800">{chapter.title}</h2>
                <p className="text-gray-600 mt-2 text-sm">{chapter.summary}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChapterList;
