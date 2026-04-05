"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowDownToLine, Loader2, Check, X, Clock,
  Wallet, TrendingUp, CircleDollarSign, History
} from "lucide-react";
import { motion } from "framer-motion";

const MIN_WD = 25000;

function fmt(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; bg: string; label: string; icon: any }> = {
    PENDING: { color: "#B45309", bg: "#FFFBEB", label: "Diproses", icon: Clock },
    PAID:    { color: "#16A34A", bg: "#F0FDF4", label: "Berhasil",  icon: Check },
    REJECTED:{ color: "#DC2626", bg: "#FEF2F2", label: "Ditolak",  icon: X },
  };
  const cfg = map[status] || map.PENDING;
  const Icon = cfg.icon;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg,
      padding: "4px 10px", borderRadius: 20, border: `1px solid ${cfg.color}22`
    }}>
      <Icon style={{ width: 11, height: 11 }} />
      {cfg.label}
    </span>
  );
}

export function WithdrawalPanel() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/referral/stats");
      const d = await r.json();
      setStats(d);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const handleWithdraw = async () => {
    setRequesting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/withdrawal", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Pengajuan pencairan berhasil dikirim! Admin akan memproses transfer dalam 1×24 jam." });
        fetchStats();
      } else {
        setMessage({ type: "error", text: data.error || "Gagal mengajukan pencairan." });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Terjadi kesalahan jaringan." });
    }
    setRequesting(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
        <Loader2 style={{ width: 24, height: 24, color: "#A1A1AA", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  const available = stats?.available || 0;
  const earnings = stats?.earnings || 0;
  const totalWithdrawn = stats?.totalWithdrawn || 0;
  const history = stats?.withdrawalHistory || [];
  const canWithdraw = available >= MIN_WD;

  const cards = [
    { label: "Total Komisi", value: fmt(earnings), icon: TrendingUp, color: "#10B981", bg: "#F0FDF4" },
    { label: "Tersedia untuk WD", value: fmt(available), icon: Wallet, color: "#6366F1", bg: "#EEF2FF" },
    { label: "Total Dicairkan", value: fmt(totalWithdrawn), icon: CircleDollarSign, color: "#F59E0B", bg: "#FFFBEB" },
  ];

  return (
    <div style={{ marginTop: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Pencairan Komisi
        </h3>
        <p style={{ fontSize: 13, color: "#71717A", margin: 0 }}>
          Minimum pencairan Rp 25.000. Admin akan memproses transfer dalam 1×24 jam.
        </p>
      </div>

      {/* Balance Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
        {cards.map(c => (
          <div key={c.label} style={{
            background: "#fff",
            border: "1px solid #EBEBEB",
            borderRadius: 16,
            padding: "18px 20px",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: c.bg,
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
            }}>
              <c.icon style={{ width: 18, height: 18, color: c.color }} />
            </div>
            <p style={{ fontSize: 12, color: "#71717A", fontWeight: 600, margin: "0 0 4px" }}>{c.label}</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: "#111", margin: 0, letterSpacing: "-0.03em" }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "14px 18px",
            borderRadius: 12,
            marginBottom: 16,
            fontSize: 13, fontWeight: 500,
            background: message.type === "success" ? "#F0FDF4" : "#FEF2F2",
            color: message.type === "success" ? "#16A34A" : "#DC2626",
            border: `1px solid ${message.type === "success" ? "#BBF7D0" : "#FCA5A5"}`,
          }}
        >
          {message.text}
        </motion.div>
      )}

      {/* Withdraw CTA */}
      <div style={{
        background: canWithdraw ? "linear-gradient(135deg, #111 0%, #1E293B 100%)" : "#F4F4F5",
        borderRadius: 16,
        padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 32,
        gap: 16,
        flexWrap: "wrap",
      }}>
        <div>
          <p style={{ fontWeight: 800, fontSize: 15, color: canWithdraw ? "#fff" : "#A1A1AA", margin: "0 0 4px" }}>
            {canWithdraw ? `${fmt(available)} siap dicairkan` : `Belum mencapai minimum ${fmt(MIN_WD)}`}
          </p>
          <p style={{ fontSize: 12, color: canWithdraw ? "rgba(255,255,255,0.6)" : "#C4C4C7", margin: 0 }}>
            {canWithdraw
              ? "Klik tombol untuk mengajukan pencairan semua saldo tersedia."
              : `Kumpulkan ${fmt(MIN_WD - available)} lagi untuk bisa melakukan WD.`}
          </p>
        </div>
        <motion.button
          whileHover={canWithdraw ? { scale: 1.03 } : {}}
          whileTap={canWithdraw ? { scale: 0.97 } : {}}
          onClick={canWithdraw ? handleWithdraw : undefined}
          disabled={!canWithdraw || requesting}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 24px",
            borderRadius: 12,
            border: "none",
            background: canWithdraw ? "#fff" : "#E4E4E7",
            color: canWithdraw ? "#111" : "#A1A1AA",
            fontSize: 13, fontWeight: 700,
            cursor: canWithdraw && !requesting ? "pointer" : "not-allowed",
            whiteSpace: "nowrap",
          }}
        >
          {requesting ? (
            <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} />
          ) : (
            <ArrowDownToLine style={{ width: 14, height: 14 }} />
          )}
          {requesting ? "Memproses..." : "Cairkan Sekarang"}
        </motion.button>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <History style={{ width: 14, height: 14, color: "#71717A" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>Riwayat Pencairan</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {history.map((wd: any) => (
              <div key={wd.id} style={{
                background: "#fff",
                border: "1px solid #F0F0F0",
                borderRadius: 12,
                padding: "14px 18px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 8,
              }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#111", margin: "0 0 3px" }}>{fmt(wd.amount)}</p>
                  <p style={{ fontSize: 12, color: "#71717A", margin: 0 }}>
                    {wd.bankName} · {wd.accountNumber} · {new Date(wd.createdAt).toLocaleDateString("id-ID")}
                  </p>
                  {wd.adminNote && (
                    <p style={{ fontSize: 11, color: "#94A3B8", margin: "3px 0 0" }}>Catatan: {wd.adminNote}</p>
                  )}
                </div>
                <StatusBadge status={wd.status} />
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
