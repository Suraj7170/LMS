import React, { useState } from 'react';

function SelectOption({ selectedStudyType }) {
  const Options = [
    { name: 'Exam', icon: '/exam_1.png' },
    { name: 'Job Interview', icon: '/job.png' },
    { name: 'Practice', icon: '/practice.png' },
    { name: 'Coding Prep', icon: '/code.png' },
    { name: 'Other', icon: '/knowledge.png' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-center mb-6 text-lg font-semibold">
        For which purpose do you want to create your personal study material?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Options.map((option, index) => {
          const isSelected = option.name === selectedOption;

          return (
            <div
              key={index}
              onClick={() => {
                setSelectedOption(option.name);
                selectedStudyType?.(option.name); // only call if defined
              }}
              className={`flex flex-col items-center justify-center p-5 bg-white border-2 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:border-blue-500
                ${isSelected ? 'border-blue-700 bg-blue-50 scale-105' : 'border-gray-200'}
              `}
            >
              <img src={option.icon} alt={option.name} width={80} height={80} />
              <h2 className={`font-bold text-lg mt-4 ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                {option.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectOption;
