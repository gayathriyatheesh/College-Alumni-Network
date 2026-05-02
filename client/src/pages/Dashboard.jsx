const recentAlumni = [
  { name: "Priya Reddy", batch: "2019", role: "SDE-2 @ Google", dept: "CSE" },
  { name: "Rahul Verma", batch: "2018", role: "PM @ Flipkart", dept: "MBA" },
  { name: "Sneha Patel", batch: "2020", role: "Data Scientist @ NVIDIA", dept: "CSE" },
];

const upcomingEvents = [
  { title: "Annual Alumni Meet 2025", date: "Dec 15", location: "College Campus", attendees: 342 },
  { title: "Tech Career Webinar", date: "Nov 28", location: "Online", attendees: 189 },
  { title: "Startup Networking Night", date: "Dec 5", location: "Hyderabad", attendees: 78 },
];

const recentJobs = [
  { role: "Frontend Developer", company: "TCS", location: "Hyderabad", posted: "2d ago", type: "Full-time" },
  { role: "Product Manager", company: "Zomato", location: "Bangalore", posted: "1d ago", type: "Full-time" },
  { role: "ML Engineer", company: "Startup", location: "Remote", posted: "3d ago", type: "Contract" },
];

function StatCard({ icon, value, label, color }) {
  return (
    <div style={{
      background: "white", borderRadius: "16px", padding: "24px",
      border: "1px solid #e5e0d8", flex: 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: "0.82rem", color: "#6b7280", fontWeight: 500, marginBottom: 8 }}>{label}</div>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", fontWeight: 700, color: "#1a1a2e" }}>{value}</div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: "12px",
          background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem"
        }}>{icon}</div>
      </div>
    </div>
  );
}

export default function Dashboard({ navigate, user }) {
  const initials = user?.name?.split(" ").map(n => n[0]).join("") || "A";

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: "#f8f5f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px" }}>

        {/* Welcome Banner */}
        <div style={{
          background: "linear-gradient(135deg, #0f0f23 60%, #1a1a3e)",
          borderRadius: "24px", padding: "36px 40px", marginBottom: 32,
          position: "relative", overflow: "hidden"
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40, width: 200, height: 200,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.15), transparent 70%)"
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ color: "#c8a96e", fontSize: "0.85rem", fontWeight: 600, marginBottom: 8, letterSpacing: "0.05em" }}>
                WELCOME BACK
              </p>
              <h1 style={{ fontFamily: "Playfair Display, serif", color: "white", fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>
                {user?.name || "Alumni"}! 👋
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
                Batch {user?.batch} • {user?.dept} • Stay connected with your network
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg, #c8a96e, #e8d5b0)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.6rem", fontWeight: 700, color: "#0f0f23",
                marginLeft: "auto", marginBottom: 12
              }}>{initials}</div>
              <button onClick={() => navigate("profile")}
                style={{
                  background: "rgba(200,169,110,0.15)", border: "1px solid rgba(200,169,110,0.4)",
                  color: "#c8a96e", padding: "8px 18px", borderRadius: "8px",
                  cursor: "pointer", fontSize: "0.83rem", fontWeight: 600
                }}>Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
          <StatCard icon="👥" value="12,456" label="Total Alumni" color="#c8a96e" />
          <StatCard icon="💼" value="234" label="Active Jobs" color="#10b981" />
          <StatCard icon="📅" value="8" label="Upcoming Events" color="#6366f1" />
          <StatCard icon="🤝" value="56" label="Connections" color="#ef4444" />
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>

          {/* Recent Alumni */}
          <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e5e0d8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>Recent Alumni</h3>
              <button onClick={() => navigate("directory")}
                style={{ background: "none", border: "none", color: "#c8a96e", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
                View All →
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {recentAlumni.map(a => (
                <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a1a2e, #c8a96e)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0
                  }}>{a.name.split(" ").map(n => n[0]).join("")}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1a1a2e" }}>{a.name}</div>
                    <div style={{ color: "#6b7280", fontSize: "0.78rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.role}</div>
                  </div>
                  <div style={{
                    background: "#f8f5f0", borderRadius: "6px", padding: "3px 8px",
                    fontSize: "0.72rem", color: "#6b7280", fontWeight: 600
                  }}>{a.batch}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e5e0d8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>Upcoming Events</h3>
              <button onClick={() => navigate("events")}
                style={{ background: "none", border: "none", color: "#c8a96e", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
                View All →
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {upcomingEvents.map(ev => (
                <div key={ev.title} style={{
                  background: "#f8f5f0", borderRadius: "12px", padding: "14px",
                  border: "1px solid #e5e0d8"
                }}>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1a1a2e", marginBottom: 6 }}>{ev.title}</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "#6b7280", fontSize: "0.76rem" }}>📅 {ev.date}</span>
                    <span style={{ color: "#6b7280", fontSize: "0.76rem" }}>📍 {ev.location}</span>
                  </div>
                  <div style={{ color: "#c8a96e", fontSize: "0.76rem", marginTop: 6, fontWeight: 600 }}>
                    {ev.attendees} attending
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e5e0d8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>Latest Jobs</h3>
              <button onClick={() => navigate("jobs")}
                style={{ background: "none", border: "none", color: "#c8a96e", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
                View All →
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {recentJobs.map(job => (
                <div key={job.role} style={{ padding: "14px", background: "#f8f5f0", borderRadius: "12px", border: "1px solid #e5e0d8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1a1a2e" }}>{job.role}</div>
                    <span style={{
                      background: "#0f0f2315", color: "#1a1a2e",
                      padding: "2px 8px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 600
                    }}>{job.type}</span>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.78rem" }}>{job.company} • {job.location}</div>
                  <div style={{ color: "#c8a96e", fontSize: "0.72rem", marginTop: 4 }}>{job.posted}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: 28, background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e5e0d8" }}>
          <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", marginBottom: 20 }}>Quick Actions</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "🔍 Find Alumni", page: "directory" },
              { label: "💼 Browse Jobs", page: "jobs" },
              { label: "📅 View Events", page: "events" },
              { label: "👤 Update Profile", page: "profile" },
            ].map(action => (
              <button key={action.label} onClick={() => navigate(action.page)}
                style={{
                  background: "#f8f5f0", border: "1px solid #e5e0d8",
                  color: "#1a1a2e", padding: "10px 20px", borderRadius: "10px",
                  cursor: "pointer", fontWeight: 600, fontSize: "0.88rem",
                  transition: "all 0.2s"
                }}
                onMouseOver={e => { e.currentTarget.style.background = "#1a1a2e"; e.currentTarget.style.color = "white"; }}
                onMouseOut={e => { e.currentTarget.style.background = "#f8f5f0"; e.currentTarget.style.color = "#1a1a2e"; }}>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
