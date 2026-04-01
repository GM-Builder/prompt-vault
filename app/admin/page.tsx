"use client";

import { useState } from "react";
import { ShieldCheck, KeyRound, RefreshCw, LogIn, Eye, EyeOff, Check } from "lucide-react";

export default function AdminPage() {
  const [adminSecret, setAdminSecret] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  // --- Login as Admin ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!adminSecret.trim()) return;

    // Fetch current password to verify secret is correct
    const res = await fetch("/api/admin/password", {
      headers: { "x-admin-secret": adminSecret },
    });

    if (res.ok) {
      const data = await res.json();
      setCurrentPassword(data.password);
      setIsLoggedIn(true);
    } else {
      setLoginError("Admin Secret salah. Coba lagi.");
    }
  };

  // --- Update Password ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.trim().length < 4) {
      setMsg("Password minimal 4 karakter.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setMsg("");

    const res = await fetch("/api/admin/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminSecret,
      },
      body: JSON.stringify({ password: newPassword }),
    });
    const data = await res.json();

    if (res.ok) {
      setCurrentPassword(data.password);
      setNewPassword("");
      setStatus("success");
      setMsg(`Password berhasil diubah ke: ${data.password}`);
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setMsg(data.error || "Gagal mengubah password.");
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#0A0A0F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "'Geist', system-ui, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background: "#141418",
    border: "1px solid #2A2A35",
    borderRadius: 24,
    padding: "48px 40px",
    maxWidth: 480,
    width: "100%",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid #2A2A35",
    background: "#1C1C24",
    color: "#F4F4F5",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "monospace",
    letterSpacing: "0.06em",
  };

  const btnStyle = (variant: "primary" | "ghost"): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    padding: "14px",
    borderRadius: 100,
    background: variant === "primary" ? "#7C3AED" : "#1C1C24",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    border: variant === "primary" ? "none" : "1px solid #2A2A35",
    cursor: "pointer",
    transition: "all 0.2s",
  });

  // ---- LOGIN SCREEN ----
  if (!isLoggedIn) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <ShieldCheck style={{ width: 26, height: 26, color: "#fff" }} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#F4F4F5", marginBottom: 8 }}>
              Admin Panel
            </h1>
            <p style={{ color: "#71717A", fontSize: 14 }}>Veloprome — Internal Access Only</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <input
                type={showSecret ? "text" : "password"}
                placeholder="Masukkan Admin Secret..."
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                style={inputStyle}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                style={{
                  position: "absolute", right: 14, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#71717A",
                }}
              >
                {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {loginError && (
              <div style={{ color: "#F87171", fontSize: 13, textAlign: "center" }}>
                {loginError}
              </div>
            )}

            <button type="submit" style={btnStyle("primary")}>
              <LogIn size={16} /> Masuk ke Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---- DASHBOARD SCREEN ----
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <KeyRound size={20} color="#7C3AED" />
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#F4F4F5", margin: 0 }}>
              Kelola Password Aktivasi
            </h1>
          </div>
          <p style={{ color: "#71717A", fontSize: 13, margin: 0 }}>
            Password ini harus dimasukkan user di halaman <code style={{ background: "#1C1C24", padding: "2px 6px", borderRadius: 4, color: "#A78BFA" }}>/dashboard-success</code> untuk membuka akses.
          </p>
        </div>

        {/* Current password display */}
        <div style={{
          background: "#1C1C24", border: "1px solid #2A2A35",
          borderRadius: 12, padding: "16px 20px", marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, color: "#52525B", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Password Aktif Saat Ini
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#A78BFA", fontFamily: "monospace", letterSpacing: "0.1em" }}>
            {currentPassword}
          </div>
        </div>

        {/* Update form */}
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 13, color: "#A1A1AA", marginBottom: 4 }}>
            Password baru akan otomatis dikonversi ke HURUF KAPITAL.
          </div>
          <input
            type="text"
            placeholder="Contoh: VAULT2025NEW"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value.toUpperCase())}
            style={{ ...inputStyle, textTransform: "uppercase" }}
            disabled={status === "loading"}
          />

          {msg && (
            <div style={{
              fontSize: 13, fontWeight: 500,
              color: status === "error" ? "#F87171" : "#34D399",
              textAlign: "center",
            }}>
              {status === "success" && <Check size={14} style={{ display: "inline", marginRight: 4 }} />}
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !newPassword.trim()}
            style={{ ...btnStyle("primary"), opacity: !newPassword.trim() ? 0.6 : 1 }}
          >
            {status === "loading" ? (
              <><RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} /> Menyimpan...</>
            ) : (
              <><Check size={15} /> Simpan Password Baru</>
            )}
          </button>
        </form>

        <button
          onClick={() => { setIsLoggedIn(false); setAdminSecret(""); }}
          style={{ ...btnStyle("ghost"), marginTop: 16 }}
        >
          Logout
        </button>
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
