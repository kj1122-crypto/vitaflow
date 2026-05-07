import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: 'You are VitaAI, a friendly personal health coach inside the VitaFlow app. Give short, specific, actionable health advice in 2-4 sentences. Use emojis sparingly. Be warm and encouraging.',
      messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
    })
    const reply = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
