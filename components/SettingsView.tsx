"use client";

import { useState, useEffect } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  User, CreditCard, Shield, HelpCircle, ExternalLink,
  Check, Loader2, Building2, Phone, BadgeCheck, ChevronRight, Star
} from "lucide-react";
import { motion } from "framer-motion";

const BANK_OPTIONS = [
  "BCA", "BRI", "BNI", "Mandiri", "CIMB Niaga", "BSI",
  "GoPay", "OVO", "Dana", "ShopeePay", "LinkAja",
];

function SectionCard({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #EBEBEB",
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 16,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "18px 24px",
        borderBottom: "1px solid #F4F4F5",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: "#F4F4F5",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon style={{ width: 16, height: 16, color: "#111" }} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#111", letterSpacing: "-0.02em" }}>{title}</span>
      </div>
      <div style={{ padding: "20px 24px" }}>{children}</div>
    </div>
  );
}

export function SettingsView() {
  const { openUserProfile } = useClerk();
  const { user } = useUser();
  const isPaid = user?.publicMetadata?.isPaid === true;

  // Payout form state
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingPayout, setLoadingPayout] = useState(true);

  useEffect(() => {
    setLoadingPayout(true);
    fetch("/api/settings/payout")
      .then(r => r.json())
      .then(data => {
        if (data.payout) {
          setBankName(data.payout.bankName || "");
          setAccountNumber(data.payout.accountNumber || "");
          setAccountName(data.payout.accountName || "");
        }
      })
      .catch(console.error)
      .finally(() => setLoadingPayout(false));
  }, []);

  const handleSavePayout = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/settings/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankName, accountNumber, accountName }),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1px solid #E4E4E7",
    fontSize: 13,
    fontFamily: "'Geist', system-ui, sans-serif",
    color: "#111",
    background: "#FAFAFA",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: "#71717A",
    marginBottom: 6,
    display: "block",
    letterSpacing: "0.01em",
  };

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111", letterSpacing: "-0.04em", margin: 0 }}>
          Pengaturan
        </h1>
        <p style={{ fontSize: 13, color: "#71717A", marginTop: 4, margin: "4px 0 0" }}>
          Kelola akun, rekening, dan preferensi Anda.
        </p>
      </div>

      {/* === PROFILE SECTION === */}
      <SectionCard title="Akun & Profil" icon={User}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          {user?.imageUrl && (
            <img
              src={user.imageUrl}
              alt="avatar"
              style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2px solid #EBEBEB" }}
            />
          )}
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#111", margin: 0 }}>{user?.fullName || "—"}</p>
            <p style={{ fontSize: 12, color: "#71717A", margin: "2px 0 0" }}>
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          {isPaid && (
            <span style={{
              marginLeft: "auto",
              fontSize: 11, fontWeight: 700,
              color: "#16A34A", background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              padding: "4px 10px", borderRadius: 20,
            }}>
              Pro
            </span>
          )}
        </div>

        <button
          onClick={() => openUserProfile()}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 16px",
            borderRadius: 10,
            border: "1px solid #E4E4E7",
            background: "#fff",
            fontSize: 13, fontWeight: 600, color: "#111",
            cursor: "pointer",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Shield style={{ width: 14, height: 14, color: "#71717A" }} />
            Ubah Password / Email
          </span>
          <ChevronRight style={{ width: 14, height: 14, color: "#A1A1AA" }} />
        </button>
      </SectionCard>

      {/* === SUBSCRIPTION STATUS === */}
      {isPaid && (
        <SectionCard title="Status Langganan" icon={Star}>
          <div style={{
            background: "linear-gradient(135deg, #111 0%, #065F46 100%)",
            borderRadius: 14,
            padding: "20px 20px",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BadgeCheck style={{ width: 22, height: 22, color: "#fff" }} />
            </div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 14, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                Ultimate Pass Aktif
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "3px 0 0" }}>
                Akses 1,000+ prompt seumur hidup · One-time Payment
              </p>
            </div>
          </div>
        </SectionCard>
      )}

      {/* === PAYOUT DETAILS === */}
      <SectionCard title="Rekening Pencairan Komisi" icon={Building2}>
        {loadingPayout ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <Loader2 style={{ width: 20, height: 20, color: "#A1A1AA", animation: "spin 1s linear infinite" }} />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontSize: 12, color: "#71717A", margin: 0, lineHeight: 1.5 }}>
              Simpan rekening Bank atau E-Wallet Anda di sini. Data ini akan otomatis dipakai saat Anda mengajukan pencairan komisi referral.
            </p>

            <div>
              <label style={labelStyle}>Bank / E-Wallet</label>
              <select
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">Pilih Bank / E-Wallet</option>
                {BANK_OPTIONS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Nomor Rekening / HP</label>
              <input
                type="text"
                placeholder="Contoh: 081234567890"
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Nama Pemilik Rekening</label>
              <input
                type="text"
                placeholder="Sesuai rekening/akun"
                value={accountName}
                onChange={e => setAccountName(e.target.value)}
                style={inputStyle}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSavePayout}
              disabled={saving || !bankName || !accountNumber || !accountName}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                background: saving || !bankName ? "#F4F4F5" : "#111",
                color: saving || !bankName ? "#A1A1AA" : "#fff",
                fontSize: 13, fontWeight: 700,
                cursor: saving || !bankName ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                width: "100%",
              }}
            >
              {saving ? (
                <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} />
              ) : saveSuccess ? (
                <><Check style={{ width: 14, height: 14 }} /> Rekening Tersimpan!</>
              ) : (
                <><CreditCard style={{ width: 14, height: 14 }} /> Simpan Rekening</>
              )}
            </motion.button>
          </div>
        )}
      </SectionCard>

      {/* === HELP === */}
      <SectionCard title="Bantuan" icon={HelpCircle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Syarat & Ketentuan Referral", href: "#" },
            { label: "Aturan Campaign Creator Quest", href: "#" },
            { label: "Hubungi Support via Email", href: "mailto:support@veloprome.com" },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid #F0F0F0",
                textDecoration: "none",
                color: "#374151",
                fontSize: 13, fontWeight: 500,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F9F9F9")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {item.label}
              <ExternalLink style={{ width: 12, height: 12, color: "#A1A1AA" }} />
            </a>
          ))}
        </div>
      </SectionCard>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
