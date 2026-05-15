import { NextRequest, NextResponse } from "next/server"

interface Msg {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        reply: "AI Coach is not configured. Please contact support."
      }, { status: 500 })
    }

    const body = await req.json()
    const messages: Msg[] = body.messages || []

    if (messages.length === 0) {
      return NextResponse.json({ reply: "Please send a message." }, { status: 400 })
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 600,
        system: `You are VellCare AI, a warm and caring personal health coach for VellCareAI — SUPER AI HEALTH ECOSYSTEM by VCAI.

RESPONSE FORMAT RULES — follow these exactly:
- Write in plain conversational sentences only
- NO markdown formatting — no asterisks, no bold, no bullet points with dashes
- NO emojis unless the user uses them first
- Separate each idea into its own short sentence or short paragraph
- Maximum 3 to 4 short paragraphs per response
- Each paragraph should be 1 to 2 sentences only
- Keep total response under 80 words
- Use warm encouraging language suitable for all ages including elderly

EXAMPLE of correct format:
"Your heart rate looks healthy at 72 BPM today. For fat loss I recommend grilled chicken or fish with steamed vegetables. Try to eat smaller portions more often and avoid fried foods. Would you like a full day meal plan?"

NEVER write like this:
"Here are some tips: **Grilled chicken** - steamed vegetables - brown rice 🥗"

Always write naturally like a caring friend, not a list maker.`,
        messages: messages.map((m: Msg) => ({
          role: m.role,
          content: m.content
        }))
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Anthropic API error:", response.status, errorText)
      return NextResponse.json({
        reply: "AI Coach is temporarily unavailable. Please try again in a moment."
      }, { status: 500 })
    }

    const data = await response.json()
    const reply = data?.content?.[0]?.text || "I am here to help. Please try again."

    return NextResponse.json({ reply })

  } catch (error: unknown) {
    console.error("AI route error:", error)
    return NextResponse.json({
      reply: "Connection error. Please check your internet and try again."
    }, { status: 500 })
  }
}
