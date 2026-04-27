"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message);
      return;
    }

    router.push("/admin/dashboard");
  }

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: ".6rem .75rem",
    fontFamily: "monospace",
    fontSize: 14,
    border: "0.5px solid #ddd",
    borderRadius: 8,
    marginTop: ".4rem",
    outline: "none",
    color: "#111",           // ← text color
    background: "#fff",      // ← background
  };

  return (
    <main style={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center", background: "#f5f5f0"
    }}>
      <div style={{
        background: "#fff", border: "0.5px solid #e0e0d8",
        borderRadius: 12, padding: "2.5rem 2rem", width: "100%", maxWidth: 400
      }}>
        <span style={{
          fontSize: 11, fontWeight: 500, letterSpacing: ".08em",
          textTransform: "uppercase", background: "#fee2e2", color: "#b91c1c",
          padding: "4px 10px", borderRadius: 999, display: "inline-block", marginBottom: "1.5rem"
        }}>
          Admin only
        </span>

        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: ".25rem", color: "#111" }}>Control panel</h1>
        <p style={{ fontSize: 13, color: "#888", marginBottom: "2rem" }}>
          Restricted access. Authorised personnel only.
        </p>

        <label style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", color: "#888" }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="admin@example.com"
          style={{ ...inputStyle, marginBottom: "1.25rem" }}
        />

        <label style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", color: "#888" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          style={inputStyle}
        />

        {error && (
          <p style={{ fontSize: 12, color: "#b91c1c", marginTop: ".5rem" }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            display: "block", width: "100%", padding: ".75rem",
            background: "#111", color: "#fff", border: "none",
            borderRadius: 8, fontWeight: 700, fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, marginTop: "1.25rem"
          }}
        >
          {loading ? "Signing in..." : "Sign in →"}
        </button>
      </div>
    </main>
  );
}