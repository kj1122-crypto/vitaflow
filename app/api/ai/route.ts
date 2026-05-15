import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

interface Msg {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  try {
    // Check API key exists
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Anthropic API key not configured", reply: "AI Coach is not configured yet. Please contact support." },
        { status: 500 }
      )
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format", reply: "Please try again." },
        { status: 400 }
      )
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: `You are VellCare AI, a warm and caring AI health companion for VellCareAI — SUPER AI HEALTH ECOSYSTEM by VCAI.
You help users including elderly people and their adult children with health questions and wellness guidance.
Always speak in simple, warm, encouraging language. Never use complex medical jargon.
Keep responses concise — under 100 words — and easy to understand for all ages including elderly users.
If someone feels seriously unwell always suggest they rest, drink water, and if serious, contact their family or a doctor immediately.
Give practical, caring, personalised health advice. You represent VellCareAI and care deeply about every user.`,
      messages: messages.map((m: Msg) => ({
        role: m.role,
        content: m.content
      }))
    })

    const reply = response.content[0].type === "text"
      ? response.content[0].text
      : "I am here to help. Please try again."

    return NextResponse.json({ reply })

  } catch (error: unknown) {
    console.error("AI API error:", error)

    // Give helpful error messages
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { reply: "AI Coach is not configured. Please contact support.", error: error.message },
          { status: 500 }
        )
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { reply: "AI Coach is busy right now. Please try again in a moment.", error: error.message },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { reply: "Something went wrong. Please try again.", error: "Unknown error" },
      { status: 500 }
    )
  }
}
