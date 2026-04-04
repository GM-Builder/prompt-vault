"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BENEFITS = [
  "Akses 1.000+ Prompt AI Premium",
  "Semua Update Masa Depan (Lifetime)",
  "Kategori Eksklusif (Premium)",
  "Panduan: 'Cara Cuan dari Prompt AI' (PDF)",
  "Priority Support",
  "One-time Payment (Bukan Langganan)"
];

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
            }}
          />

          {/* Modal Container */}
          <div style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            pointerEvents: "none",
            padding: 20
          }}>
            <motion.div
              className="pricing-modal-card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { type: "spring", damping: 25, stiffness: 300 }
              }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                width: "100%",
                maxWidth: 480,
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderRadius: 40,
                border: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 40px 120px -20px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
                position: "relative",
                pointerEvents: "auto",
                overflow: "hidden"
              }}
            >
              {/* Header Visual */}
              <div className="pricing-modal-header" style={{
                height: 120,
                background: "linear-gradient(135deg, #111 0%, #065F46 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", filter: "blur(30px)" }} />
                <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", filter: "blur(20px)" }} />

                <div style={{
                  padding: 16,
                  borderRadius: 24,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  zIndex: 2
                }}>
                  <Star style={{ width: 32, height: 32, color: "#fff", fill: "#fff" }} />
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  zIndex: 10
                }}
              >
                <X style={{ width: 18, height: 18 }} />
              </button>

              {/* Content */}
              <div className="pricing-modal-content" style={{ padding: "32px 32px 40px" }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontSize: 11, fontWeight: 800, color: "#065F46",
                    background: "#ECFDF5", padding: "6px 12px", borderRadius: 100,
                    letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12
                  }}>
                    <ShieldCheck style={{ width: 12, height: 12 }} /> Lifetime Access
                  </div>
                  <h2 style={{ fontSize: 32, fontWeight: 900, color: "#111", letterSpacing: "-0.05em", marginBottom: 8 }}>
                    Unlock Everything.
                  </h2>
                  <p style={{ fontSize: 15, color: "#64748B", fontWeight: 500, lineHeight: 1.5 }}>
                    Satu kali bayar, akses selamanya. <br />
                    Harga promo hanya hari ini!
                  </p>
                </div>

                {/* Price Card */}
                <div style={{
                  background: "#F8FAFC",
                  borderRadius: 28,
                  padding: "24px",
                  border: "1px solid #F1F5F9",
                  marginBottom: 32,
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.02em" }}>Ultimate Pass</span>
                    <span style={{
                      fontSize: 11, fontWeight: 800, color: "#fff",
                      background: "#EF4444", padding: "4px 8px", borderRadius: 8,
                      boxShadow: "0 4px 12px rgba(239,68,68,0.2)"
                    }}>SAVE 90%</span>
                  </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <span className="pricing-modal-price-val" style={{ fontSize: 40, fontWeight: 900, color: "#111", letterSpacing: "-0.03em" }}>IDR 8.000</span>
                      <span style={{ fontSize: 18, color: "#94A3B8", textDecoration: "line-through", fontWeight: 600 }}>IDR 80.000</span>
                    </div>
                  <div style={{ fontSize: 12, color: "#10B981", fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                    <Zap style={{ width: 12, height: 12, fill: "currentColor" }} /> Limited Time Offer
                  </div>
                </div>

                {/* Benefits */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                  {BENEFITS.map((benefit, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: "#F0FDF4", display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        <Check style={{ width: 12, height: 12, color: "#10B981" }} />
                      </div>
                      <span style={{ fontSize: 14, color: "#334155", fontWeight: 600 }}>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="http://lynk.id/beurchef/34x317jlepkm/checkout" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      padding: "20px",
                      borderRadius: 100,
                      background: "#111",
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
                    }}
                  >
                    Aktivasi Sekarang <ArrowRight style={{ width: 18, height: 18 }} />
                  </motion.button>
                </Link>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
                  Gunakan email Clerk Anda saat checkout untuk aktivasi otomatis.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
      <style jsx>{`
        @media (max-width: 640px) {
          :global(.pricing-modal-card) { 
            max-width: 100% !important; 
            border-radius: 32px !important; 
          }
          :global(.pricing-modal-header) { height: 80px !important; }
          :global(.pricing-modal-content) { padding: 24px 20px 32px !important; }
          :global(.pricing-modal-content h2) { font-size: 24px !important; }
          :global(.pricing-modal-content p) { font-size: 13px !important; }
          :global(.pricing-modal-price-val) { font-size: 28px !important; }
          :global(.pricing-modal-content button) { padding: 16px !important; font-size: 14px !important; }
        }
      `}</style>
    </AnimatePresence>
  );
}
