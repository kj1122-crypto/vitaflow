import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

interface Msg { role: "user" | "assistant"; content: string }

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: `You are VellCare AI, a warm and caring AI health companion for the VellCareAI app.
You help users — both elderly people and their adult children — with health questions and guidance.
Always speak in simple, warm, encouraging language. Never use complex medical jargon.
If someone feels seriously unwell, always suggest they rest, drink water, and if serious, contact their family or a doctor.
Give practical, caring, personalised advice based on the user age, gender and health goal when mentioned.
Keep responses concise — under 100 words — and easy to understand.
You represent SUPER AI HEALTH ECOSYSTEM by VellCareAI (VCAI).`,
      messages: messages.map((m: Msg) => ({ role: m.role, content: m.content }))
    })
    const reply = response.content[0].type === "text" ? response.content[0].text : ""
    return NextResponse.json({ reply })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
