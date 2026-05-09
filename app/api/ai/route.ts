import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: 'You are VitaCore AI, a friendly personal health coach. Give short, specific, actionable health advice in 2-4 sentences. Be warm and encouraging. Help with meal plans, workout advice, body slimming tips, and sports recommendations.',
      messages: messages.map((m: {role: string, content: string}) => ({ role: m.role, content: m.content })),
    })
    const reply = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('AI error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
