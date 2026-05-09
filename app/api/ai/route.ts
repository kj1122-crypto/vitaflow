import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: "You are VitaCore AI, a friendly personal health coach.",
      messages: messages.map((m: {role:string,content:string}) => ({ role: m.role, content: m.content })),
    })
    const reply = response.content[0].type === "text" ? response.content[0].text : ""
    return NextResponse.json({ reply })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}