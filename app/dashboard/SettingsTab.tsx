"use client"
import { useState } from "react"
import PushNotificationManager from "./PushNotificationManager"
import EmergencyContacts from "./EmergencyContacts"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"

interface Props {
  userId: string
  userName: string
}

type SettingSection = "notifications" | "emergency" | "profile" | null

export default function SettingsTab({ userId, userName }: Props) {
  const [section, setSection] = useState<SettingSection>(null)

  const menuItems = [
    {
      id: "notifications" as SettingSection,
      icon: "🔔",
      title: "Push Notifications",
      desc: "Daily reminders, health tips, family alerts",
      badge: "Set up"
    },
    {
      id: "emergency" as SettingSection,
      icon: "🆘",
      title: "Emergency Contacts",
      desc: "WhatsApp SOS contacts for emergencies",
      badge: "Important"
    },
    {
      id: "profile" as SettingSection,
      icon: "👤",
      title: "My Profile",
      desc: "Name, age, gender, health goal",
      badge: null
    },
  ]

  // Show section detail
  if (section === "notifications") {
    return (
      <div>
        <button
          onClick={() => setSection(null)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#6B7280", fontSize: 14, cursor: "pointer", marginBottom: 20, padding: 0 }}
        >
          ← Back to Settings
        </button>
        <PushNotificationManager userId={userId} />
      </div>
    )
  }

  if (section === "emergency") {
    return (
      <div>
        <button
          onClick={() => setSection(null)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#6B7280", fontSize: 14, cursor: "pointer", marginBottom: 20, padding: 0 }}
        >
          ← Back to Settings
        </button>
        <EmergencyContacts userId={userId} userName={userName} />
      </div>
    )
  }

  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Settings</div>
      <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 20 }}>Manage your notifications, contacts and profile</div>

      {/* QUICK SETUP BANNER */}
      <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: GD, marginBottom: 6 }}>
          ✅ Recommended Setup
        </div>
        <div style={{ fontSize: 12, color: GD, lineHeight: 1.7, marginBottom: 12 }}>
          Complete these 2 steps to get the most out of VellCareAI:
        </div>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
          <div
            onClick={() => setSection("emergency")}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 10, padding: "10px 12px", cursor: "pointer", border: `1px solid ${GB}` }}
          >
            <span style={{ fontSize: 20 }}>🆘</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Add Emergency Contacts</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>So SOS WhatsApp alerts work when you need help</div>
            </div>
            <span style={{ fontSize: 16, color: "#9CA3AF" }}>›</span>
          </div>
          <div
            onClick={() => setSection("notifications")}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", borderRadius: 10, padding: "10px 12px", cursor: "pointer", border: `1px solid ${GB}` }}
          >
            <span style={{ fontSize: 20 }}>🔔</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Enable Notifications</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>Get daily check-in and health tip reminders</div>
            </div>
            <span style={{ fontSize: 16, color: "#9CA3AF" }}>›</span>
          </div>
        </div>
      </div>

      {/* SETTINGS MENU */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
        {menuItems.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setSection(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 16px",
              borderBottom: i < menuItems.length - 1 ? "1px solid #F9FAFB" : "none",
              cursor: "pointer",
              transition: "background 0.15s"
            }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 11, background: "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{item.desc}</div>
            </div>
            {item.badge && (
              <div style={{ padding: "3px 8px", borderRadius: 20, background: item.badge === "Important" ? "#FEF2F2" : GL, color: item.badge === "Important" ? "#EF4444" : GD, fontSize: 10, fontWeight: 700, border: item.badge === "Important" ? "1px solid #FCA5A5" : `1px solid ${GB}`, flexShrink: 0 }}>
                {item.badge}
              </div>
            )}
            <span style={{ fontSize: 18, color: "#D1D5DB", flexShrink: 0 }}>›</span>
          </div>
        ))}
      </div>

      {/* APP INFO */}
      <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>App Information</div>
        {[
          { label: "Version", value: "1.0.0" },
          { label: "Platform", value: "VellCareAI Web" },
          { label: "AI Engine", value: "Claude by Anthropic" },
          { label: "Support", value: "support@vellcareai.com" },
          { label: "Website", value: "vellcareai.com" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #F3F4F6" }}>
            <span style={{ fontSize: 13, color: "#6B7280" }}>{item.label}</span>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* LEGAL LINKS */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
        {[
          { label: "Privacy Policy", url: "https://vellcareai.com/privacy" },
          { label: "Terms and Conditions", url: "https://vellcareai.com/terms" },
          { label: "PDPA Statement", url: "https://vellcareai.com/pdpa" },
        ].map((item, i) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderBottom: i < 2 ? "1px solid #F9FAFB" : "none", textDecoration: "none" }}
          >
            <span style={{ fontSize: 14, color: "#374151" }}>{item.label}</span>
            <span style={{ fontSize: 16, color: "#D1D5DB" }}>›</span>
          </a>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1.5, textTransform: "uppercase" as const }}>
          SUPER AI HEALTH ECOSYSTEM · VCAI
        </div>
        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>
          2026 VellCareAI Health Sdn Bhd
        </div>
      </div>
    </div>
  )
}
