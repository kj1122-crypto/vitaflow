"use client"
import { useState, useEffect, useRef } from "react"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"

interface Message {
  role: "user" | "assistant"
  content: string
}

// Renders AI text as clean separate paragraphs
function AiMessage({ content }: { content: string }) {
  // Split by double newline or single newline into paragraphs
  const paragraphs = content
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "14px 14px 14px 4px",
      padding: "14px 16px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
    }}>
      {paragraphs.map((para, i) => (
        <p key={i} style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "#1F2937",
          margin: 0,
          marginBottom: i < paragraphs.length - 1 ? 10 : 0
        }}>
          {para}
        </p>
      ))}
    </div>
  )
}

function UserMessage({ content }: { content: string }) {
  return (
    <div style={{
      background: G,
      borderRadius: "14px 14px 4px 14px",
      padding: "12px 16px",
    }}>
      <p style={{
        fontSize: 14,
        lineHeight: 1.7,
        color: "#fff",
        margin: 0
      }}>
        {content}
      </p>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "12px 16px",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "14px 14px 14px 4px",
      width: "fit-content"
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: G,
          opacity: 0.4,
          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
        }} />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

interface AiCoachProps {
  name: string
}

export default function AiCoach({ name }: AiCoachProps) {
  const [msgs, setMsgs] = useState<Message[]>([
    {
      role: "assistant",
      content: `Good morning ${name}! I have reviewed your health data. Your WellScore is 82 and your heart rate is steady at 72 BPM. Your sleep last night was great at 7.4 hours. How can I help you today?`
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msgs, loading])

  const chips = [
    "How is my health today?",
    "Best meal for fat loss",
    "Slim my waist fast",
    "I feel tired today",
    "Help me sleep better",
    "Build muscle fast",
    "I feel stressed",
    "Lower my blood pressure"
  ]

  async function send() {
    if (!input.trim() || loading) return
    const txt = input.trim()
    setInput("")
    const next: Message[] = [...msgs, { role: "user", content: txt }]
    setMsgs(next)
    setLoading(true)

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      })
      const data = await res.json()
      setMsgs(m => [...m, {
        role: "assistant",
        content: data.reply || "Please try again."
      }])
    } catch {
      setMsgs(m => [...m, {
        role: "assistant",
        content: "Connection error. Please check your internet and try again."
      }])
    }
    setLoading(false)
  }

  return (
    <div>
      {/* AI HEADER */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 16, padding: 14,
        background: GL, borderRadius: 14, border: `1px solid ${GB}`
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: G, display: "flex", alignItems: "center",
          justifyContent: "center", color: "#fff",
          fontWeight: 700, fontSize: 14, flexShrink: 0
        }}>AI</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: GD }}>VellCare AI Coach</div>
          <div style={{ fontSize: 11, color: G, marginTop: 2 }}>Powered by Claude · Your personal health guardian</div>
        </div>
        <div style={{
          background: G, borderRadius: 20,
          padding: "3px 10px", fontSize: 10,
          color: "#fff", fontWeight: 700
        }}>LIVE</div>
      </div>

      {/* QUICK CHIPS */}
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 14 }}>
        {chips.map(q => (
          <button
            key={q}
            onClick={() => { setInput(q); }}
            style={{
              padding: "6px 12px", borderRadius: 20,
              background: "#F9FAFB", border: "1px solid #E5E7EB",
              fontSize: 12, color: "#374151",
              cursor: "pointer", fontWeight: 500,
              transition: "all 0.2s"
            }}
            onMouseOver={e => {
              (e.target as HTMLElement).style.background = GL;
              (e.target as HTMLElement).style.borderColor = GB;
              (e.target as HTMLElement).style.color = GD;
            }}
            onMouseOut={e => {
              (e.target as HTMLElement).style.background = "#F9FAFB";
              (e.target as HTMLElement).style.borderColor = "#E5E7EB";
              (e.target as HTMLElement).style.color = "#374151";
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* CHAT MESSAGES */}
      <div style={{
        background: "#F9FAFB",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        padding: 16,
        height: 340,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginBottom: 12
      }}>
        {msgs.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "88%",
            alignSelf: m.role === "user" ? "flex-end" : "flex-start"
          }}>
            {m.role === "assistant" && (
              <div style={{
                fontSize: 10, color: G, fontWeight: 700,
                marginBottom: 6, letterSpacing: 0.8,
                textTransform: "uppercase" as const,
                display: "flex", alignItems: "center", gap: 5
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 4,
                  background: G, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 8, fontWeight: 700
                }}>V</div>
                VellCare AI
              </div>
            )}
            {m.role === "assistant"
              ? <AiMessage content={m.content} />
              : <UserMessage content={m.content} />
            }
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <div style={{
              fontSize: 10, color: G, fontWeight: 700,
              marginBottom: 6, letterSpacing: 0.8,
              textTransform: "uppercase" as const,
              display: "flex", alignItems: "center", gap: 5
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 4,
                background: G, display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 8, fontWeight: 700
              }}>V</div>
              VellCare AI
            </div>
            <TypingIndicator />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask your AI health coach anything..."
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "12px 16px",
            color: "#1F2937",
            fontSize: 14,
            outline: "none"
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            width: 46, height: 46,
            borderRadius: 12,
            background: input.trim() ? G : "#E5E7EB",
            border: "none",
            color: "#fff",
            fontSize: 20,
            cursor: input.trim() ? "pointer" : "not-allowed",
            flexShrink: 0,
            transition: "background 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ↑
        </button>
      </div>

      {/* BODY TARGETING */}
      <div style={{
        background: "#fff", border: "1px solid #E5E7EB",
        borderRadius: 14, padding: 16, marginTop: 12
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12 }}>
          Body Targeting Guide
        </div>
        {[
          { area: "Slim waist", sports: "Swimming, Pilates, Yoga", gym: "Cable crunches, Russian twists, Planks" },
          { area: "Tone thighs", sports: "Cycling, Running, Badminton", gym: "Squats, Lunges, Leg press" },
          { area: "Build upper body", sports: "Swimming, Rock climbing", gym: "Bench press, Pull-ups, Rows" },
          { area: "Flat belly", sports: "Swimming, HIIT, Tennis", gym: "Planks, Deadlifts, Leg raises" },
        ].map((b, i) => (
          <div key={b.area} style={{
            padding: "10px 0",
            borderBottom: i < 3 ? "1px solid #F9FAFB" : "none"
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: G, marginBottom: 4 }}>{b.area}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>
              <span style={{ fontWeight: 500, color: "#374151" }}>Sports: </span>{b.sports}
            </div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>
              <span style={{ fontWeight: 500, color: "#374151" }}>Gym: </span>{b.gym}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
