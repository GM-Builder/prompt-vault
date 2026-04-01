import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";

export const metadata = { title: "Payment Required | Prompt Vault" };

export default function PaymentPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{
        background: "#fff", border: "1px solid #EBEBEB", borderRadius: 24, padding: "48px 40px",
        maxWidth: 480, width: "100%", textAlign: "center",
        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
        fontFamily: "'Geist', system-ui, sans-serif"
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "#F4F4F5", margin: "0 auto 24px",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Lock style={{ width: 24, height: 24, color: "#111" }} />
        </div>
        
        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em", color: "#111", marginBottom: 12 }}>
          Dashboard Locked
        </h1>
        <p style={{ fontSize: 15, color: "#71717A", lineHeight: 1.6, marginBottom: 32 }}>
          You need lifetime access to enter the vault. Pay once and unlock 1,000+ premium prompts forever.
        </p>
        
        <Link href="http://lynk.id/beurchef/34x317jlepkm/checkout" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "16px", borderRadius: 100,
            background: "#111", color: "#fff", fontSize: 15, fontWeight: 600,
            border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}>
            Pay IDR 8,000 via QRIS <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </Link>
        <div style={{ marginTop: 24, fontSize: 13, color: "#A1A1AA" }}>
          Already paid? Check your Lynk.id receipt for the Validation Link.
        </div>
      </div>
    </div>
  );
}
