"use client";

import { useState } from "react";
import { ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardSuccessPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [msg, setMsg] = useState("");
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  if (!isLoaded) return <div style={{ minHeight: "100vh", background: "#FAFAFA" }} />;
  if (!userId) {
     if (typeof window !== "undefined") window.location.href = "/sign-in?redirect_url=/dashboard-success";
     return <div style={{ minHeight: "100vh", background: "#FAFAFA" }} />;
  }

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setStatus("loading");
    setMsg("");
    
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus("success");
        setMsg("Access Granted! Activating your account...");
        
        // Memaksa Clerk untuk memuat ulang token session (bawaan metadata baru)
        // sebelum kita redirect ke dashboard.
        await user?.reload();

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setStatus("error");
        setMsg(data.error || "Invalid password.");
      }
    } catch {
      setStatus("error");
      setMsg("Connection error. Try again.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      {/* Container */}
      <div style={{
        background: "#fff", border: "1px solid #EBEBEB", borderRadius: 24, padding: "48px 40px",
        maxWidth: 480, width: "100%", textAlign: "center",
        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
        fontFamily: "'Geist', system-ui, sans-serif"
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: status === "success" ? "#D1FAE5" : "#F4F4F5", 
          margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s ease"
        }}>
          <ShieldCheck style={{ width: 24, height: 24, color: status === "success" ? "#065F46" : "#111" }} />
        </div>
        
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "#111", marginBottom: 12 }}>
          Activate Your License
        </h1>
        <p style={{ fontSize: 15, color: "#71717A", lineHeight: 1.6, marginBottom: 32 }}>
          Enter the activation password shown on your Lynk.id payment receipt to unlock full access.
        </p>
        
        <form onSubmit={handleRedeem}>
          <input 
            type="text" 
            placeholder="Enter Password (e.g., PROMPTVAULT8K)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={status === "loading" || status === "success"}
            style={{
              width: "100%", padding: "14px 20px", borderRadius: 12, border: "1px solid #EBEBEB",
              background: "#F9FAFB", fontSize: 15, marginBottom: 16, outline: "none",
              color: "#111", textAlign: "center", fontWeight: 500, letterSpacing: "0.05em",
              boxSizing: "border-box"
            }}
          />
          
          {msg && (
            <div style={{ 
              marginBottom: 16, fontSize: 14, fontWeight: 500,
              color: status === "error" ? "#EF4444" : "#10B981" 
            }}>
              {msg}
            </div>
          )}

          <button 
            type="submit"
            disabled={status === "loading" || status === "success" || !password}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", padding: "16px", borderRadius: 100,
              background: status === "success" ? "#10B981" : "#111", 
              color: "#fff", fontSize: 15, fontWeight: 600,
              border: "none", cursor: "pointer", 
              opacity: (status === "loading" || !password) ? 0.7 : 1,
              transition: "all 0.2s ease"
            }}
          >
            {status === "loading" ? (
               <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> Verifying...</>
            ) : status === "success" ? (
               "Activated!"
            ) : (
               <>Activate Access <ArrowRight style={{ width: 16, height: 16 }} /></>
            )}
          </button>
        </form>

      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
