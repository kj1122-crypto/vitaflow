import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: 'You are VellCare AI, a warm and caring AI health companion for VellCareAI app. You help elderly users and their families with health questions. Always speak in simple, warm, encouraging language. Never use medical jargon. If someone feels unwell, always suggest they rest, drink water, and if serious, contact their family or doctor. Give practical, caring advice. You can also provide emotional support and motivation. Keep responses concise and easy to understand for elderly users.',
      messages: messages.map((m: Message) => ({ role: m.role, content: m.content })),
    })
    const reply = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ reply })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
