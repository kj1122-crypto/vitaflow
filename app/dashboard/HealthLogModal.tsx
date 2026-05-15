"use client"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"

interface Props {
  userId: string
  onSaved: (data: HealthEntry) => void
  onClose: () => void
}

export interface HealthEntry {
  steps: number
  heart_rate: number
  sleep_hours: number
  weight: number
  spo2: number
  calories: number
  water_glasses: number
  stress_level: string
  well_score: number
}

export default function HealthLogModal({ userId, onSaved, onClose }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [steps, setSteps] = useState("")
  const [heartRate, setHeartRate] = useState("")
  const [sleep, setSleep] = useState("")
  const [weight, setWeight] = useState("")
  const [spo2, setSpo2] = useState("")
  const [calories, setCalories] = useState("")
  const [water, setWater] = useState("0")
  const [stress, setStress] = useState("Low")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const inp: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    background: "#F9FAFB", border: "1px solid #E5E7EB",
    color: "#111827", fontSize: 14, outline: "none"
  }

  async function handleSave() {
    setLoading(true); setError("")

    const entry = {
      user_id: userId,
      date: new Date().toISOString().split("T")[0],
      steps: parseInt(steps) || 0,
      heart_rate: parseInt(heartRate) || null,
      sleep_hours: parseFloat(sleep) || null,
      weight: parseFloat(weight) || null,
      spo2: parseInt(spo2) || null,
      calories: parseInt(calories) || null,
      water_glasses: parseInt(water) || 0,
      stress_level: stress,
      source: "manual"
    }

    const { error } = await supabase
      .from("health_data")
      .upsert(entry, { onConflict: "user_id,date,source" })

    if (error) {
      setError("Could not save. Please try again.")
      setLoading(false); return
    }

    // Calculate well score locally for immediate display
    const well_score = calculateWellScore(
      parseFloat(sleep) || 0,
      parseInt(steps) || 0,
      parseInt(heartRate) || 72,
      parseInt(spo2) || 98,
      parseInt(water) || 0
    )

    onSaved({
      steps: parseInt(steps) || 0,
      heart_rate: parseInt(heartRate) || 0,
      sleep_hours: parseFloat(sleep) || 0,
      weight: parseFloat(weight) || 0,
      spo2: parseInt(spo2) || 0,
      calories: parseInt(calories) || 0,
      water_glasses: parseInt(water) || 0,
      stress_level: stress,
      well_score
    })

    setLoading(false)
    onClose()
  }

  function calculateWellScore(sleep: number, steps: number, hr: number, spo2: number, water: number) {
    let score = 0
    // Sleep (25pts)
    if (sleep >= 7 && sleep <= 9) score += 25
    else if (sleep >= 6) score += 18
    else if (sleep >= 5) score += 12
    else if (sleep > 0) score += 5
    // Steps (25pts)
    if (steps >= 10000) score += 25
    else if (steps >= 8000) score += 22
    else if (steps >= 5000) score += 16
    else if (steps >= 3000) score += 10
    else if (steps >= 1000) score += 5
    // Heart rate (20pts)
    if (hr >= 60 && hr <= 80) score += 20
    else if (hr > 0 && hr <= 100) score += 14
    else score += 15
    // SpO2 (20pts)
    if (spo2 >= 97) score += 20
    else if (spo2 >= 95) score += 16
    else if (spo2 >= 92) score += 10
    else score += 16
    // Water (10pts)
    if (water >= 8) score += 10
    else if (water >= 6) score += 7
    else if (water >= 4) score += 4
    else if (water >= 2) score += 2
    return Math.min(100, score)
  }

  const stressLevels = ["Low", "Moderate", "High"]

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: 24, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Log Today Health</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Enter your health data for today</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "#F3F4F6", border: "none", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280" }}>×</button>
        </div>

        {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#EF4444", marginBottom: 14 }}>{error}</div>}

        {/* FORM */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Steps today</label>
            <input style={inp} type="number" placeholder="e.g. 5000" value={steps} onChange={e => setSteps(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Heart rate (BPM)</label>
            <input style={inp} type="number" placeholder="e.g. 72" value={heartRate} onChange={e => setHeartRate(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Sleep hours</label>
            <input style={inp} type="number" step="0.5" placeholder="e.g. 7.5" value={sleep} onChange={e => setSleep(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Weight (kg)</label>
            <input style={inp} type="number" step="0.1" placeholder="e.g. 68.5" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>SpO2 (%)</label>
            <input style={inp} type="number" placeholder="e.g. 98" value={spo2} onChange={e => setSpo2(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Calories (kcal)</label>
            <input style={inp} type="number" placeholder="e.g. 1800" value={calories} onChange={e => setCalories(e.target.value)} />
          </div>
        </div>

        {/* WATER */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Water glasses today</label>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <button key={n} onClick={() => setWater(String(n))} style={{ flex: 1, height: 36, borderRadius: 8, border: parseInt(water) >= n && n > 0 ? `1.5px solid ${G}` : "1px solid #E5E7EB", background: parseInt(water) >= n && n > 0 ? GL : "#F9FAFB", color: parseInt(water) >= n && n > 0 ? GD : "#9CA3AF", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                {n === 0 ? "0" : "💧"}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{water} of 8 glasses</div>
        </div>

        {/* STRESS */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Stress level today</label>
          <div style={{ display: "flex", gap: 8 }}>
            {stressLevels.map(s => (
              <button key={s} onClick={() => setStress(s)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: stress === s ? `2px solid ${s === "Low" ? G : s === "Moderate" ? "#F59E0B" : "#EF4444"}` : "1px solid #E5E7EB", background: stress === s ? (s === "Low" ? GL : s === "Moderate" ? "#FFFBEB" : "#FEF2F2") : "#F9FAFB", color: stress === s ? (s === "Low" ? GD : s === "Moderate" ? "#92400E" : "#991B1B") : "#6B7280", fontSize: 13, fontWeight: stress === s ? 700 : 500, cursor: "pointer" }}>{s}</button>
            ))}
          </div>
        </div>

        {/* SAVE */}
        <button onClick={handleSave} disabled={loading} style={{ width: "100%", padding: 14, borderRadius: 12, background: G, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1, marginBottom: 8 }}>
          {loading ? "Saving..." : "Save Today Health Data ✓"}
        </button>
        <button onClick={onClose} style={{ width: "100%", padding: 11, borderRadius: 12, background: "none", border: "1px solid #E5E7EB", color: "#6B7280", fontSize: 13, cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  )
}
