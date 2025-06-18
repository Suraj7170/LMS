import { generateCourseOutline } from "@/configs/AiModel.js";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { courseId, topic, studyType, difficultyLevel, createdBy } = await req.json();

    if (!courseId || !topic || !studyType || !difficultyLevel || !createdBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const outline = await generateCourseOutline({ topic, studyType, difficultyLevel });

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
      courseId: courseId,
      topic:topic,
      courseType: studyType,
      createdBy:createdBy,
      courseLayout: outline,
    }).returning({ resp: STUDY_MATERIAL_TABLE });

    const result=await inngest.send({
      name: "notes.generate",
      data:{
        course:dbResult[0].resp,
      }
    });

    return NextResponse.json({ result: dbResult[0] });
  } catch (error) {
    console.error("Course generation error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
