import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { chapters, courseId, type } = await req.json();

  let PROMPT = "";

  if (type === "flashcard") {
    PROMPT = `Generate the flashcard on topic: ${chapters}. Format the output in JSON with "front" and "back" keys. Maximum 15 flashcards.`;
  } else if (type === "quiz") {
    PROMPT = `Generate a quiz on the topic: "${chapters}".
              Each quiz question must have the keys: "question" (string), "answer" (string), and "options" (array of 4 strings).
              Return exactly 15 questions.
              Respond ONLY with pure JSON: an array of objects as described.
              Do NOT include any explanations, code fences, or extra text.
              `;
  } else {
    return NextResponse.json({ error: "Invalid study type" }, { status: 400 });
  }

  console.log("Received type:", type);
  console.log("Using prompt:", PROMPT);

  const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
    courseId: courseId,
    type: type,
    content: "Generating...",
  }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  await inngest.send({
    name: "studyType.content",
    data: {
      studyType: type,
      prompt: PROMPT,
      courseId: courseId,
      recordId: result[0].id,
    },
  });

  return NextResponse.json({ id: result[0].id });
}
