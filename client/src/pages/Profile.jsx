import { useState } from "react";

const defaultUser = {
  name: "Arjun Sharma",
  batch: "2019",
  dept: "Computer Science",
  role: "Full Stack Developer",
  company: "Infosys",
  location: "Hyderabad",
  email: "arjun.sharma@gmail.com",
  phone: "+91 98765 43210",
  linkedin: "linkedin.com/in/arjunsharma",
  bio: "Passionate full-stack developer with 4+ years of experience. Love open source, hiking, and mentoring juniors.",
  skills: ["React", "Node.js", "MongoDB", "Python", "AWS", "Docker"],
  experience: [
    { role: "Full Stack Developer", company: "Infosys", period: "2021 - Present", desc: "Building enterprise web applications for banking clients." },
    { role: "Junior Developer", company: "TCS", period: "2019 - 2021", desc: "Worked on microservices and REST APIs for e-commerce platform." },
  ],
  education: [
    { degree: "B.Tech - Computer Science", college: "JNTU College of Engineering", year: "2015-2019", grade: "8.4 CGPA" },
  ],
};

export default function Profile({ navigate, user }) {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [profile, setProfile] = useState({ ...defaultUser, ...user });
  const [editForm, setEditForm] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState("");

  const initials = profile.name.split(" ").map(n => n[0]).join("").toUpperCase();

  const saveProfile = () => {
    setProfile({ ...editForm });
    setEditing(false);
  };

  const removeSkill = (skill) => {
    setEditForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setEditForm(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  };

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: "#f8f5f0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "36px 32px" }}>

        {/* Profile Card */}
        <div style={{ background: "white", borderRadius: "20px", border: "1px solid #e5e0d8", overflow: "hidden", marginBottom: 24 }}>
          {/* Cover */}
          <div style={{
            height: 120, background: "linear-gradient(135deg, #0f0f23, #1a1a3e, #2d1a4e)",
            position: "relative"
          }} />

          {/* Avatar + Info */}
          <div style={{ padding: "0 32px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: "linear-gradient(135deg, #c8a96e, #e8d5b0)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", fontWeight: 700, color: "#0f0f23",
                marginTop: -45, border: "4px solid white"
              }}>{initials}</div>
              <div style={{ paddingTop: 16 }}>
                {!editing ? (
                  <button onClick={() => setEditing(true)}
                    style={{
                      background: "#1a1a2e", border: "none", color: "white",
                      padding: "10px 22px", borderRadius: "8px", cursor: "pointer",
                      fontWeight: 600, fontSize: "0.87rem"
                    }}>✏️ Edit Profile</button>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setEditing(false)}
                      style={{ background: "white", border: "1px solid #e5e0d8", color: "#6b7280", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.87rem" }}>
                      Cancel
                    </button>
                    <button onClick={saveProfile}
                      style={{ background: "#10b981", border: "none", color: "white", padding: "10px 22px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "0.87rem" }}>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!editing ? (
              <div style={{ marginTop: 16 }}>
                <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", color: "#1a1a2e", marginBottom: 6 }}>{profile.name}</h1>
                <div style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: 4 }}>{profile.role} @ {profile.company}</div>
                <div style={{ color: "#9ca3af", fontSize: "0.82rem", marginBottom: 12 }}>📍 {profile.location} • Batch {profile.batch} • {profile.dept}</div>
                <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 600 }}>{profile.bio}</p>

                <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
                  <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>✉️ {profile.email}</span>
                  <span style={{ color: "#6b7280", fontSize: "0.82rem" }}>📱 {profile.phone}</span>
                  <span style={{ color: "#3b82f6", fontSize: "0.82rem" }}>🔗 {profile.linkedin}</span>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { label: "Full Name", field: "name" },
                  { label: "Role", field: "role" },
                  { label: "Company", field: "company" },
                  { label: "Location", field: "location" },
                  { label: "Email", field: "email" },
                  { label: "Phone", field: "phone" },
                  { label: "LinkedIn", field: "linkedin" },
                  { label: "Batch Year", field: "batch" },
                ].map(f => (
                  <div key={f.field}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#6b7280", marginBottom: 6 }}>{f.label}</label>
                    <input value={editForm[f.field] || ""} onChange={e => setEditForm(p => ({ ...p, [f.field]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e0d8", borderRadius: "8px", fontSize: "0.87rem", outline: "none" }} />
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#6b7280", marginBottom: 6 }}>Bio</label>
                  <textarea value={editForm.bio || ""} onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))} rows={3}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e0d8", borderRadius: "8px", fontSize: "0.87rem", outline: "none", resize: "vertical" }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, background: "white", borderRadius: "12px", padding: "6px", border: "1px solid #e5e0d8" }}>
          {["about", "experience", "education"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: "10px", borderRadius: "8px", border: "none",
                background: activeTab === tab ? "#1a1a2e" : "transparent",
                color: activeTab === tab ? "white" : "#6b7280",
                cursor: "pointer", fontWeight: 600, fontSize: "0.87rem",
                textTransform: "capitalize"
              }}>{tab}</button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "about" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", border: "1px solid #e5e0d8" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginBottom: 20 }}>Skills</h3>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: editing ? 20 : 0 }}>
              {(editing ? editForm : profile).skills.map(skill => (
                <div key={skill} style={{
                  background: "#f0f0f8", color: "#4a4a8e",
                  padding: "8px 14px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  {skill}
                  {editing && (
                    <button onClick={() => removeSkill(skill)}
                      style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.75rem", padding: 0 }}>✕</button>
                  )}
                </div>
              ))}
              {editing && (
                <div style={{ display: "flex", gap: 8 }}>
                  <input value={newSkill} onChange={e => setNewSkill(e.target.value)}
                    placeholder="Add skill..."
                    onKeyPress={e => e.key === "Enter" && addSkill()}
                    style={{ padding: "8px 14px", border: "1px dashed #c8a96e", borderRadius: "8px", fontSize: "0.85rem", outline: "none", width: 130 }} />
                  <button onClick={addSkill}
                    style={{ background: "#c8a96e", border: "none", color: "#1a1a2e", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700 }}>+</button>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap" }}>
              {[
                { label: "Connections", value: "56" },
                { label: "Events Attended", value: "12" },
                { label: "Jobs Referred", value: "3" },
                { label: "Profile Views", value: "284" },
              ].map(stat => (
                <div key={stat.label} style={{ flex: 1, minWidth: 120, background: "#f8f5f0", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", fontWeight: 700, color: "#1a1a2e" }}>{stat.value}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.78rem", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", border: "1px solid #e5e0d8" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginBottom: 24 }}>Work Experience</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {profile.experience.map((exp, i) => (
                <div key={i} style={{ display: "flex", gap: 20 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "10px", background: "#f0f0f8",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0
                  }}>💼</div>
                  <div style={{ borderBottom: i < profile.experience.length - 1 ? "1px solid #e5e0d8" : "none", paddingBottom: 20, flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e", marginBottom: 4 }}>{exp.role}</div>
                    <div style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: 4 }}>{exp.company}</div>
                    <div style={{ color: "#9ca3af", fontSize: "0.78rem", marginBottom: 10 }}>{exp.period}</div>
                    <p style={{ color: "#4b5563", fontSize: "0.87rem", lineHeight: 1.7 }}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div style={{ background: "white", borderRadius: "16px", padding: "28px", border: "1px solid #e5e0d8" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginBottom: 24 }}>Education</h3>
            {profile.education.map((edu, i) => (
              <div key={i} style={{ display: "flex", gap: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "10px", background: "#fff3e0",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0
                }}>🎓</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e", marginBottom: 4 }}>{edu.degree}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: 4 }}>{edu.college}</div>
                  <div style={{ color: "#9ca3af", fontSize: "0.78rem", marginBottom: 4 }}>{edu.year}</div>
                  <div style={{
                    display: "inline-block", background: "#c8a96e20", color: "#a07040",
                    padding: "4px 12px", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 700
                  }}>{edu.grade}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
