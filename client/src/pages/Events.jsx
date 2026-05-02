import { useState } from "react";

const eventsData = [
  { id: 1, title: "Annual Alumni Meet 2025", date: "Dec 15, 2025", time: "10:00 AM - 6:00 PM", location: "College Auditorium, Hyderabad", type: "Reunion", attendees: 342, capacity: 500, organizer: "Alumni Association", description: "Our biggest annual gathering! Meet classmates, enjoy performances, and attend the Hall of Fame ceremony for distinguished alumni.", image: "🎭" },
  { id: 2, title: "Tech Career Webinar: Cracking Big Tech", date: "Nov 28, 2025", time: "7:00 PM - 9:00 PM", location: "Online (Zoom)", type: "Webinar", attendees: 189, capacity: 300, organizer: "CSE Alumni Chapter", description: "Learn from alumni working at Google, Microsoft, and Amazon about how to crack technical interviews and build your career in Big Tech.", image: "💻" },
  { id: 3, title: "Startup Networking Night", date: "Dec 5, 2025", time: "6:30 PM - 10:00 PM", location: "T-Hub, Hyderabad", type: "Networking", attendees: 78, capacity: 150, organizer: "Entrepreneurship Cell Alumni", description: "Connect with alumni founders and investors. Pitch your startup idea and get mentorship from successful entrepreneurs.", image: "🚀" },
  { id: 4, title: "Sports Day Reunion - Batch 2015-2020", date: "Jan 10, 2026", time: "8:00 AM - 5:00 PM", location: "College Sports Ground", type: "Reunion", attendees: 95, capacity: 200, organizer: "Sports Alumni Club", description: "A day of cricket, football, volleyball, and nostalgia. Compete against your batchmates just like the old days!", image: "⚽" },
  { id: 5, title: "MBA Alumni Finance Summit", date: "Jan 20, 2026", time: "9:00 AM - 5:00 PM", location: "Taj Hotel, Hyderabad", type: "Summit", attendees: 120, capacity: 250, organizer: "MBA Alumni Network", description: "Exclusive summit on fintech trends, investment strategies, and career growth for finance professionals.", image: "📊" },
  { id: 6, title: "Campus Heritage Walk", date: "Dec 22, 2025", time: "9:00 AM - 1:00 PM", location: "College Campus", type: "Reunion", attendees: 45, capacity: 100, organizer: "Alumni Association", description: "Walk through the campus with a guided tour, visiting iconic spots and reliving memories from your student days.", image: "🏛" },
];

const typeColors = {
  Reunion: "#6366f1",
  Webinar: "#10b981",
  Networking: "#f59e0b",
  Summit: "#ef4444",
};

export default function Events({ navigate }) {
  const [filter, setFilter] = useState("All");
  const [registered, setRegistered] = useState({});
  const [modalEvent, setModalEvent] = useState(null);

  const types = ["All", "Reunion", "Webinar", "Networking", "Summit"];

  const filtered = filter === "All" ? eventsData : eventsData.filter(e => e.type === filter);

  const toggleRegister = (id) => {
    setRegistered(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: "#f8f5f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", color: "#1a1a2e", marginBottom: 8 }}>
              Events & Reunions
            </h1>
            <p style={{ color: "#6b7280" }}>Stay connected through shared experiences</p>
          </div>
          <button style={{
            background: "#1a1a2e", border: "none", color: "white",
            padding: "12px 24px", borderRadius: "10px", cursor: "pointer",
            fontWeight: 600, fontSize: "0.9rem"
          }}>+ Create Event</button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              style={{
                padding: "9px 20px", borderRadius: "20px",
                border: filter === t ? "none" : "1px solid #e5e0d8",
                background: filter === t ? "#1a1a2e" : "white",
                color: filter === t ? "white" : "#6b7280",
                cursor: "pointer", fontWeight: 600, fontSize: "0.85rem"
              }}>{t}</button>
          ))}
        </div>

        {/* Events Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {filtered.map(event => {
            const pct = Math.round((event.attendees / event.capacity) * 100);
            const isReg = registered[event.id];
            const color = typeColors[event.type] || "#6b7280";

            return (
              <div key={event.id} style={{
                background: "white", borderRadius: "20px", overflow: "hidden",
                border: "1px solid #e5e0d8", transition: "all 0.2s"
              }}
                onMouseOver={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)"}
                onMouseOut={e => e.currentTarget.style.boxShadow = "none"}>

                {/* Banner */}
                <div style={{
                  background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                  padding: "32px 24px", textAlign: "center",
                  borderBottom: "1px solid #e5e0d8", position: "relative"
                }}>
                  <div style={{ fontSize: "3rem", marginBottom: 10 }}>{event.image}</div>
                  <span style={{
                    background: color + "20", color,
                    padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700
                  }}>{event.type}</span>
                  {isReg && (
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: "#10b981", color: "white",
                      padding: "4px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 700
                    }}>✓ Registered</div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "20px 22px" }}>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", color: "#1a1a2e", marginBottom: 12 }}>
                    {event.title}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem" }}>📅</span>
                      <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>{event.date} • {event.time}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem" }}>📍</span>
                      <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>{event.location}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem" }}>👤</span>
                      <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>{event.organizer}</span>
                    </div>
                  </div>

                  <p style={{ color: "#9ca3af", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: 16 }}>
                    {event.description.substring(0, 90)}...
                  </p>

                  {/* Attendance Bar */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#6b7280", marginBottom: 6 }}>
                      <span>{event.attendees} attending</span>
                      <span>{event.capacity} capacity ({pct}%)</span>
                    </div>
                    <div style={{ background: "#f0f0f0", borderRadius: "4px", height: 6 }}>
                      <div style={{
                        width: `${pct}%`, height: "100%", borderRadius: "4px",
                        background: pct > 80 ? "#ef4444" : "#10b981"
                      }} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => toggleRegister(event.id)}
                      style={{
                        flex: 1, padding: "10px", borderRadius: "8px",
                        border: isReg ? "1px solid #10b981" : "none",
                        background: isReg ? "white" : "#1a1a2e",
                        color: isReg ? "#10b981" : "white",
                        fontWeight: 700, cursor: "pointer", fontSize: "0.85rem"
                      }}>
                      {isReg ? "✓ Registered" : "Register"}
                    </button>
                    <button onClick={() => setModalEvent(event)}
                      style={{
                        padding: "10px 16px", borderRadius: "8px",
                        border: "1px solid #e5e0d8", background: "white",
                        color: "#1a1a2e", cursor: "pointer", fontSize: "0.85rem"
                      }}>Details</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modalEvent && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
          padding: "20px"
        }} onClick={() => setModalEvent(null)}>
          <div style={{
            background: "white", borderRadius: "20px", padding: "36px",
            maxWidth: 520, width: "100%", position: "relative"
          }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalEvent(null)}
              style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#9ca3af" }}>✕</button>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: "3rem", marginBottom: 10 }}>{modalEvent.image}</div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", color: "#1a1a2e" }}>{modalEvent.title}</h2>
            </div>
            <p style={{ color: "#6b7280", lineHeight: 1.8, marginBottom: 20, fontSize: "0.9rem" }}>{modalEvent.description}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <strong style={{ fontSize: "0.85rem", minWidth: 80 }}>Date:</strong>
                <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{modalEvent.date}</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <strong style={{ fontSize: "0.85rem", minWidth: 80 }}>Time:</strong>
                <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{modalEvent.time}</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <strong style={{ fontSize: "0.85rem", minWidth: 80 }}>Venue:</strong>
                <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{modalEvent.location}</span>
              </div>
            </div>
            <button onClick={() => { toggleRegister(modalEvent.id); setModalEvent(null); }}
              style={{
                width: "100%", padding: "14px", borderRadius: "10px",
                background: "#1a1a2e", border: "none", color: "white",
                fontWeight: 700, cursor: "pointer", fontSize: "0.95rem"
              }}>
              {registered[modalEvent.id] ? "Cancel Registration" : "Register for Event"}
            </button>
          </div>
        </div>
      )}
    </div>
  );


}
