import { useState } from "react";
import api from '../api';

function AuthLayout({ children, title, subtitle, navigate, linkText, linkLabel, linkPage }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#0f0f23",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 20px", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
        background: "radial-gradient(ellipse at top right, rgba(200,169,110,0.08), transparent 60%)",
        pointerEvents: "none"
      }} />
      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        {/* Back to landing */}
        <button onClick={() => navigate("landing")}
          style={{
            background: "transparent", border: "none", color: "rgba(255,255,255,0.4)",
            cursor: "pointer", fontSize: "0.85rem", marginBottom: 32, display: "flex", alignItems: "center", gap: 6
          }}>← Back to Home</button>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "14px",
            background: "linear-gradient(135deg, #c8a96e, #e8d5b0)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "1.4rem", color: "#0f0f23",
            margin: "0 auto 16px"
          }}>A</div>
          <h1 style={{
            fontFamily: "Playfair Display, serif", color: "white",
            fontSize: "1.8rem", fontWeight: 700, marginBottom: 8
          }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>{subtitle}</p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.2)",
          borderRadius: "20px", padding: "36px",
        }}>
          {children}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, color: "rgba(255,255,255,0.4)", fontSize: "0.87rem" }}>
          {linkLabel}{" "}
          <button onClick={() => navigate(linkPage)}
            style={{ background: "none", border: "none", color: "#c8a96e", cursor: "pointer", fontWeight: 600, fontSize: "0.87rem" }}>
            {linkText}
          </button>
        </p>
      </div>
    </div>
  );
}

function FormInput({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.83rem", marginBottom: 8, fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{
          width: "100%", background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px",
          padding: "12px 16px", color: "white", fontSize: "0.9rem",
          outline: "none", transition: "border 0.2s",
          boxSizing: "border-box"
        }}
        onFocus={e => e.target.style.borderColor = "#c8a96e"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
      />
    </div>
  );
}

// ─── LOGIN PAGE ────────────────────────────────────────────────────────────────
export function LoginPage({ navigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your alumni account"
      navigate={navigate}
      linkText="Create one →"
      linkLabel="Don't have an account?"
      linkPage="register"
    >
      <form onSubmit={handleSubmit}>
        <FormInput label="Email Address" type="email" placeholder="your@email.com"
          value={email} onChange={e => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" placeholder="••••••••"
          value={password} onChange={e => setPassword(e.target.value)} />

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button type="button" style={{ background: "none", border: "none", color: "#c8a96e", fontSize: "0.82rem", cursor: "pointer" }}>
            Forgot password?
          </button>
        </div>

        {/* ✅ FIX: Error display added to Login */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "8px", padding: "10px 14px",
            color: "#ef4444", fontSize: "0.85rem", marginBottom: 16
          }}>{error}</div>
        )}

        {/* ✅ FIX: Loading state on login button */}
        <button type="submit" disabled={loading} style={{
          width: "100%", background: "linear-gradient(135deg, #c8a96e, #d4b97e)",
          border: "none", color: "#0f0f23", padding: "14px",
          borderRadius: "10px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
          fontSize: "0.95rem", opacity: loading ? 0.7 : 1
        }}>{loading ? "Signing in..." : "Sign In"}</button>

        <div style={{ textAlign: "center", margin: "20px 0", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>
          — or continue with —
        </div>
        <button type="button" style={{
          width: "100%", background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)",
          padding: "12px", borderRadius: "10px", cursor: "pointer", fontSize: "0.9rem"
        }}>
          🎓 Sign in with College ID
        </button>
      </form>
    </AuthLayout>
  );
}

// ─── REGISTER PAGE ─────────────────────────────────────────────────────────────
export function RegisterPage({ navigate, onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", graduationYear: "", department: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        graduationYear: form.graduationYear,
        department: form.department,
        role: "alumni"
      });
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join AlumniConnect"
      subtitle="Create your profile and reconnect with your batch"
      navigate={navigate}
      linkText="Sign In"
      linkLabel="Already have an account?"
      linkPage="login"
    >
      <form onSubmit={handleSubmit}>
        <FormInput label="Full Name" placeholder="Arjun Sharma" value={form.name} onChange={update("name")} />
        <FormInput label="College Email" type="email" placeholder="21cs001@college.edu" value={form.email} onChange={update("email")} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormInput label="Graduation Year" placeholder="2024" value={form.graduationYear} onChange={update("graduationYear")} />

          {/* ✅ FIX: was form.dept — now correctly uses form.department */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "0.83rem", marginBottom: 8, fontWeight: 500 }}>
              Department
            </label>
            <select value={form.department} onChange={update("department")} style={{
              width: "100%", background: "rgba(30,30,50,0.9)",
              border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px",
              padding: "12px 16px", color: form.department ? "white" : "rgba(255,255,255,0.35)",
              fontSize: "0.9rem", outline: "none", boxSizing: "border-box"
            }}>
              <option value="" style={{ background: "#1a1a2e" }}>Select</option>
              {["CSE", "ECE", "ME", "Civil", "MBA", "MCA"].map(d => (
                <option key={d} value={d} style={{ background: "#1a1a2e" }}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <FormInput label="Password" type="password" placeholder="Min 8 characters" value={form.password} onChange={update("password")} />

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
            <input type="checkbox" style={{ marginTop: 3 }} />
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>
        </div>

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "8px", padding: "10px 14px",
            color: "#ef4444", fontSize: "0.85rem", marginBottom: 16
          }}>{error}</div>
        )}

        {/* ✅ FIX: Button text was "Sign In" — now correctly says "Create Account" */}
        <button type="submit" disabled={loading} style={{
          width: "100%", background: "linear-gradient(135deg, #c8a96e, #d4b97e)",
          border: "none", color: "#0f0f23", padding: "14px",
          borderRadius: "10px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
          fontSize: "0.95rem", opacity: loading ? 0.7 : 1
        }}>{loading ? "Creating account..." : "Create Account"}</button>

      </form>
    </AuthLayout>
  );
}

export default LoginPage;
