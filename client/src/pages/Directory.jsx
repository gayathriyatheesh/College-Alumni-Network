import { useState } from "react";

const alumniData = [
  { id: 1, name: "Priya Reddy", batch: "2019", dept: "CSE", role: "SDE-2", company: "Google", location: "Hyderabad", skills: ["React", "Node.js", "ML"], connected: false },
  { id: 2, name: "Rahul Verma", batch: "2018", dept: "MBA", role: "Product Manager", company: "Flipkart", location: "Bangalore", skills: ["Strategy", "Analytics"], connected: true },
  { id: 3, name: "Sneha Patel", batch: "2020", dept: "CSE", role: "Data Scientist", company: "NVIDIA", location: "Pune", skills: ["Python", "TensorFlow", "SQL"], connected: false },
  { id: 4, name: "Kiran Kumar", batch: "2017", dept: "ECE", role: "VLSI Engineer", company: "Qualcomm", location: "Hyderabad", skills: ["VHDL", "FPGA"], connected: false },
  { id: 5, name: "Anjali Singh", batch: "2021", dept: "CSE", role: "Frontend Dev", company: "Swiggy", location: "Bangalore", skills: ["React", "TypeScript"], connected: true },
  { id: 6, name: "Vamsi Krishna", batch: "2016", dept: "ME", role: "Senior Engineer", company: "L&T", location: "Chennai", skills: ["AutoCAD", "SolidWorks"], connected: false },
  { id: 7, name: "Divya Nair", batch: "2022", dept: "MCA", role: "Backend Dev", company: "Paytm", location: "Noida", skills: ["Java", "Spring Boot"], connected: false },
  { id: 8, name: "Aryan Joshi", batch: "2019", dept: "MBA", role: "Consultant", company: "McKinsey", location: "Mumbai", skills: ["Strategy", "Finance"], connected: true },
];

export default function Directory({ navigate }) {
  const [search, setSearch] = useState("");
  const [filterBatch, setFilterBatch] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [connections, setConnections] = useState(
    alumniData.reduce((acc, a) => ({ ...acc, [a.id]: a.connected }), {})
  );

  const batches = ["All", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  const depts = ["All", "CSE", "ECE", "ME", "MBA", "MCA", "Civil"];

  const filtered = alumniData.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase());
    const matchBatch = filterBatch === "All" || a.batch === filterBatch;
    const matchDept = filterDept === "All" || a.dept === filterDept;
    return matchSearch && matchBatch && matchDept;
  });

  const toggleConnect = (id) => {
    setConnections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: "#f8f5f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2rem", color: "#1a1a2e", marginBottom: 8 }}>
            Alumni Directory
          </h1>
          <p style={{ color: "#6b7280" }}>Connect with graduates from your college</p>
        </div>

        {/* Search + Filters */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px 24px", marginBottom: 28, border: "1px solid #e5e0d8" }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <input
              placeholder="🔍 Search by name, company, or role..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                flex: 2, minWidth: 200, padding: "11px 16px",
                border: "1px solid #e5e0d8", borderRadius: "10px",
                fontSize: "0.9rem", outline: "none", background: "#f8f5f0"
              }}
            />
            <select value={filterBatch} onChange={e => setFilterBatch(e.target.value)}
              style={{ flex: 1, minWidth: 120, padding: "11px 14px", border: "1px solid #e5e0d8", borderRadius: "10px", fontSize: "0.9rem", background: "#f8f5f0" }}>
              {batches.map(b => <option key={b}>{b === "All" ? "All Batches" : `Batch ${b}`}</option>)}
            </select>
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
              style={{ flex: 1, minWidth: 120, padding: "11px 14px", border: "1px solid #e5e0d8", borderRadius: "10px", fontSize: "0.9rem", background: "#f8f5f0" }}>
              {depts.map(d => <option key={d}>{d === "All" ? "All Depts" : d}</option>)}
            </select>
          </div>
        </div>

        <div style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: 20 }}>
          Showing <strong>{filtered.length}</strong> alumni
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {filtered.map(alumni => (
            <div key={alumni.id} style={{
              background: "white", borderRadius: "16px", padding: "24px",
              border: "1px solid #e5e0d8", transition: "all 0.2s"
            }}
              onMouseOver={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"}
              onMouseOut={e => e.currentTarget.style.boxShadow = "none"}>

              {/* Top */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${["#1a1a2e","#2d4a6e","#1a3a2e","#3a1a2e"][alumni.id % 4]}, #c8a96e)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 700, fontSize: "1rem", flexShrink: 0
                }}>
                  {alumni.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e", marginBottom: 3 }}>{alumni.name}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.82rem" }}>{alumni.role} @ {alumni.company}</div>
                  <div style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: 2 }}>📍 {alumni.location}</div>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <span style={{
                  background: "#0f0f2310", color: "#1a1a2e",
                  padding: "3px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 600
                }}>Batch {alumni.batch}</span>
                <span style={{
                  background: "#c8a96e20", color: "#a07040",
                  padding: "3px 10px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 600
                }}>{alumni.dept}</span>
              </div>

              {/* Skills */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                {alumni.skills.map(s => (
                  <span key={s} style={{
                    background: "#f0f0f8", color: "#4a4a8e",
                    padding: "3px 9px", borderRadius: "6px", fontSize: "0.72rem"
                  }}>{s}</span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => toggleConnect(alumni.id)}
                  style={{
                    flex: 1, padding: "9px", borderRadius: "8px",
                    border: connections[alumni.id] ? "1px solid #e5e0d8" : "none",
                    background: connections[alumni.id] ? "white" : "#1a1a2e",
                    color: connections[alumni.id] ? "#6b7280" : "white",
                    fontWeight: 600, cursor: "pointer", fontSize: "0.82rem"
                  }}>
                  {connections[alumni.id] ? "✓ Connected" : "+ Connect"}
                </button>
                <button style={{
                  padding: "9px 14px", borderRadius: "8px",
                  border: "1px solid #e5e0d8", background: "white",
                  color: "#1a1a2e", cursor: "pointer", fontSize: "0.82rem"
                }}>Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
