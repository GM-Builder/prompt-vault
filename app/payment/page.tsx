"use client";

import Link from "next/link";
import { Lock, ArrowRight, Loader2, CheckCircle, HelpCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const { user, isLoaded } = useUser();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Jangan lakukan polling jika user belum termuat
    if (!isLoaded || !user) return;

    // Jika masuk ke halaman payment ternyata sudah bayar, langsung tendang ke dashboard!
    if (user.publicMetadata?.isPaid === true) {
      window.location.href = "/dashboard";
      return;
    }

    let isMounted = true;

    // Fungsi polling (Mengecek Clerk Server tiap 5 detik apakah webhook berhasil)
    const checkPaymentStatus = async () => {
      while (isMounted && !isSuccess) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (!isMounted) break;

        try {
          // Memuat ulang data user dan cookie dari Clerk (mengecek isPaid)
          await user.reload();
          
          if (user.publicMetadata?.isPaid === true) {
            setIsSuccess(true);
            // Tunggu 1 detik agar animasi rileks, lalu refresh keras masuk ke dashboard
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1000);
            break;
          }
        } catch (error) {
           console.error("Clerk polling error", error);
        }
      }
    };

    checkPaymentStatus();

    return () => { isMounted = false; };
  }, [isLoaded, user?.publicMetadata?.isPaid]); 

  // Jangan render UI jika Clerk belum siap untuk menghindari kedipan 
  if (!isLoaded) {
    return <div style={{ minHeight: "100vh", background: "#FAFAFA" }} />;
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#FAFAFA", overflow: "hidden", fontFamily: "'Geist', system-ui, sans-serif" }}>
      
      {/* BACKGROUND SKELETON (Fake Dashboard) */}
      <div style={{ display: "flex", height: "100vh", opacity: 0.8, filter: "blur(3px)", pointerEvents: "none", background: "#f9fafb" }}>
        {/* Sidebar Fake */}
        <div style={{ width: 280, borderRight: "1px solid #e5e7eb", background: "#fff", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "24px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, background: "#111", borderRadius: 8 }} />
                <div style={{ flex: 1, height: 18, background: "#e5e7eb", borderRadius: 4 }} />
            </div>
            <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
                {[1,2,3,4,5,6,7].map(i => <div key={i} style={{ height: 32, background: "#f3f4f6", borderRadius: 8 }} />)}
            </div>
        </div>
        {/* Main Content Fake */}
        <div style={{ flex: 1, padding: 40, display: "flex", flexDirection: "column" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
                <div style={{ height: 48, width: 240, background: "#d1d5db", borderRadius: 8 }} />
                <div style={{ height: 40, width: 120, background: "#e5e7eb", borderRadius: 20 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} style={{ height: 200, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                    <div style={{ height: 24, width: '60%', background: '#d1d5db', borderRadius: 4 }} />
                    <div style={{ height: 16, width: '40%', background: '#f3f4f6', borderRadius: 4 }} />
                    <div style={{ flex: 1 }} />
                    <div style={{ height: 48, width: '100%', background: '#f9fafb', border: "1px solid #f3f4f6", borderRadius: 8 }} />
                  </div>
                ))}
            </div>
        </div>
      </div>

      {/* GRADIENT OVERLAY (Jelas ke Putih) */}
      <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.95) 70%, rgba(255,255,255,1) 100%)",
          zIndex: 1
      }} />

      {/* PAYMENT MODAL (Centered over overlay) */}
      <div style={{
         position: "absolute", inset: 0, zIndex: 10,
         display: "flex", alignItems: "center", justifyContent: "center", padding: 20
      }}>
          <div style={{
            background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 24, padding: "48px 40px",
            maxWidth: 480, width: "100%", textAlign: "center",
            boxShadow: "0 24px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02)",
          }}>
            
            {isSuccess ? (
              // === UI SUKSES BAYAR (TRANSISI AUTO MASUK) ===
              <div style={{ animation: "fadeIn 0.5s ease" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: "#D1FAE5", margin: "0 auto 24px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 8px rgba(209, 250, 229, 0.4)"
                }}>
                  <CheckCircle style={{ width: 28, height: 28, color: "#065F46" }} />
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", color: "#111", marginBottom: 12 }}>
                  Payment Received!
                </h1>
                <p style={{ fontSize: 15, color: "#10B981", fontWeight: 500, lineHeight: 1.6, marginBottom: 32 }}>
                  Verifying your license token... Please wait a moment.
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Loader2 style={{ width: 24, height: 24, animation: "spin 1s linear infinite", color: "#A1A1AA" }} />
                </div>
              </div>
            ) : (
              // === UI LOCK STANDAR ===
              <>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: "#F4F4F5", margin: "0 auto 24px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 8px rgba(244, 244, 245, 0.5)"
                }}>
                  <Lock style={{ width: 28, height: 28, color: "#111" }} />
                </div>
                
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.04em", color: "#111", marginBottom: 12 }}>
                  Dashboard Locked
                </h1>
                <p style={{ fontSize: 15, color: "#71717A", lineHeight: 1.6, marginBottom: 32 }}>
                  Pilih email yang sama saat di checkout Lynk.id <br/>
                  Akses langsung terbuka otomatis setelah pembayaran berhasil.
                </p>
                
                <Link href="http://lynk.id/beurchef/34x317jlepkm/checkout" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <button style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    width: "100%", padding: "16px", borderRadius: 100,
                    background: "#111", color: "#fff", fontSize: 15, fontWeight: 600,
                    border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                    transition: "transform 0.1s ease",
                  }}>
                    Pay IDR 8,000 via LYNK.ID <ArrowRight style={{ width: 16, height: 16 }} />
                  </button>
                </Link>
                
                <div style={{ marginTop: 24, fontSize: 13, color: "#A1A1AA", lineHeight: 1.6 }}>
                  Secure payment processed by Lynk.id <br/>
                  Auto-activation takes 1-5 seconds after payment.
                </div>

                {/* Butuh Bantuan */}
                <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #EBEBEB" }}>
                  <a href="https://wa.me/6281383521750" target="_blank" rel="noreferrer" style={{ 
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    color: "#71717A", fontSize: 13, textDecoration: "none", fontWeight: 500,
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#111"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#71717A"}
                  >
                    <HelpCircle style={{ width: 14, height: 14 }} /> Mengalami kendala? Hubungi Support
                  </a>
                </div>
              </>
            )}
          </div>
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
