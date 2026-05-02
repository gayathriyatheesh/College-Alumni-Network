import { useState } from "react";

const jobsData = [
  { id: 1, role: "Frontend Developer", company: "TCS Digital", location: "Hyderabad", type: "Full-time", salary: "8-12 LPA", posted: "2d ago", postedBy: "Rahul Verma (2018)", dept: "CSE", experience: "1-3 yrs", skills: ["React", "JavaScript", "CSS"], description: "Work on modern web applications for enterprise clients using React and TypeScript." },
  { id: 2, role: "Product Manager", company: "Zomato", location: "Bangalore", type: "Full-time", salary: "18-25 LPA", posted: "1d ago", postedBy: "Anjali Singh (2021)", dept: "MBA", experience: "3-5 yrs", skills: ["Strategy", "Analytics", "SQL"], description: "Drive product vision for our restaurant partner platform serving 300K+ restaurants." },
  { id: 3, role: "ML Engineer", company: "AI Startup", location: "Remote", type: "Contract", salary: "₹80K/mo", posted: "3d ago", postedBy: "Sneha Patel (2020)", dept: "CSE", experience: "2-4 yrs", skills: ["Python", "PyTorch", "MLOps"], description: "Build and deploy ML models for computer vision applications." },
  { id: 4, role: "DevOps Engineer", company: "Infosys", location: "Pune", type: "Full-time", salary: "10-15 LPA", posted: "5d ago", postedBy: "Kiran Kumar (2017)", dept: "CSE", experience: "2-4 yrs", skills: ["AWS", "Docker", "Kubernetes"], description: "Manage CI/CD pipelines and cloud infrastructure for large-scale deployments." },
  { id: 5, role: "Business Analyst", company: "Deloitte", location: "Mumbai", type: "Full-time", salary: "12-18 LPA", posted: "1w ago", postedBy: "Aryan Joshi (2019)", dept: "MBA", experience: "1-3 yrs", skills: ["Excel", "Tableau", "SQL"], description: "Work with clients to analyze business requirements and provide data-driven insights." },
  { id: 6, role: "VLSI Design Engineer", company: "MediaTek", location: "Hyderabad", type: "Full-time", salary: "15-22 LPA", posted: "4d ago", postedBy: "Vamsi Krishna (2016)", dept: "ECE", experience: "3-6 yrs", skills: ["Verilog", "SPICE", "FPGA"], description: "Design and verify complex VLSI circuits for mobile chipsets." },
];

const typeColors = { "Full-time": "#10b981", "Contract": "#f59e0b", "Internship": "#6366f1" };

export default function Jobs({ navigate }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [selected, setSelected] = useState(null);
  const [applied, setApplied] = useState({});

  const filtered = jobsData.filter(j => {
    const matchSearch = j.role.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || j.type === filterType;
    const matchDept = filterDept === "All" || j.dept === filterDept;
    return matchSearch && matchType && matchDept;
  });

  const selectedJob = selected ? jobsData.find(j => j.id === selected) : null;

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: "#f8f5f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", color: "#1a1a2e", marginBottom: 8 }}>
              Job Board
            </h1>
            <p style={{ color: "#6b7280" }}>Opportunities shared exclusively by our alumni network</p>
          </div>
          <button style={{
            background: "#1a1a2e", border: "none", color: "white",
            padding: "12px 24px", borderRadius: "10px", cursor: "pointer",
            fontWeight: 600, fontSize: "0.9rem"
          }}>+ Post a Job</button>
        </div>

        {/* Filters */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px 24px", marginBottom: 28, border: "1px solid #e5e0d8" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <input
              placeholder="🔍 Search jobs, companies, locations..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                flex: 2, minWidth: 200, padding: "11px 16px",
                border: "1px solid #e5e0d8", borderRadius: "10px",
                fontSize: "0.9rem", outline: "none", background: "#f8f5f0"
              }}
            />
            {[
              { value: filterType, setter: setFilterType, options: ["All", "Full-time", "Contract", "Internship"], label: "Type" },
              { value: filterDept, setter: setFilterDept, options: ["All", "CSE", "ECE", "ME", "MBA", "MCA"], label: "Dept" },
            ].map(f => (
              <select key={f.label} value={f.value} onChange={e => f.setter(e.target.value)}
                style={{ flex: 1, minWidth: 120, padding: "11px 14px", border: "1px solid #e5e0d8", borderRadius: "10px", fontSize: "0.9rem", background: "#f8f5f0" }}>
                {f.options.map(o => <option key={o}>{o === "All" ? `All ${f.label}s` : o}</option>)}
              </select>
            ))}
          </div>
        </div>

        {/* Two-panel layout */}
        <div style={{ display: "grid", gridTemplateColumns: selectedJob ? "1fr 1.2fr" : "1fr", gap: 24 }}>

          {/* Job List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map(job => (
              <div key={job.id} onClick={() => setSelected(selected === job.id ? null : job.id)}
                style={{
                  background: "white", borderRadius: "14px", padding: "20px 22px",
                  border: selected === job.id ? "2px solid #c8a96e" : "1px solid #e5e0d8",
                  cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseOver={e => { if (selected !== job.id) e.currentTarget.style.borderColor = "#c8a96e50"; }}
                onMouseOut={e => { if (selected !== job.id) e.currentTarget.style.borderColor = "#e5e0d8"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a2e", marginBottom: 4 }}>{job.role}</div>
                    <div style={{ color: "#6b7280", fontSize: "0.85rem" }}>{job.company} • {job.location}</div>
                  </div>
                  <span style={{
                    background: typeColors[job.type] + "20", color: typeColors[job.type],
                    padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700
                  }}>{job.type}</span>
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  <span style={{ color: "#10b981", fontSize: "0.82rem", fontWeight: 600 }}>{job.salary}</span>
                  <span style={{ color: "#9ca3af", fontSize: "0.82rem" }}>{job.experience}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {job.skills.map(s => (
                    <span key={s} style={{ background: "#f0f0f8", color: "#4a4a8e", padding: "3px 9px", borderRadius: "6px", fontSize: "0.72rem" }}>{s}</span>
                  ))}
                </div>
                <div style={{ marginTop: 12, color: "#9ca3af", fontSize: "0.75rem" }}>
                  Posted by {job.postedBy} • {job.posted}
                </div>
              </div>
            ))}
          </div>

          {/* Job Detail */}
          {selectedJob && (
            <div style={{ background: "white", borderRadius: "16px", padding: "28px", border: "1px solid #e5e0d8", alignSelf: "flex-start", position: "sticky", top: 90 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", color: "#1a1a2e", marginBottom: 6 }}>{selectedJob.role}</h2>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>{selectedJob.company}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#9ca3af", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
                {[
                  { icon: "📍", text: selectedJob.location },
                  { icon: "💰", text: selectedJob.salary },
                  { icon: "⏱", text: selectedJob.experience },
                  { icon: "🏷", text: selectedJob.type },
                ].map(item => (
                  <div key={item.text} style={{
                    background: "#f8f5f0", borderRadius: "8px", padding: "8px 14px",
                    fontSize: "0.82rem", color: "#1a1a2e", display: "flex", gap: 6
                  }}>
                    <span>{item.icon}</span><span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>Description</h4>
                <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.8 }}>{selectedJob.description}</p>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>Required Skills</h4>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {selectedJob.skills.map(s => (
                    <span key={s} style={{ background: "#f0f0f8", color: "#4a4a8e", padding: "5px 12px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 24, padding: "14px", background: "#f8f5f0", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginBottom: 4 }}>Posted by Alumni</div>
                <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1a2e" }}>{selectedJob.postedBy}</div>
              </div>

              <button
                onClick={() => setApplied(p => ({ ...p, [selectedJob.id]: !p[selectedJob.id] }))}
                style={{
                  width: "100%", padding: "14px",
                  background: applied[selectedJob.id] ? "white" : "#1a1a2e",
                  color: applied[selectedJob.id] ? "#10b981" : "white",
                  border: applied[selectedJob.id] ? "2px solid #10b981" : "none",
                  borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.95rem"
                }}>
                {applied[selectedJob.id] ? "✓ Application Submitted" : "Apply Now"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
