import { GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";

export const GenerateStudyType = inngest.createFunction(
  { id: "generate-study-type-content" },
  { event: "studyType.content" },

  async ({ event, step }) => {
    const { prompt, courseId } = event.data;

    // Step 1: Generate Flashcards
    const flashcardPrompt = `Generate the flashcard on topic: ${prompt}. Format the output in JSON with "front" and "back" keys. Maximum 15 flashcards.`;
    const flashcards = await step.run("Generate flashcards", async () => {
      const result = await GenerateStudyTypeContentAiModel.sendMessage(flashcardPrompt);
      const text = result.response.text();

      const cleaned = text.replace(/^```json/, "").replace(/^```/, "").replace(/```$/, "").trim();
      console.log("Flashcards AI Output:", cleaned);
       return JSON.parse(cleaned);
    });

    const flashcardRecord = await step.run("Store flashcards", async () => {
      return await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId,
        type: "flashcard",
        content: flashcards,
        status: "Ready",
      });
    });

    // Step 2: Generate Quizzes
    const quizPrompt = `Generate the quiz on topic: ${prompt}. Format the output in JSON with "question" and "answer" keys. Maximum 15 questions.`;
    const quizzes = await step.run("Generate quizzes", async () => {
      const result = await GenerateQuizAiModel.sendMessage(quizPrompt);
      const text = result.response.text();

      const cleaned = text.replace(/^```json/, "").replace(/^```/, "").replace(/```$/, "").trim();
      console.log("Quiz AI Output:", cleaned);
      return JSON.parse(cleaned);
    });

    const quizRecord = await step.run("Store quizzes", async () => {
      return await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId,
        type: "quiz",
        content: quizzes,
        status: "Ready",
      });
    });

    return "Flashcards and Quizzes generated and stored.";
  }
);
