import { NextRequest, NextResponse } from "next/server";
import { analyzeMessage } from "@/lib/analyzeScam";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = typeof body?.message === "string" ? body.message : "";

    if (!message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const result = analyzeMessage(message);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to analyze message." },
      { status: 500 }
    );
  }
}
