"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Unable to reach the login server. Check that the app is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.pageContainer}>
      <div className={styles.loginCard}>
        <span className={`${styles.adminBadge} font-heading`}>
          Admin only
        </span>

        <h1 className={`${styles.title} font-heading`}>Control panel</h1>
        <p className={`${styles.subtitle} font-heading`}>
          Restricted access. Authorised personnel only.
        </p>

        <div>
          <div className={styles.formGroup}>
            <label className={`${styles.label} font-heading`}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.label} font-heading`}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className={`${styles.inputField} ${styles.passwordInput}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className={styles.errorText}>{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`${styles.submitBtn} font-heading`}
          >
            {loading ? "Signing in..." : "Sign in ->"}
          </button>
        </div>
      </div>
    </main>
  );
}
