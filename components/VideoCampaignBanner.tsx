"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { 
  Trophy, Sparkles, X, ArrowRight, UserPlus, 
  Copy, Check, Gift, Crown, TrendingUp,
  User, Play, Search, Heart, Share2,
  ChevronDown, ChevronRight, Layers, Loader2, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDashboard } from "@/app/dashboard/context";

// Shared Hook for Campaign Timer
export const useCampaignTimer = () => {
    const [timeLeft, setTimeLeft] = useState("");
    const [phase, setPhase] = useState<"pre-launch" | "live" | "ended">("pre-launch");

    useEffect(() => {
        const startDate = new Date("2026-04-06T00:00:00+07:00").getTime();
        const endDate = new Date("2026-05-21T00:00:00+07:00").getTime();

        const calculateTime = () => {
            const now = new Date().getTime();
            if (now >= endDate) {
                setPhase("ended");
                setTimeLeft("Challenge Telah Berakhir");
                return;
            }
            const isLive = now >= startDate;
            setPhase(isLive ? "live" : "pre-launch");
            const targetTime = isLive ? endDate : startDate;
            const distance = targetTime - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            setTimeLeft(`${String(days).padStart(2, '0')} Hari : ${String(hours).padStart(2, '0')} Jam : ${String(minutes).padStart(2, '0')} Menit`);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return { timeLeft, phase };
};

// Visual Assets
const TROPHY_IMG = "/gold-trophy.png"; 
const CAMPAIGN_BANNER_IMG = "/campaign-banner.png";

// --- 1. Dashboard Banner (Full-width) ---
export const DashboardBanner = ({ onJoin, onUpgrade, isPaid, variant = "campaign" }: { 
  onJoin?: () => void, 
  onUpgrade?: () => void,
  isPaid?: boolean,
  variant?: "campaign" | "leaderboard" 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { timeLeft, phase } = useCampaignTimer();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{ width: "100%", marginBottom: 32 }}
      >
        <div style={{
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          borderRadius: 32,
          display: "flex",
          flexDirection: typeof window !== "undefined" && window.innerWidth < 768 ? "column" : "row",
          height: typeof window !== "undefined" && window.innerWidth < 768 ? "auto" : 280,
          color: "#111",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(0,0,10,0.05)",
          boxShadow: "0 30px 60px -12px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)",
          cursor: "pointer"
        }}
        onClick={() => {}} 
        >
          {/* Main Visual - Wide Banner */}
          <div style={{ 
            position: typeof window !== "undefined" && window.innerWidth < 768 ? "relative" : "absolute", 
            top: 0, right: 0, 
            width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "55%", 
            height: typeof window !== "undefined" && window.innerWidth < 768 ? 200 : "100%", 
            pointerEvents: "none", zIndex: 1 
          }}>
            <div style={{
               position: "absolute", inset: 0, 
               background: typeof window !== "undefined" && window.innerWidth < 768 
                 ? "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%)"
                 : "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 20%)",
               zIndex: 2
            }} />
            <img src={CAMPAIGN_BANNER_IMG} alt="Campaign" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Centered Trophy Visual - Miring (Tilted) */}
          <div style={{ 
            position: "absolute", 
            top: typeof window !== "undefined" && window.innerWidth < 768 ? 100 : "50%", 
            right: typeof window !== "undefined" && window.innerWidth < 768 ? "10%" : "48%", 
            transform: `translateY(-50%) rotate(12deg) ${typeof window !== "undefined" && window.innerWidth < 768 ? "scale(0.6)" : ""}`,
            width: 230, height: 230, zIndex: 4, pointerEvents: "none",
            filter: "drop-shadow(0 30px 60px rgba(146, 64, 14, 0.3))"
          }}>
             <img src={TROPHY_IMG} alt="Trophy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          <div style={{ 
            flex: 1, 
            padding: typeof window !== "undefined" && window.innerWidth < 768 ? "24px" : "48px 64px", 
            display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 3, 
            maxWidth: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "45%" 
          }}>
            {/* Status Badge - Tilted */}
            <div style={{ 
               width: "fit-content", background: "#EF4444", color: "#fff", 
               padding: "4px 14px", borderRadius: 100, fontSize: 10, fontWeight: 900, 
               letterSpacing: "0.08em", marginBottom: 20,
               transform: "rotate(-3deg)",
               boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
            }}>LIVE NOW</div>
            
            <h2 style={{ fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 24 : 32, fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 8px 0", lineHeight: 1.1 }}>
              Creator Quest
            </h2>
            
            <div style={{ 
                fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 32 : 48, fontWeight: 900, letterSpacing: "-0.04em", 
                background: "linear-gradient(to bottom, #92400E, #D97706)", 
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1, marginBottom: 8
            }}>
              Rp 25.000.000
            </div>
            {phase !== "ended" ? (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(146, 64, 14, 0.05)", padding: "6px 12px", borderRadius: 100, width: "fit-content" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: phase === "live" ? "#EF4444" : "#F59E0B" }} />
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#92400E", letterSpacing: "0.05em" }}>
                    {phase === "live" ? "BERAKHIR DALAM: " : "DIMULAI DALAM: "}{timeLeft}
                  </div>
                </div>
            ) : (
                <div style={{ fontSize: 11, fontWeight: 800, color: "#64748B", letterSpacing: "0.1em" }}>
                  CHALLENGE BERAKHIR
                </div>
            )}

            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                <button style={{
                  background: isPaid ? "linear-gradient(135deg, #0D9488, #10B981)" : "linear-gradient(135deg, #4B5563, #1F2937)", 
                  color: "#fff", padding: "12px 32px",
                  borderRadius: 12, fontWeight: 800, border: "none", cursor: "pointer",
                  boxShadow: isPaid ? "0 10px 25px -5px rgba(16,185,129,0.4)" : "0 10px 25px -5px rgba(0,0,0,0.1)", fontSize: 14,
                }} onClick={(e) => { 
                  e.stopPropagation(); 
                  if (!isPaid && onUpgrade) onUpgrade();
                  else if (onJoin) onJoin();
                  else window.scrollTo({ top: 3500, behavior: "smooth" }); 
                }}>
                  {!isPaid ? "Upgrade untuk Ikut" : variant === "leaderboard" ? "Cek Ranking Saya" : "Ikuti Sekarang"}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
                  style={{ background: "rgba(0,0,0,0.05)", border: "none", color: "#71717A", cursor: "pointer", fontSize: 12, fontWeight: 600, padding: "0 16px", borderRadius: 12 }}
                >
                  Tutup
                </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- 2. Popup Overlay (Timed/Manual) ---
export const CampaignPopup = ({ 
  isManualTrigger = false, 
  onCloseRequested, 
  onJoin,
  onUpgrade,
  isPaid
}: { 
  isManualTrigger?: boolean, 
  onCloseRequested?: () => void,
  onJoin?: () => void,
  onUpgrade?: () => void,
  isPaid?: boolean
}) => {
  const [isVisible, setIsVisible] = useState(isManualTrigger);

  useEffect(() => {
    if (!isManualTrigger) {
      const timer = setTimeout(() => setIsVisible(true), 12000); // 12s delay
      return () => clearTimeout(timer);
    }
  }, [isManualTrigger]);

  const { activeCategory } = useDashboard();

  useEffect(() => {
    if (!isManualTrigger) {
      // Logic to prevent annoyance:
      // 1. Don't show if we're already on Campaign/Leaderboard page
      if (activeCategory === "Campaign" || activeCategory === "Leaderboard") return;

      // 2. Don't show if user dismissed it recently (24h cooldown)
      const hideUntil = localStorage.getItem("hide_campaign_popup_until");
      if (hideUntil && new Date().getTime() < parseInt(hideUntil)) {
        return;
      }

      const timer = setTimeout(() => setIsVisible(true), 3500);
      return () => clearTimeout(timer);
    }
  }, [isManualTrigger, activeCategory]);

  const handleClose = (permanent = false) => {
    setIsVisible(false);
    if (permanent) {
      const tomorrow = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem("hide_campaign_popup_until", String(tomorrow));
    }
    if (onCloseRequested) onCloseRequested();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(24px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, padding: 24
        }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          style={{
            maxWidth: 860, width: "100%", background: "#fff",
            borderRadius: typeof window !== "undefined" && window.innerWidth < 768 ? 32 : 40, 
            position: "relative",
            boxShadow: "0 40px 100px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.05)",
            overflow: "hidden",
            display: "flex",
            flexDirection: typeof window !== "undefined" && window.innerWidth < 768 ? "column" : "row",
          }}
        >
          {/* Left Side: Campaign Visual */}
          <div style={{ 
            width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "45%", 
            height: typeof window !== "undefined" && window.innerWidth < 768 ? 180 : "auto",
            position: "relative", background: "#F3F4F6", overflow: "hidden" 
          }}>
             <img src={CAMPAIGN_BANNER_IMG} alt="Campaign Header" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
             <div style={{ position: "absolute", top: 24, left: 24, background: "#EF4444", color: "#fff", padding: "4px 12px", borderRadius: 100, fontSize: 10, fontWeight: 900, letterSpacing: "0.05em" }}>LIVE NOW</div>
          </div>

          {/* Right Side: Content */}
          <div style={{ 
            flex: 1, 
            padding: typeof window !== "undefined" && window.innerWidth < 768 ? "32px 24px 48px" : "64px 48px", 
            textAlign: "left" 
          }}>
            <button 
              onClick={() => handleClose()}
              style={{ position: "absolute", top: 24, right: 24, background: "rgba(0,0,0,0.05)", border: "none", borderRadius: "50%", padding: 8, cursor: "pointer", zIndex: 10 }}
            >
              <X style={{ width: 20, height: 20, color: "#9CA3AF" }} />
            </button>

            <h3 style={{ 
                fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 28 : 42, 
                fontWeight: 900, letterSpacing: "-0.05em", color: "#111", marginBottom: 12, lineHeight: 1.1 
            }}>
              Ikuti <span style={{ 
                background: "linear-gradient(to bottom, #92400E, #D97706)", 
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Creator Quest</span>
            </h3>
            <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6, marginBottom: 32, fontWeight: 500 }}>
              Veloprome Creator Quest: Menangkan total hadiah Rp 25.000.000. 
              Gunakan sistem Quest Points untuk memanjat leaderboard!
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <button style={{
                width: "100%", 
                background: isPaid ? "linear-gradient(135deg, #0D9488, #10B981)" : "linear-gradient(135deg, #111, #333)", 
                color: "#fff", padding: "18px", borderRadius: 100,
                fontSize: 16, fontWeight: 800, border: "none", cursor: "pointer",
                boxShadow: isPaid ? "0 20px 40px -10px rgba(16,185,129,0.4)" : "0 20px 40px -10px rgba(0,0,0,0.1)"
              }} onClick={() => { 
                handleClose(); 
                if (!isPaid && onUpgrade) onUpgrade();
                else if (onJoin) onJoin();
                else window.scrollTo({ top: 3500, behavior: "smooth" }); 
              }}>
                  {!isPaid ? "Upgrade & Gabung Quest" : "Mulai Misi Sekarang"}
              </button>
              <button 
                onClick={() => handleClose(true)}
                style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
              >
                Jangan tampilkan hari ini
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- 3. Sticky Bar (Landing Page) ---
export const CampaignStickyBar = ({ isPaid }: { isPaid?: boolean }) => {
  return (
    <div style={{
      background: isPaid ? "linear-gradient(90deg, #111, #065F46)" : "#111", 
      color: "#fff", padding: "12px 0",
      textAlign: "center", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.02em", borderBottom: "1px solid rgba(255,255,255,0.1)",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
      overflow: "hidden", position: "relative",
      minHeight: 40
    }}>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @media (max-width: 768px) {
          .marquee-mobile {
            display: flex;
            white-space: nowrap;
            animation: marquee 15s linear infinite;
            width: max-content;
          }
          .hide-mobile { display: none; }
        }
        @media (min-width: 769px) {
          .show-mobile-only { display: none; }
        }
      `}</style>

      {isPaid ? (
        <div className={typeof window !== "undefined" && window.innerWidth < 768 ? "marquee-mobile" : ""}>
          <Sparkles style={{ width: 14, height: 14, color: "#10B981", display: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "block" }} />
          <span>Dashboard Pro Aktif: Pantau Komisi & Challenge Anda di Sini — <Link href="/dashboard" style={{ color: "#10B981", textDecoration: "none" }}>Buka Dashboard &rarr;</Link></span>
        </div>
      ) : (
        <div className={typeof window !== "undefined" && window.innerWidth < 768 ? "marquee-mobile" : ""}>
          <span>🔥 VELOPROME CHALLENGE: Total Hadiah Rp 25.000.000! — <Link href="/dashboard?category=Campaign" style={{ color: "#10B981", textDecoration: "none" }}>Ikut Challenge & Menangkan 25 Juta ⚡</Link></span>
        </div>
      )}
    </div>
  );
};

// --- 4. Floating Badge (Hero Section) ---
export const CampaignFloatingBadge = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0, x: 20 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        x: 0,
        y: [0, -10, 0] // Subtle float animation
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
      whileHover={{ scale: 1.1, x: -5 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      style={{
        position: "fixed", top: "50%", right: 32, zIndex: 1001,
        transform: "translateY(-50%)",
        cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12
      }}
    >
      <div style={{
        width: 80, height: 80,
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(20px)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        position: "relative"
      }}>
        {/* Pulsing Outer Ring */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute", inset: -1, borderRadius: "50%",
            border: "2px solid #10B981", pointerEvents: "none"
          }}
        />

        <div style={{
          width: 64, height: 64,
          background: "linear-gradient(135deg, #fff 0%, #F3F4F6 100%)",
          borderRadius: "50%",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
          gap: 2
        }}>
          <Sparkles style={{ width: 18, height: 18, color: "#10B981" }} />
          <div style={{ fontSize: 9, fontWeight: 900, color: "#9CA3AF" }}>25 JUTA</div>
          <div style={{ 
            fontSize: 14, fontWeight: 900, 
            background: "linear-gradient(to bottom, #92400E, #D97706)", 
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            lineHeight: 1
          }}>WIN</div>
        </div>
      </div>
      
      {/* Label Tooltip */}
      <div style={{
        background: "rgba(0,0,0,0.8)", color: "#fff", padding: "6px 12px",
        borderRadius: 100, fontSize: 11, fontWeight: 800, whiteSpace: "nowrap",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)", letterSpacing: "0.05em"
      }}>
        JOIN CHALLENGE
      </div>
    </motion.div>
  );
};

// --- 5. Challenge Section (Landing Page) ---
export const CampaignChallengeSection = ({ isPaid }: { isPaid?: boolean }) => {
  const { timeLeft, phase } = useCampaignTimer();

  return (
    <section style={{ padding: typeof window !== "undefined" && window.innerWidth < 768 ? "60px 20px" : "120px 24px", background: "#fff" }}>
      <div style={{
        maxWidth: 1160, margin: "0 auto", 
        padding: typeof window !== "undefined" && window.innerWidth < 768 ? "60px 32px" : "100px 80px",
        background: isPaid ? "rgba(240, 253, 244, 0.5)" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(40px)",
        borderRadius: typeof window !== "undefined" && window.innerWidth < 768 ? 48 : 80, 
        position: "relative", overflow: "hidden", color: "#111",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 60px 120px -20px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.8)"
      }}>
        {/* Background Visuals */}
        <div style={{ 
          position: "absolute", top: "50%", right: typeof window !== "undefined" && window.innerWidth < 768 ? "-10%" : "10%", 
          transform: `translateY(-50%) rotate(15deg) ${typeof window !== "undefined" && window.innerWidth < 768 ? "scale(0.5)" : ""}`,
          width: 420, height: 420, opacity: typeof window !== "undefined" && window.innerWidth < 768 ? 0.3 : 1, zIndex: 0 
        }}>
           <div style={{
             position: "absolute", inset: -40,
             background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
             borderRadius: "50%", filter: "blur(40px)"
           }} />
           <img src={TROPHY_IMG} alt="Trophy" style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 650 }}>
          <div style={{ width: "fit-content", background: isPaid ? "#10B981" : "#EF4444", color: "#fff", padding: "4px 14px", borderRadius: 100, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", marginBottom: 32, transform: "rotate(-2deg)" }}>
            {isPaid ? "YOUR CHALLENGE STATUS: ACTIVE" : "LIMITED TIME CHALLENGE"}
          </div>
          
          <h2 style={{ 
              fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 32 : 52, 
              fontWeight: 900, letterSpacing: "-0.05em", color: "#111", marginBottom: 24, lineHeight: 1.05 
          }}>
            {isPaid ? "Buktikan Anda\nKreator Terbaik." : "Modal 8rb, Bisa\nBawa Pulang 25 Juta?"}
          </h2>
          <p style={{ fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 16 : 20, color: "#6B7280", marginBottom: 40, lineHeight: 1.6, fontWeight: 500 }}>
            {isPaid 
              ? "Dashboard referral Anda sudah aktif. Terus bagikan manfaat Veloprome dan menangkan hadiah total 25 Juta rupiah." 
              : "Bantu kami sebarkan manfaat Veloprome. Gunakan sistem referral kamu, buat videonya, dan menangkan hadiah total 25 Juta rupiah."
            }
          </p>
          
          <div style={{ display: "flex", flexDirection: typeof window !== "undefined" && window.innerWidth < 768 ? "column" : "row", alignItems: typeof window !== "undefined" && window.innerWidth < 768 ? "flex-start" : "center", gap: 32 }}>
            <Link href="/dashboard?category=Campaign" style={{ textDecoration: "none", width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "auto" }}>
              <button 
                  style={{
                  width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "auto",
                  background: "linear-gradient(135deg, #0d9488, #10b981)", color: "#fff", 
                  padding: "20px 48px", borderRadius: 100, fontWeight: 800, border: "none",
                  fontSize: 16, cursor: "pointer", boxShadow: "0 25px 50px -10px rgba(16,185,129,0.4)",
                  transition: "all 0.3s"
                  }}>
                  {isPaid ? "Buka Dashboard Utama" : phase === 'ended' ? "Lihat Pemenang" : "Ambil Hadiah 25 Juta Sekarang"}
              </button>
            </Link>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 700 }}>
                    {phase === "live" ? "Berakhir dalam" : phase === "pre-launch" ? "Dimulai dalam" : "Status"}
                </span>
                <span style={{ fontSize: 16, color: "#111", fontWeight: 900 }}>{timeLeft}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 6. Referral/Leaderboard Widget (Dashboard) ---
import { useUser } from "@clerk/nextjs";

// --- 6. Referral Hub Widget (Personal Stats) ---
export const ReferralWidget = ({ isPaid, onUpgrade }: { isPaid?: boolean, onUpgrade?: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ clicks: 0, pending: 0, converted: 0, earnings: 0, referralCode: "" });
  const { user } = useUser();
  const refLink = stats.referralCode 
    ? `https://veloprome.com?ref=${stats.referralCode}`
    : `https://veloprome.com?ref=.....`;

  useEffect(() => {
    if (isPaid && user) {
      fetch("/api/referral/stats")
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error("Failed to fetch referral stats", err));
    }
  }, [isPaid, user]);

  const handleCopy = () => {
    if (!isPaid) {
      if (onUpgrade) onUpgrade();
      return;
    }
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: "relative",
      padding: "4px",
      borderRadius: 44,
      background: "linear-gradient(135deg, #10B981, #3B82F6)",
      marginBottom: 80,
      boxShadow: "0 20px 50px -10px rgba(16,185,129,0.3)"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: typeof window !== "undefined" && window.innerWidth < 768 ? 32 : 40, 
        padding: typeof window !== "undefined" && window.innerWidth < 768 ? "48px 24px" : "64px 48px", 
        textAlign: "center",
      }}>
        <div style={{
            position: "absolute", 
            top: typeof window !== "undefined" && window.innerWidth < 768 ? 16 : 32, 
            right: typeof window !== "undefined" && window.innerWidth < 768 ? 24 : 48,
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 9, fontWeight: 800, color: "#94A3B8",
            textTransform: "uppercase", letterSpacing: "0.05em"
        }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
            <span className="hide-mobile">Anti-Fraud Protection Active</span>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto 48px" }}>
            <div style={{ 
                display: "inline-flex", alignItems: "center", gap: 8, 
                background: "#F0FDF4", color: "#16A34A", padding: "6px 14px", 
                borderRadius: 100, fontSize: 12, fontWeight: 800, marginBottom: 24,
                border: "1px solid #DCFCE7"
            }}>
                <Gift style={{ width: 14, height: 14 }} />
                <span>BONUS KOMISI 15%</span>
            </div>
            <h2 style={{ 
                fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 28 : 36, 
                fontWeight: 900, color: "#111", letterSpacing: "-0.04em", marginBottom: 16 
            }}>
                Ajak Teman, <span style={{ color: "#10B981" }}>Menang Bareng.</span>
            </h2>
            <p style={{ fontSize: 15, color: "#6B7280", fontWeight: 600, lineHeight: 1.6 }}>
                Komisi langsung 15% + Poin ekstra untuk Grand Prize 25 Juta!
            </p>
        </div>

        {/* Stats Grid */}
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: typeof window !== "undefined" && window.innerWidth < 640 ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(160px, 1fr))", 
            gap: typeof window !== "undefined" && window.innerWidth < 768 ? 12 : 20, 
            marginBottom: 48 
        }}>
            <div style={{ textAlign: "left", padding: "16px", background: "#F8FAFC", borderRadius: 20, border: "1px solid #F1F5F9" }}>
                <div style={{ color: "#64748B", fontSize: 10, fontWeight: 800, marginBottom: 6 }}>TOTAL KLIK</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#1E293B" }}>{stats.clicks}</div>
            </div>
            <div style={{ textAlign: "left", padding: "16px", background: "#F8FAFC", borderRadius: 20, border: "1px solid #F1F5F9" }}>
                <div style={{ color: "#EAB308", fontSize: 10, fontWeight: 800, marginBottom: 6 }}>PENDING</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#1E293B" }}>{stats.pending}</div>
            </div>
            <div style={{ textAlign: "left", padding: "16px", background: "#F0FDF4", borderRadius: 20, border: "1px solid #DCFCE7" }}>
                <div style={{ color: "#10B981", fontSize: 10, fontWeight: 800, marginBottom: 6 }}>CONVERTED</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#059669" }}>{stats.converted}</div>
            </div>
            <div style={{ textAlign: "left", padding: "16px", background: "linear-gradient(135deg, #111, #333)", borderRadius: 20, color: "#fff" }}>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 800, marginBottom: 6 }}>EARNINGS</div>
                <div style={{ fontSize: 18, fontWeight: 900 }}>Rp {stats.earnings?.toLocaleString('id-ID')}</div>
            </div>
        </div>

        {/* Link Generator */}
        <div style={{ 
            background: "#F8FAFC", borderRadius: 24, padding: "8px", 
            display: "flex", flexDirection: typeof window !== "undefined" && window.innerWidth < 640 ? "column" : "row", 
            alignItems: "center", gap: 12, border: "1px solid #E2E8F0"
        }}>
            <div style={{ 
                flex: 1, padding: "14px 20px", background: "#fff", 
                width: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : "auto",
                borderRadius: 16, border: "1px solid #E2E8F0",
                fontSize: 13, fontWeight: 600, color: isPaid ? "#1E293B" : "#94A3B8",
                textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
            }}>
                {isPaid ? refLink : "••••••••••••••••••••••••••••••••"}
            </div>
            <button 
                onClick={handleCopy}
                style={{
                    width: typeof window !== "undefined" && window.innerWidth < 640 ? "100%" : "auto",
                    background: isPaid ? (copied ? "#10B981" : "#111") : "linear-gradient(135deg, #EF4444, #B91C1C)",
                    color: "#fff", border: "none", padding: "14px 24px",
                    borderRadius: 16, fontSize: 14, fontWeight: 800,
                    cursor: "pointer", transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 8,
                    minWidth: 160, justifyContent: "center"
                }}
            >
                {isPaid ? (
                    <>
                        {copied ? <Check style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                        {copied ? "Tersalin!" : "Salin Link"}
                    </>
                ) : (
                    <>
                        <Crown style={{ width: 16, height: 16 }} />
                        Unlock Link
                    </>
                )}
            </button>
        </div>

        {!isPaid && (
          <p style={{ marginTop: 24, fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
             Komisi 15% otomatis cair setiap ada pembelian dari link Anda. <br />
             <span style={{ color: "#10B981", cursor: "pointer", fontWeight: 700, textDecoration: "underline" }} onClick={onUpgrade}>Upgrade Pro</span> untuk mengaktifkan link referral Anda.
          </p>
        )}
      </div>
    </div>
  );
};

// --- 7. Live Ranking View (Leaderboard) ---
export const LeaderboardView = () => {
    const [data, setData] = useState<{ top100: any[], userRank: number, userStats: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [updatedAt, setUpdatedAt] = useState("");

    useEffect(() => {
        const fetchBoard = () => {
            fetch("/api/referral/leaderboard")
                .then(res => res.json())
                .then(d => {
                    setData(d);
                    setLoading(false);
                    setUpdatedAt("Baru saja"); // Reset to "Just now" on fetch
                })
                .catch(err => console.error("Failed to fetch leaderboard", err));
        };
        
        fetchBoard();

        // Update relative time every minute
        const timer = setInterval(() => {
            setUpdatedAt(prev => {
                if (prev === "Baru saja") return "1 menit yang lalu";
                if (prev.includes("menit")) {
                    const mins = parseInt(prev) + 1;
                    return `${mins} menit yang lalu`;
                }
                return "2 menit yang lalu";
            });
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 0", color: "#94A3B8" }}>
            <Loader2 style={{ width: 32, height: 32, animation: "spin 1s linear infinite" }} />
        </div>
    );

    // Defensive check for API errors
    if (!data || (data as any).error || !data.top100) {
        return (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "#FFF1F2", borderRadius: 32, border: "1px solid #FECDD3" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: "#9F1239", marginBottom: 8 }}>Kesalahan Sinkronisasi</h3>
                <p style={{ color: "#BE123C", fontSize: 14, fontWeight: 500, maxWidth: 400, margin: "0 auto" }}>
                    Terjadi kendala saat memuat data leaderboard. Pastikan database telah tersinkronisasi atau coba lagi nanti.
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    style={{ marginTop: 24, padding: "10px 24px", background: "#9F1239", color: "#fff", border: "none", borderRadius: 100, fontWeight: 800, cursor: "pointer" }}
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    const top3 = data?.top100?.slice(0, 3) || [];
    const remaining = data?.top100?.slice(3) || [];
    const userRank = data?.userRank || 0;
    const userStats = data?.userStats;

    // Empty state: campaign just launched, no real participants yet
    if (data.top100.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "linear-gradient(135deg, #F0FDF4, #ECFDF5)", borderRadius: 32, border: "1px solid #BBF7D0" }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>🏆</div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: "#065F46", marginBottom: 12, letterSpacing: "-0.03em" }}>
                    Jadilah yang Pertama!
                </h3>
                <p style={{ color: "#047857", fontSize: 15, fontWeight: 500, maxWidth: 420, margin: "0 auto 24px", lineHeight: 1.6 }}>
                    Campaign baru saja dimulai dan belum ada peserta yang terdaftar. Daftarkan video Anda sekarang dan rebut posisi #1 di leaderboard!
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 24px", background: "#10B981", color: "#fff", borderRadius: 100, fontWeight: 800, fontSize: 14 }}>
                    ✨ Mulai Tantangan Sekarang
                </div>
            </div>
        );
    }



    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>
            {/* Prize & Status Header */}
            <div style={{ 
                display: "flex", 
                flexDirection: typeof window !== "undefined" && window.innerWidth < 640 ? "column" : "row",
                alignItems: typeof window !== "undefined" && window.innerWidth < 640 ? "flex-start" : "center", 
                justifyContent: "space-between", 
                marginBottom: 40, padding: "0 10px", gap: 20
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ 
                        width: 10, height: 10, borderRadius: "50%", 
                        background: "#10B981", boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)",
                        animation: "pulse-green 2s infinite"
                    }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 13, fontWeight: 900, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.1em", lineHeight: 1 }}>
                            Live Ranking
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", marginTop: 4 }}>
                            {updatedAt === "Baru saja" ? "Tersinkronisasi: Baru saja" : `Update: ${updatedAt}`}
                        </span>
                    </div>
                </div>
                <div style={{ 
                    padding: "10px 24px", borderRadius: 100, 
                    background: "rgba(234, 179, 8, 0.1)", border: "1px solid rgba(234, 179, 8, 0.2)",
                    fontSize: 14, fontWeight: 900, color: "#D97706" 
                }}>
                    Quest Pool: <span style={{ color: "#EAB308" }}>Rp 25.000.000</span>
                </div>
            </div>

            {/* NEW: Editor's Choice Prediction Spotlight */}
            <div style={{
                background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)",
                borderRadius: 32, 
                padding: typeof window !== "undefined" && window.innerWidth < 768 ? "32px 24px" : "32px 40px", 
                marginBottom: 64,
                border: "1px solid rgba(234, 179, 8, 0.3)",
                display: "flex", 
                flexDirection: typeof window !== "undefined" && window.innerWidth < 640 ? "column" : "row",
                alignItems: "center", 
                gap: typeof window !== "undefined" && window.innerWidth < 640 ? 16 : 32,
                position: "relative", overflow: "hidden",
                boxShadow: "0 20px 40px rgba(234, 179, 8, 0.1)",
                textAlign: typeof window !== "undefined" && window.innerWidth < 640 ? "center" : "left"
            }}>
                <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.1 }}>
                    <Sparkles style={{ width: 140, height: 140, color: "#D97706" }} />
                </div>
                <div style={{ 
                    width: 56, height: 56, borderRadius: "50%", background: "#D97706",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0
                }}>
                    <Heart style={{ width: 28, height: 28 }} />
                </div>
                <div>
                    <div style={{ fontSize: 12, fontWeight: 900, color: "#D97706", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Editor's Choice Prediction</div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#92400E", marginBottom: 8 }}>Sedang Menunggu Video Terkreatif Anda!</div>
                    <p style={{ fontSize: 13, color: "#B45309", fontWeight: 600, margin: 0 }}>Spot istimewa untuk video dengan editing & pesan terkuat.</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse-green {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
                .glow-container { position: relative; }
                .glow-effect {
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    width: 120%; height: 120%; border-radius: 50%;
                    filter: blur(60px); opacity: 0.15; z-index: 0; pointer-events: none;
                }
            `}</style>

            {/* Top 3 Medals */}
            <div style={{ 
                display: "flex", 
                flexDirection: typeof window !== "undefined" && window.innerWidth < 768 ? "column" : "row",
                gap: typeof window !== "undefined" && window.innerWidth < 768 ? 16 : 32, 
                marginBottom: 64,
                alignItems: "center",
                position: "relative"
            }}>
                {/* 2nd Place */}
                <div className="glow-container" style={{ order: typeof window !== "undefined" && window.innerWidth < 768 ? 2 : 1, width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "33.33%" }}>
                    <MedalCard user={top3[1]} rank={2} color="#64748B" bg="linear-gradient(135deg, #FFFFFF, #F8FAFC)" height={typeof window !== "undefined" && window.innerWidth < 768 ? 140 : 280} icon={<Trophy style={{ width: 24, height: 24 }} />} />
                </div>
                
                {/* 1st Place */}
                <div className="glow-container" style={{ order: typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2, width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "33.33%" }}>
                    <MedalCard user={top3[0]} rank={1} color="#D97706" bg="linear-gradient(135deg, #FFFBEB, #FEF3C7)" height={typeof window !== "undefined" && window.innerWidth < 768 ? 180 : 340} hasCrown />
                </div>
                
                {/* 3rd Place */}
                <div className="glow-container" style={{ order: typeof window !== "undefined" && window.innerWidth < 768 ? 3 : 3, width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : "33.33%" }}>
                    <MedalCard user={top3[2]} rank={3} color="#92400E" bg="linear-gradient(135deg, #FFF7ED, #FFEDD5)" height={typeof window !== "undefined" && window.innerWidth < 768 ? 140 : 240} icon={<Trophy style={{ width: 20, height: 20 }} />} />
                </div>
            </div>

            {/* User Inserted Rank (If > 3) */}
            {userRank > 3 && (
                <div style={{
                    background: "linear-gradient(135deg, #1E293B, #0F172A)",
                    padding: "24px 40px",
                    borderRadius: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 48,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    position: "relative", overflow: "hidden"
                }}>
                    <div style={{ position: "absolute", inset: 0, background: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')", opacity: 0.05 }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 2 }}>
                        <div style={{ 
                            width: 64, height: 64, borderRadius: "50%", 
                            background: "rgba(16, 185, 129, 0.1)", 
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 22, fontWeight: 900, color: "#10B981" 
                        }}>
                            #{userRank}
                        </div>
                        <div>
                            <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: "-0.02em" }}>{userStats?.name} <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>(Anda)</span></div>
                            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                                {userStats?.referrals > 0 ? "Statistik Anda terverifikasi. Terus naikkan ranking!" : "Ayo mulai bagikan link referral Anda!"}
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "right", position: "relative", zIndex: 2 }}>
                        <div style={{ color: "#10B981", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>
                            {userStats?.points || 0}
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", marginTop: 4, letterSpacing: "0.05em" }}>Quest Points</div>
                    </div>
                </div>
            )}

            {/* Leaderboard List Tiers */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {remaining.map((u: any, i: number) => {
                    const isTop10 = u.rank <= 10;
                    return (
                        <div key={u.rank} style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "20px 32px",
                            background: u.isMe ? "rgba(16, 185, 129, 0.05)" : isTop10 ? "rgba(255, 255, 255, 0.6)" : "#fff",
                            backdropFilter: isTop10 ? "blur(10px)" : "none",
                            borderRadius: 24,
                            border: u.isMe ? "1px solid #10B981" : isTop10 ? "1px solid rgba(0,0,0,0.05)" : "1px solid #F1F5F9",
                            transition: "all 0.2s",
                            boxShadow: isTop10 ? "0 10px 30px rgba(0,0,0,0.02)" : "none"
                        }} className="rank-row">
                            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                                <span style={{ fontSize: 15, fontWeight: 900, color: isTop10 ? "#D97706" : "#94A3B8", width: 40 }}>#{u.rank}</span>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: 16, fontWeight: 800, color: u.isMe ? "#065F46" : "#1E293B" }}>{u.name} {u.isMe && <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.6 }}>(Anda)</span>}</span>
                                    {isTop10 && <span style={{ fontSize: 10, fontWeight: 800, color: "#10B981", textTransform: "uppercase", marginTop: 2 }}>Tier: Glass Explorer</span>}
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 16, fontWeight: 900, color: "#111" }}>{u.points || 0} <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>Pts</span></div>
                                <div style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase" }}>{u.referrals} Refs • {u.views || 0} Views</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <style jsx>{`
                .rank-row:hover { background: #F8FAFC; transform: translateX(5px); }
            `}</style>
        </div>
    );
};

const MedalCard = ({ user, rank, color, bg, height, hasCrown, icon }: any) => {
    if (!user) return <div style={{ height, background: "#F8FAFC", borderRadius: 40, opacity: 0.5 }} />;
    
    return (
        <div style={{
            height: typeof window !== "undefined" && window.innerWidth < 768 ? "auto" : height, 
            background: bg, borderRadius: typeof window !== "undefined" && window.innerWidth < 768 ? 24 : 40,
            padding: typeof window !== "undefined" && window.innerWidth < 768 ? "24px" : "48px 24px 32px", 
            display: "flex", 
            flexDirection: typeof window !== "undefined" && window.innerWidth < 768 ? "row" : "column",
            alignItems: "center", 
            justifyContent: typeof window !== "undefined" && window.innerWidth < 768 ? "flex-start" : "flex-end",
            position: "relative", zIndex: 1, gap: 20,
            boxShadow: rank === 1 ? "0 30px 60px -12px rgba(234,179,8,0.25)" : "0 15px 30px rgba(0,0,0,0.03)",
            border: `1px solid ${rank === 1 ? "rgba(234,179,8,0.2)" : "rgba(0,0,0,0.05)"}`
        }}>
            {hasCrown && (
                <div style={{ 
                    position: "absolute", 
                    top: typeof window !== "undefined" && window.innerWidth < 768 ? -20 : -30, 
                    right: typeof window !== "undefined" && window.innerWidth < 768 ? 20 : "auto",
                    transform: "rotate(-5deg)" 
                }}>
                    <Crown style={{ width: typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 64, height: typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 64, color: "#EAB308", filter: "drop-shadow(0 10px 20px rgba(234,179,8,0.4))" }} />
                </div>
            )}
            
            <div style={{ 
                width: typeof window !== "undefined" && window.innerWidth < 768 ? 48 : 72, 
                height: typeof window !== "undefined" && window.innerWidth < 768 ? 48 : 72, 
                borderRadius: "50%", 
                background: "#fff", border: `4px solid ${color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 18 : 28, 
                fontWeight: 900, color,
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                position: "relative", flexShrink: 0
            }}>
                {rank}
                <div style={{ position: "absolute", bottom: -8, right: -8, background: color, color: "#fff", borderRadius: "50%", padding: 4, display: "flex", border: "2px solid #fff" }}>
                    {icon || <Trophy style={{ width: 12, height: 12 }} />}
                </div>
            </div>
            
            <div style={{ flex: 1, textAlign: typeof window !== "undefined" && window.innerWidth < 768 ? "left" : "center" }}>
                <div style={{ fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 16 : 18, fontWeight: 900, color: "#111", marginBottom: 4, letterSpacing: "-0.02em" }}>{user.name}</div>
                <div style={{ display: "inline-block", background: color + "15", padding: "4px 12px", borderRadius: 100 }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color }}>{user.points || 0} Pts</div>
                </div>
            </div>
        </div>
    );
};

// --- 7. Campaign Deep Details (Accordion) ---
export const CampaignAccordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ marginBottom: 12, border: "1px solid #F1F5F9", borderRadius: 16, overflow: "hidden", background: "#fff" }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    width: "100%", padding: "20px 24px", display: "flex", 
                    alignItems: "center", justifyContent: "space-between",
                    background: "none", border: "none", cursor: "pointer",
                    textAlign: "left"
                }}
            >
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>{title}</span>
                <ChevronDown style={{ 
                    width: 20, height: 20, color: "#94A3B8",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s"
                }} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{ padding: "0 24px 24px", fontSize: 14, color: "#64748B", lineHeight: 1.6, borderTop: "1px solid #F8FAFC" }}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const CampaignSubmissionForm = ({ onComplete }: { onComplete: () => void }) => {
    const { timeLeft, phase } = useCampaignTimer();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({ platform: "tiktok", videoUrl: "", username: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");
        setErrorMsg("");

        try {
            const res = await fetch("/api/campaign/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    platform: formData.platform, 
                    videoUrl: formData.videoUrl,  // Fixed: was 'link', API expects 'videoUrl'
                    username: formData.username 
                })
            });

            if (res.ok) {
                setStatus("success");
            } else {
                const err = await res.json();
                setErrorMsg(err.error || "Gagal mengirim pendaftaran. Coba lagi.");
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setErrorMsg("Terjadi kesalahan jaringan. Periksa koneksi Anda.");
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    if (status === "success") {
        return (
            <div style={{ textAlign: "center", padding: "48px", background: "#F0FDF4", borderRadius: 32, border: "2px solid #10B981" }}>
                <div style={{ width: 64, height: 64, background: "#10B981", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", margin: "0 auto 24px" }}>✓</div>
                <h4 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Pendaftaran Berhasil!</h4>
                <p style={{ color: "#065F46", fontSize: 16, fontWeight: 500 }}>Tim juri kami akan meninjau video Anda dalam 1-3 hari kerja. Semoga beruntung!</p>
                <button onClick={onComplete} style={{ marginTop: 24, padding: "12px 32px", background: "#111", color: "#fff", borderRadius: 100, border: "none", fontWeight: 800, cursor: "pointer" }}>Tutup</button>
            </div>
        );
    }

    return (
        <div style={{ background: "#fff", padding: "48px", borderRadius: 32, border: "1px solid #F1F5F9", boxShadow: "0 20px 40px rgba(0,0,0,0.02)", position: "relative", overflow: "hidden" }}>
            <h4 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Kirimkan Video Testimoni Anda</h4>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>Pastikan video Anda sudah publik dan tag @Veloprome sesuai S&K.</p>
                {phase !== "ended" && (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FEF2F2", color: "#EF4444", padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 800 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#EF4444" }} />
                        {phase === "live" ? `Sisa Waktu: ${timeLeft}` : `Pendaftaran Buka: ${timeLeft}`}
                    </div>
                )}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>Pilih Platform</label>
                    <div style={{ display: "flex", gap: 12 }}>
                        {["TikTok", "Instagram Reels"].map(p => (
                            <button 
                                key={p} type="button"
                                onClick={() => setFormData({ ...formData, platform: p.toLowerCase() })}
                                style={{
                                    flex: 1, padding: "12px", borderRadius: 12, border: "1px solid #E2E8F0",
                                    background: formData.platform === p.toLowerCase() ? "#111" : "#fff",
                                    color: formData.platform === p.toLowerCase() ? "#fff" : "#64748B",
                                    fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                                }}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>Link Video (URL)</label>
                    <input 
                        required type="url" placeholder="https://..."
                        value={formData.videoUrl} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                        style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid #E2E8F0", outline: "none", fontSize: 14, boxSizing: "border-box" }}
                    />
                </div>

                <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 8 }}>Username Media Sosial</label>
                    <input 
                        required type="text" placeholder="@username"
                        value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })}
                        style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid #E2E8F0", outline: "none", fontSize: 14 }}
                    />
                </div>

                {/* Error notification - replaces alert() */}
                {status === "error" && errorMsg && (
                    <div style={{
                        padding: "14px 18px",
                        borderRadius: 12,
                        background: "#FEF2F2",
                        border: "1px solid #FCA5A5",
                        color: "#DC2626",
                        fontSize: 13, fontWeight: 600,
                        display: "flex", alignItems: "flex-start", gap: 10,
                    }}>
                        <span style={{ fontSize: 16, lineHeight: 1 }}>⚠️</span>
                        <span>{errorMsg}</span>
                    </div>
                )}

                <button 
                    disabled={loading}
                    type="submit"
                    style={{ 
                        marginTop: 12, padding: "18px", borderRadius: 100, border: "none",
                        background: loading ? "#94A3B8" : "linear-gradient(90deg, #10B981, #3B82F6)",
                        color: "#fff",
                        fontSize: 16, fontWeight: 800, cursor: loading ? "wait" : "pointer",
                        boxShadow: loading ? "none" : "0 10px 25px -5px rgba(16,185,129,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        width: "100%", transition: "all 0.2s",
                    }}
                >
                    {loading ? (
                        <>
                            <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                            Sedang Mengirim...
                        </>
                    ) : "Kirim Sekarang"}
                </button>
            </form>
        </div>
    );
};


export const CampaignRulesDetail = ({ 
    isPaid, 
    onUpgrade, 
    hasAgreed, 
    onAgree 
}: { 
    isPaid: boolean, 
    onUpgrade: () => void,
    hasAgreed: boolean,
    onAgree: (val: boolean) => void
}) => {
    const [showSnK, setShowSnK] = useState(false);

    const categories = [
        { 
            title: "Impact (50%)", weight: "Referral-based", icon: <UserPlus />, color: "#10B981",
            desc: "Seberapa besar pengaruh video Anda dalam mengajak orang lain mencoba Veloprome (Dihitung dari Referral Berbayar)." 
        },
        { 
            title: "Reach (25%)", weight: "Virality-based", icon: <TrendingUp />, color: "#3B82F6",
            desc: "Seberapa luas video Anda tersebar di media sosial (Dihitung dari Total Views & Engagement)." 
        },
        { 
            title: "Quality (25%)", weight: "Editor's Choice", icon: <Crown />, color: "#D97706",
            desc: "Orisinalitas, teknik editing, dan kekuatan pesan dalam video Anda (Pilihan Juri)." 
        },
    ];

    const prizes = [
        { rank: "Juara 1 (The Ultimate Creator)", prize: "Rp 7.500.000", badge: "Legend" },
        { rank: "Juara 2", prize: "Rp 4.500.000", badge: "Epic" },
        { rank: "Juara 3", prize: "Rp 2.500.000", badge: "Diamond" },
        { rank: "Peringkat 4 - 10", prize: "Rp 750.000", badge: "Top 10" },
        { rank: "Peringkat 11 - 20", prize: "Rp 300.000", badge: "Top 20" },
        { rank: "Editor's Favorite", prize: "Rp 2.250.000", badge: "Special" },
    ];
    
    const disclaimer = "*Pajak hadiah ditanggung oleh pemenang.";

    const steps = [
        { num: 1, title: "Dapatkan Akses Pro", desc: "Pastikan Anda menggunakan paket Starter atau Ultimate.", isDone: isPaid },
        { num: 2, title: "Buat Video Testimoni", desc: "Bagikan pengalaman anda menggunakan prompt Veloprome.", isDone: false },
        { num: 3, title: "Upload & Tag @Veloprome", desc: "Gunakan hashtag #VelopromeChallenge di Reels/TikTok.", isDone: false },
        { num: 4, title: "Submit Challenge", desc: "Kirimkan link video anda melalui formulir di bawah ini.", isDone: false },
    ];

    return (
        <div style={{ marginTop: 64, position: "relative" }}>
            {/* 0. Prize Breakdown Table */}
            <div style={{ 
                background: "linear-gradient(135deg, #111827, #0F172A)", 
                borderRadius: typeof window !== "undefined" && window.innerWidth < 768 ? 32 : 40, 
                padding: typeof window !== "undefined" && window.innerWidth < 768 ? "32px 20px" : "48px", 
                marginBottom: 80,
                color: "#fff", position: "relative", overflow: "hidden",
                boxShadow: "0 40px 100px -20px rgba(0,0,0,0.3)"
            }}>
                <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.1 }}>
                    <Trophy style={{ width: 240, height: 240, color: "#EAB308", transform: "rotate(15deg)" }} />
                </div>
                <div style={{ position: "relative", zIndex: 2 }}>
                    <h3 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.04em" }}>Total Hadiah Rp 25.000.000</h3>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, marginBottom: 32 }}>BERDASARKAN SISTEM QUEST POINTS (REFERRAL + VIRAL)</p>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {prizes.map((p, i) => (
                            <div key={i} style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "16px 24px", borderRadius: 20,
                                background: i < 3 ? "rgba(255,255,255,0.05)" : "transparent",
                                border: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                                    <div style={{ 
                                        width: 32, height: 32, borderRadius: "50%", 
                                        background: i === 0 ? "#EAB308" : i === 1 ? "#94A3B8" : i === 2 ? "#B45309" : "rgba(255,255,255,0.1)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 13, fontWeight: 900, color: i < 3 ? "#000" : "#fff"
                                    }}>
                                        {i === 4 ? "★" : i + 1}
                                    </div>
                                    <span style={{ fontSize: 16, fontWeight: 800 }}>{p.rank}</span>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: 16, fontWeight: 900, color: i < 3 ? "#EAB308" : "#fff" }}>{p.prize}</div>
                                    <div style={{ fontSize: 10, fontWeight: 900, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{p.badge}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ marginTop: 24, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                        {disclaimer}
                    </div>
                </div>
            </div>
            {/* 1. Hadiah Categories */}
            <div style={{ textAlign: "center", marginBottom: 64 }}>
                <h3 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>3 Cara Menjadikan Anda Pemenang</h3>
                <p style={{ color: "#64748B", fontSize: 18, fontWeight: 500 }}>Total hadiah Rp 25.000.000 menanti kreativitas dan jaringan Anda.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 80 }}>
                {categories.map((cat, i) => (
                    <div key={i} style={{ 
                        padding: "32px", borderRadius: 32, background: "#fff", 
                        border: "1px solid rgba(0,0,0,0.05)", position: "relative", overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.02)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                            <div style={{ color: cat.color }}>{cat.icon}</div>
                            <div style={{ background: `${cat.color}15`, color: cat.color, padding: "4px 12px", borderRadius: 100, fontSize: 10, fontWeight: 900 }}>{cat.weight}</div>
                        </div>
                        <h4 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>{cat.title}</h4>
                        <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.6, fontWeight: 500, marginBottom: 20 }}>{cat.desc}</p>
                        
                        {/* Pillar Progress Bar Visualization */}
                        <div style={{ width: "100%", height: 6, background: "#F1F5F9", borderRadius: 100, overflow: "hidden" }}>
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: cat.title.includes("40%") ? "40%" : "20%" }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                style={{ height: "100%", background: cat.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Deep Details Accordion */}
            <div style={{ maxWidth: 800, margin: "0 auto 80px" }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                   <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Panduan & Aturan Mendalam</h3>
                   <p style={{ color: "#64748B", fontSize: 16 }}>Klik pada topik di bawah ini untuk mempelajari lebih lanjut.</p>
                </div>
                
                <CampaignAccordion title="Detail Teknis Video">
                    <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                        <li><strong>Durasi:</strong> Minimal 15 detik, maksimal 60 detik.</li>
                        <li><strong>Hashtag Wajib:</strong> #VelopromeChallenge, #PromptVault, #CuanPakeAI.</li>
                        <li><strong>Tag Akun:</strong> Peserta wajib men-tag akun resmi @Veloprome di TikTok/Instagram.</li>
                        <li><strong>Kualitas:</strong> Video harus jernih (min. 1080p), suara terdengar jelas, dan tidak mengandung watermark aplikasi lain.</li>
                    </ul>
                </CampaignAccordion>

                <CampaignAccordion title="Kriteria Penilaian Detail">
                    <p style={{ marginBottom: 12 }}>Kami menilai setiap aspek keikutsertaan Anda dengan transparan:</p>
                    <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                        <li><strong>Referral Accuracy:</strong> Hanya akun "Verified User" (mendaftar & mengaktifkan akun) yang dihitung.</li>
                        <li><strong>Engagement Check:</strong> Kami menggunakan sistem audit untuk memastikan Views/Likes/Comments organik. Penggunaan bot akan didiskualifikasi permanen.</li>
                        <li><strong>Storytelling:</strong> Konten yang menceritakan *result* nyata menggunakan prompt Veloprome mendapat poin ekstra.</li>
                    </ul>
                </CampaignAccordion>

                <CampaignAccordion title="Informasi Hadiah & Pencairan">
                    <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                        <li><strong>Pajak:</strong> Pajak hadiah sebesar 5% (untuk pemilik NPWP) atau 6% (tanpa NPWP) ditanggung oleh Penyelenggara.</li>
                        <li><strong>Distribusi:</strong> Hadiah dikirimkan via Transfer Bank atau E-Wallet (DANA/OVO/GoPay) sesuai nama di akun Veloprome.</li>
                        <li><strong>Verifikasi:</strong> Pemenang wajib melakukan validasi identitas (KTP) sebelum hadiah dicairkan.</li>
                    </ul>
                </CampaignAccordion>
            </div>

            {/* 3. Step by Step */}
            <div style={{ background: "#F8FAFC", borderRadius: 48, padding: "80px 48px", marginBottom: 80 }}>
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <h3 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Mulai Ikutan Challenge</h3>
                    <p style={{ color: "#64748B", fontSize: 18, fontWeight: 500 }}>Ikuti 4 langkah mudah untuk mulai mengumpulkan poin.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
                    {steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                            <div style={{ 
                                width: 56, height: 56, borderRadius: "50%", 
                                background: step.isDone ? "#10B981" : "#fff",
                                border: step.isDone ? "none" : "2px solid #E2E8F0",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 20, fontWeight: 900, color: step.isDone ? "#fff" : "#1E293B",
                                marginBottom: 20, boxShadow: "0 10px 20px rgba(0,0,0,0.04)"
                            }}>
                                {step.isDone ? "✓" : step.num}
                            </div>
                            <h5 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{step.title}</h5>
                            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.5 }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. S&K Section */}
            <div style={{ 
                background: hasAgreed ? "#F0FDF4" : "#fff", 
                padding: "48px", borderRadius: 40, border: "2px dashed #E2E8F0",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
                marginBottom: 80
            }}>
                <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Konfirmasi Partisipasi</h4>
                    <p style={{ color: "#64748B", fontSize: 15, fontWeight: 500 }}>
                        Anda wajib menyetujui Syarat & Ketentuan yang berlaku untuk mengikuti Program Veloprome Creator Challenge 2026.
                    </p>
                    <button 
                        onClick={() => setShowSnK(true)}
                        style={{ background: "none", border: "none", color: "#3B82F6", padding: 0, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 12, textDecoration: "underline" }}
                    >
                        Baca Syarat & Ketentuan Lengkap
                    </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div 
                        onClick={() => onAgree(!hasAgreed)}
                        style={{
                            width: 60, height: 32, background: hasAgreed ? "#10B981" : "#E2E8F0",
                            borderRadius: 100, padding: 4, cursor: "pointer", position: "relative",
                            transition: "all 0.3s"
                        }}
                    >
                        <div style={{ 
                            width: 24, height: 24, background: "#fff", borderRadius: "50%",
                            marginLeft: hasAgreed ? 28 : 0, transition: "all 0.3s",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                        }} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: hasAgreed ? "#10B981" : "#64748B" }}>
                        {hasAgreed ? "Saya Setuju" : "Setujui S&K"}
                    </span>
                </div>
            </div>

            {/* 5. Submission Form / Locked State */}
            {hasAgreed ? (
                isPaid ? (
                    <div id="submit-section" className="animate-fadein-up">
                        <CampaignSubmissionForm onComplete={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
                    </div>
                ) : (
                    <div style={{
                        background: "linear-gradient(135deg, #1e293b, #0f172a)",
                        padding: "60px 48px",
                        borderRadius: 48,
                        textAlign: "center",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 25px 60px -12px rgba(0,0,0,0.3)",
                        marginBottom: 100
                    }}>
                        <div style={{ 
                            width: 64, height: 64, borderRadius: 20, background: "rgba(255,255,255,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px"
                        }}>
                            <Lock style={{ width: 32, height: 32, color: "#10B981" }} />
                        </div>
                        <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Formulir Terkunci</h3>
                        <div style={{ color: "#94A3B8", fontSize: 16, maxWidth: 400, margin: "0 auto 32px", fontWeight: 500, lineHeight: 1.6 }}>
                            <p style={{ color: "#fff", fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Satu langkah lagi!</p> Aktifkan Paket Ultimate dan kirimkan karya terbaik Anda sekarang
                        </div>
                        <button 
                            onClick={onUpgrade}
                            style={{
                                background: "linear-gradient(135deg, #10B981, #059669)",
                                color: "#fff", padding: "16px 40px", borderRadius: 100,
                                border: "none", fontSize: 16, fontWeight: 800, cursor: "pointer",
                                boxShadow: "0 10px 30px rgba(16,185,129,0.4)"
                            }}
                        >
                            Upgrade & Gabung Quest Sekarang
                        </button>
                    </div>
                )
            ) : null}

            {/* S&K Modal */}
            <AnimatePresence>
                {showSnK && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(40px)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                            style={{ maxWidth: 800, width: "100%", maxHeight: "80vh", background: "#fff", borderRadius: 32, overflow: "hidden", display: "flex", flexDirection: "column" }}
                        >
                            <div style={{ padding: "32px 48px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h4 style={{ fontSize: 20, fontWeight: 900 }}>Syarat & Ketentuan</h4>
                                <button onClick={() => setShowSnK(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X /></button>
                            </div>
                            <div style={{ padding: "48px", overflowY: "auto", fontSize: 14, color: "#4B5563", lineHeight: 1.7 }}>
                                <h2 style={{ fontSize: 24, fontWeight: 900, color: "#111", marginBottom: 24 }}>VELOPROME CREATOR CHALLENGE 2026</h2>
                                
                                <p style={{ marginBottom: 16 }}><strong>PASAL 1: PENYELENGGARA</strong><br />Program "Veloprome Creator Challenge" diselenggarakan secara resmi oleh Veloprome (selanjutnya disebut "Penyelenggara").</p>
                                
                                <p style={{ marginBottom: 16 }}><strong>PASAL 2: PERIODE PROGRAM</strong><br />Program berlangsung mulai tanggal [Tanggal Mulai] pukul 00:00 WIB sampai dengan tanggal [Tanggal Selesai] pukul 23:59 WIB.</p>
                                
                                <p style={{ marginBottom: 16 }}><strong>PASAL 3: KELAYAKAN PESERTA</strong><br />1. Peserta wajib WNI berdomisili di Indonesia.<br />2. Memiliki akun Veloprome aktif.<br />3. Terbuka bagi pengguna Starter (8K) & Ultimate (19K).</p>

                                <p style={{ marginBottom: 16 }}><strong>PASAL 4: MEKANISME PARTISIPASI</strong><br />1. Unggah video testimoni ke TikTok/Instagram Reels.<br />2. Tag akun resmi & gunakan hashtag: #VelopromeChallenge #CuanPakeAI.<br />3. Cantumkan Link Referral Unik pada bio/komentar yang disematkan.</p>

                                <p style={{ marginBottom: 16 }}><strong>PASAL 5: KATEGORI PEMENANG</strong><br />1. Referral King (60%).<br />2. Viral Star (20%).<br />3. Creative Master (20%).</p>

                                <p style={{ marginBottom: 16 }}><strong>PASAL 6: HADIAH & PAJAK</strong><br />Hadiah Rp 25.000.000 disalurkan via bank/e-wallet maksimal 14 hari kerja setelah pengumuman. Pajak ditanggung penyelenggara.</p>

                                <p style={{ marginBottom: 16 }}><strong>PASAL 7: LARANGAN</strong><br />Dilarang menggunakan bot, akun palsu, atau konten yang mengandung SARA/ujaran kebencian.</p>

                                <p style={{ marginBottom: 16 }}><strong>PASAL 8: HAK CIPTA</strong><br />Setiap video menjadi hak milik bersama. Penyelenggara berhak menggunakan untuk kepentingan promosi.</p>

                                <p style={{ marginBottom: 16 }}><strong>PASAL 9: TANGGUNG JAWAB</strong><br />Penyelenggara tidak bertanggung jawab atas gangguan teknis platform pihak ketiga.</p>

                                <p style={{ marginBottom: 16 }}><strong>PASAL 10: KETENTUAN HUKUM</strong><br />Keputusan Penyelenggara bersifat mutlak. Syarat tunduk pada hukum Republik Indonesia.</p>
                            </div>
                            <div style={{ padding: "24px 48px", background: "#F8FAFC", textAlign: "center" }}>
                                <button 
                                    onClick={() => { onAgree(true); setShowSnK(false); }}
                                    style={{ background: "#111", color: "#fff", padding: "12px 32px", borderRadius: 100, border: "none", fontWeight: 800, cursor: "pointer" }}
                                >
                                    Saya Mengerti & Setuju
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- 8. Exit Intent Popup ---
export const ExitIntentPopup = ({ isPaid }: { isPaid?: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (isPaid) return; // Never show for paid users

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown, isPaid]);

  if (isPaid || !isVisible) return null;

  const steps = [
    { icon: <User style={{ width: 24, height: 24 }} />, label: "Daftar/Login" },
    { icon: <Play style={{ width: 24, height: 24 }} />, label: "Buat Video" },
    { icon: <UserPlus style={{ width: 24, height: 24 }} />, label: "Sebarkan Link" },
    { icon: <Trophy style={{ width: 24, height: 24 }} />, label: "Menangkan Hadiah" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(20px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2000, padding: 24
        }}
      >
        <motion.div
           initial={{ scale: 0.9, y: 40 }}
           animate={{ scale: 1, y: 0 }}
           style={{
             maxWidth: 800, width: "100%", background: "#fff",
             borderRadius: 32, padding: "80px 60px", textAlign: "center",
             position: "relative",
             boxShadow: "0 50px 100px -20px rgba(0,0,0,0.15)",
             border: "1px solid rgba(0,0,0,0.05)",
             overflow: "hidden"
           }}
        >
          {/* Confetti Decoration (Simulated with random colored dots) */}
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 8, height: 8,
              borderRadius: "50%",
              background: ["#FBBF24", "#34D399", "#60A5FA", "#F87171"][i % 4],
              top: `${Math.random() * 100}%`,
              left: i % 2 === 0 ? `${Math.random() * 10}%` : `${90 + Math.random() * 10}%`,
              opacity: 0.4
            }} />
          ))}

          <div style={{ position: "absolute", top: 40, left: 48, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, background: "linear-gradient(135deg, #10B981, #3B82F6)", borderRadius: 6 }} />
            <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.04em", color: "#111" }}>Veloprome</span>
          </div>

          <button 
             onClick={() => setIsVisible(false)}
             style={{ position: "absolute", top: 40, right: 48, background: "none", border: "none", cursor: "pointer" }}
           >
             <X style={{ width: 24, height: 24, color: "#9CA3AF" }} />
           </button>

          <h3 style={{ 
              fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 28 : 48, 
              fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.1, color: "#111", marginBottom: 16 
          }}>
            Jangan Tinggalkan 25 <br />Juta Anda.
          </h3>
          <p style={{ fontSize: 16, color: "#6B7280", marginBottom: 48, fontWeight: 500 }}>
            Sudah 1,240 kreator bergabung hari ini.
          </p>

          {/* Stepper Logic */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 80, position: "relative" }}>
             {steps.map((step, i) => (
               <React.Fragment key={i}>
                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, zIndex: 1, width: 120 }}>
                   <div style={{
                     width: 64, height: 64, borderRadius: 16, background: "#fff",
                     border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center",
                     color: "#111", boxShadow: "0 10px 20px rgba(0,0,0,0.03)"
                   }}>
                     {step.icon}
                   </div>
                   <span style={{ fontSize: 13, fontWeight: 700, color: "#4B5563" }}>{step.label}</span>
                 </div>
                 {i < steps.length - 1 && (
                   <div style={{ width: 80, height: 1, borderTop: "2px dashed #E5E7EB", marginTop: -32 }} />
                 )}
               </React.Fragment>
             ))}
          </div>

          <div style={{ maxWidth: 460, margin: "0 auto" }}>
             <button style={{
               width: "100%",
               background: "linear-gradient(90deg, #06B6D4, #10B981)", 
               color: "#fff", padding: "22px", borderRadius: 100,
               fontSize: 20, fontWeight: 800, border: "none", cursor: "pointer",
               boxShadow: "0 20px 40px -10px rgba(16,185,129,0.4)"
             }} onClick={() => setIsVisible(false)}>
               Ambil Kesempatan Saya Sekarang
             </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
