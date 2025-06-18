import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // ✅ Extract 'user' object from the body
    const { user } = await req.json();

if (!user || !user.email || !user.id || !user.name) {
  return NextResponse.json(
    { error: 'Missing required user fields' },
    { status: 400 }
  );
}


    // ✅ Send event to Inngest
    const result = await inngest.send({
      name: 'user.create',
      data: {
        user: user, // correctly defined now
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in /api/create-user:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
