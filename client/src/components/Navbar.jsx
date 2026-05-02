import { useState } from "react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "directory", label: "Alumni", icon: "👥" },
  { id: "jobs", label: "Jobs", icon: "💼" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "profile", label: "Profile", icon: "👤" },
];


export default function Navbar({ currentPage, navigate, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "A";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "#0f0f23",
      borderBottom: "1px solid rgba(200,169,110,0.2)",
      height: "70px", display: "flex", alignItems: "center",
      padding: "0 32px", justifyContent: "space-between",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => navigate("dashboard")}>
        <div style={{
          width: 36, height: 36, borderRadius: "8px",
          background: "linear-gradient(135deg, #c8a96e, #e8d5b0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", fontWeight: 900, color: "#0f0f23"
        }}>A</div>
        <div>
          <div style={{ color: "white", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1 }}>
            AlumniConnect
          </div>
          <div style={{ color: "#c8a96e", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
            CLASS OF LEGENDS
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: 4 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => navigate(item.id)}
            style={{
              background: currentPage === item.id ? "rgba(200,169,110,0.15)" : "transparent",
              border: "none", color: currentPage === item.id ? "#c8a96e" : "rgba(255,255,255,0.6)",
              padding: "8px 16px", borderRadius: "8px",
              fontSize: "0.87rem", fontWeight: 500,
              display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
              transition: "all 0.2s",
              borderBottom: currentPage === item.id ? "2px solid #c8a96e" : "2px solid transparent",
            }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* User Menu */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent", border: "1px solid rgba(200,169,110,0.4)",
            borderRadius: "40px", padding: "6px 14px 6px 6px",
            display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
            color: "white"
          }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #c8a96e, #e8d5b0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#0f0f23", fontWeight: 700, fontSize: "0.8rem"
          }}>{initials}</div>
          <span style={{ fontSize: "0.87rem" }}>{user?.name?.split(" ")[0] || "Alumni"}</span>
          <span style={{ fontSize: "0.7rem" }}>▾</span>
        </button>

        {menuOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            background: "#1a1a2e", border: "1px solid rgba(200,169,110,0.2)",
            borderRadius: "12px", padding: "8px", minWidth: 180,
            boxShadow: "0 16px 40px rgba(0,0,0,0.3)"
          }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 4 }}>
              <div style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{user?.name}</div>
              <div style={{ color: "#c8a96e", fontSize: "0.75rem" }}>Batch {user?.batch}</div>
            </div>
            {[
              { label: "View Profile", action: () => { navigate("profile"); setMenuOpen(false); } },
              { label: "Settings", action: () => setMenuOpen(false) },
              { label: "Logout", action: onLogout, danger: true },
            ].map(item => (
              <button key={item.label} onClick={item.action}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  color: item.danger ? "#ef4444" : "rgba(255,255,255,0.8)",
                  padding: "10px 14px", textAlign: "left", borderRadius: "8px",
                  cursor: "pointer", fontSize: "0.87rem",
                  display: "block",
                }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
