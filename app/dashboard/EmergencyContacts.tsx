"use client"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"

const G = "#10B981"
const GL = "#D1FAE5"
const GB = "#6EE7B7"
const GD = "#065F46"
const RED = "#EF4444"

interface EmergencyContact {
  id?: string
  name: string
  phone: string
  relationship: string
  priority: number
  whatsapp_enabled: boolean
}

const RELATIONSHIPS = [
  "Spouse", "Child", "Parent", "Sibling",
  "Grandchild", "Friend", "Caregiver", "Other"
]

interface Props {
  userId: string
  userName: string
  onClose?: () => void
}

export default function EmergencyContacts({ userId, userName, onClose }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [form, setForm] = useState<EmergencyContact>({
    name: "", phone: "", relationship: "Child",
    priority: 1, whatsapp_enabled: true
  })

  useEffect(() => { loadContacts() }, [])

  async function loadContacts() {
    const { data } = await supabase
      .from("emergency_contacts")
      .select("*")
      .eq("user_id", userId)
      .order("priority", { ascending: true })
    setContacts(data || [])
    setLoading(false)
  }

  async function saveContact() {
    if (!form.name || !form.phone) {
      setError("Please enter name and phone number")
      return
    }

    // Format phone number
    let phone = form.phone.replace(/\D/g, "")
    if (phone.startsWith("0")) phone = "60" + phone.slice(1)
    if (!phone.startsWith("60")) phone = "60" + phone
    phone = "+" + phone

    setSaving(true); setError("")

    const { error } = await supabase.from("emergency_contacts").insert({
      user_id: userId,
      name: form.name,
      phone,
      relationship: form.relationship,
      priority: contacts.length + 1,
      whatsapp_enabled: form.whatsapp_enabled
    })

    if (error) { setError(error.message); setSaving(false); return }

    setSuccess("Contact saved successfully!")
    setTimeout(() => setSuccess(""), 3000)
    setForm({ name: "", phone: "", relationship: "Child", priority: 1, whatsapp_enabled: true })
    setShowAdd(false)
    setSaving(false)
    loadContacts()
  }

  async function deleteContact(id: string) {
    await supabase.from("emergency_contacts").delete().eq("id", id)
    loadContacts()
  }

  // WhatsApp SOS - sends to all contacts
  function triggerWhatsAppSOS() {
    if (contacts.length === 0) {
      setError("Please add emergency contacts first before using SOS")
      return
    }

    const message = encodeURIComponent(
      `🆘 SOS ALERT from VellCareAI!\n\n` +
      `${userName} has pressed the emergency button and needs help.\n\n` +
      `⏰ Time: ${new Date().toLocaleString("en-MY")}\n` +
      `📱 App: VellCareAI Health Monitor\n\n` +
      `Please check on them immediately or call 999 if needed.\n\n` +
      `— VellCareAI Emergency Alert`
    )

    // Open WhatsApp for each contact
    contacts.forEach((contact, index) => {
      if (contact.whatsapp_enabled) {
        const phone = contact.phone.replace(/\+/g, "")
        // Delay each contact slightly so browser can open multiple
        setTimeout(() => {
          window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
        }, index * 800)
      }
    })

    // Log SOS in database
    supabase.from("sos_log").insert({
      user_id: userId,
      contacts_alerted: contacts.filter(c => c.whatsapp_enabled).length,
      status: "active"
    })
  }

  // WhatsApp SOS for single contact
  function sendWhatsAppToContact(contact: EmergencyContact) {
    const message = encodeURIComponent(
      `🆘 SOS from ${userName} via VellCareAI!\n\n` +
      `${userName} needs immediate help.\n` +
      `Time: ${new Date().toLocaleString("en-MY")}\n\n` +
      `Please call or check on them now.`
    )
    const phone = contact.phone.replace(/\+/g, "")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    background: "#F9FAFB", border: "1px solid #E5E7EB",
    color: "#111827", fontSize: 14, outline: "none"
  }

  return (
    <div>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Emergency Contacts</div>
          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
            SOS alerts will be sent to these contacts via WhatsApp
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "#F3F4F6", border: "none", fontSize: 18, cursor: "pointer", color: "#6B7280" }}>×</button>
        )}
      </div>

      {error && <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: RED, marginBottom: 12 }}>{error}</div>}
      {success && <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: GD, marginBottom: 12 }}>✓ {success}</div>}

      {/* SOS TEST BUTTON */}
      {contacts.length > 0 && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: RED, marginBottom: 6 }}>
            🆘 SOS WhatsApp Alert
          </div>
          <div style={{ fontSize: 12, color: "#991B1B", marginBottom: 12, lineHeight: 1.6 }}>
            Pressing SOS will open WhatsApp and send emergency messages to all {contacts.filter(c => c.whatsapp_enabled).length} contact{contacts.length > 1 ? "s" : ""} below.
          </div>
          <button
            onClick={triggerWhatsAppSOS}
            style={{ width: "100%", padding: 12, borderRadius: 10, background: RED, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            🆘 Send SOS WhatsApp to All Contacts
          </button>
        </div>
      )}

      {/* CONTACT LIST */}
      {loading ? (
        <div style={{ textAlign: "center", color: "#9CA3AF", padding: 20 }}>Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div style={{ background: "#F9FAFB", border: "1.5px dashed #E5E7EB", borderRadius: 12, padding: 28, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📱</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginBottom: 6 }}>No emergency contacts yet</div>
          <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
            Add family members or friends who should be alerted when you press SOS.
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          {contacts.map((c, i) => (
            <div key={c.id} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 14, marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: GL, border: `2px solid ${G}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: GD, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{c.relationship} · {c.phone}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {c.whatsapp_enabled && (
                    <button
                      onClick={() => sendWhatsAppToContact(c)}
                      style={{ padding: "5px 10px", borderRadius: 8, background: "#E8F5E9", border: "1px solid #A5D6A7", color: "#1B5E20", fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                    >
                      WhatsApp
                    </button>
                  )}
                  <button
                    onClick={() => c.id && deleteContact(c.id)}
                    style={{ padding: "5px 10px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FCA5A5", color: RED, fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {c.whatsapp_enabled && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #F9FAFB", fontSize: 11, color: G, display: "flex", alignItems: "center", gap: 5 }}>
                  ✓ WhatsApp SOS enabled
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ADD CONTACT FORM */}
      {!showAdd ? (
        <button
          onClick={() => setShowAdd(true)}
          style={{ width: "100%", padding: 13, borderRadius: 12, background: contacts.length === 0 ? G : "#F9FAFB", border: contacts.length === 0 ? "none" : "1.5px dashed #E5E7EB", color: contacts.length === 0 ? "#fff" : "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          + Add Emergency Contact
        </button>
      ) : (
        <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 14, padding: 16, marginTop: 4 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 14 }}>Add New Contact</div>

          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Full name</label>
          <input style={{ ...inp, marginBottom: 12 }} type="text" placeholder="e.g. Wong Mei Ling" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Malaysian phone number</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div style={{ padding: "11px 12px", borderRadius: 10, background: "#fff", border: "1px solid #E5E7EB", color: "#374151", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>+60</div>
            <input style={{ ...inp, flex: 1 }} type="tel" placeholder="12-3456789" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </div>

          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Relationship</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
            {RELATIONSHIPS.map(r => (
              <button key={r} onClick={() => setForm(f => ({ ...f, relationship: r }))} style={{ padding: "8px 0", borderRadius: 9, border: form.relationship === r ? `2px solid ${G}` : "1px solid #E5E7EB", background: form.relationship === r ? GL : "#fff", color: form.relationship === r ? GD : "#6B7280", fontSize: 12, fontWeight: form.relationship === r ? 700 : 500, cursor: "pointer" }}>
                {r}
              </button>
            ))}
          </div>

          {/* WHATSAPP TOGGLE */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 10, padding: "12px 14px", border: "1px solid #E5E7EB", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Send WhatsApp on SOS</div>
              <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Auto-send WhatsApp message when SOS is pressed</div>
            </div>
            <div
              onClick={() => setForm(f => ({ ...f, whatsapp_enabled: !f.whatsapp_enabled }))}
              style={{ width: 44, height: 24, borderRadius: 12, background: form.whatsapp_enabled ? G : "#E5E7EB", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}
            >
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: form.whatsapp_enabled ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setShowAdd(false); setError("") }} style={{ flex: 1, padding: 11, borderRadius: 10, background: "#fff", border: "1px solid #E5E7EB", color: "#6B7280", fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
            <button onClick={saveContact} disabled={saving} style={{ flex: 2, padding: 11, borderRadius: 10, background: G, border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving..." : "Save Contact ✓"}
            </button>
          </div>
        </div>
      )}

      {/* HOW IT WORKS */}
      <div style={{ background: GL, border: `1px solid ${GB}`, borderRadius: 12, padding: 14, marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: GD, marginBottom: 8 }}>How SOS WhatsApp Works</div>
        <div style={{ fontSize: 12, color: GD, lineHeight: 1.7 }}>
          1. User presses the red SOS button<br />
          2. WhatsApp opens automatically on their phone<br />
          3. Pre-filled emergency message is ready to send<br />
          4. Message is sent to each contact one by one<br />
          5. Contacts receive alert with name, time, and instructions
        </div>
      </div>
    </div>
  )
}
