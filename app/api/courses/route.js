import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema"; 
import { eq } from "drizzle-orm"; 

export async function POST(req) {
  try {
    const { createdBy } = await req.json();

    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy));

    console.log(result);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {

  const reqUrl=req.url;
  const {searchParams}=new URL(reqUrl);
  const courseId=searchParams.get('courseId');
  //const chapterId=searchParams.get('chapterId');

  const course=await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.courseId,courseId));

  return NextResponse.json({result:course[0]});
  
}
