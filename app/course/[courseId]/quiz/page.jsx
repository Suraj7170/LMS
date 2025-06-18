"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import QuizCardItem from "./_component/QuizCardItem";

function Quiz() {
  const { courseId } = useParams();

  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    GetQuiz();
  }, []);

  const GetQuiz = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "quiz",
      });
      console.log(result.data);
      setQuizData(result.data);
      setQuiz(result.data?.content || []);
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="font-bold text-3xl mb-6 text-center text-blue-600">Quiz</h2>
      <div className=" gap-6">
        {quiz && quiz.map((item, index) => (
          <QuizCardItem quiz={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Quiz;
