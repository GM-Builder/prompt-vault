import Link from "next/link";
import { 
  Sparkles, Copy, ArrowRight, Check, Zap, Shield, Layers, 
  Music, Megaphone, User, Headphones, Calendar, BarChart2, 
  Play, Mail, BookOpen, Rocket, Image as ImageIcon,
  Smartphone, Globe, Clock, Star
} from "lucide-react";
import { PromptCard } from "@/components/PromptCard";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const metadata = {
  title: "VELOPROME | 1,000+ Premium AI Prompts",
  description: "Buka 1.000+ prompt AI premium untuk ChatGPT, Claude, dan Gemini. Pembayaran sekali bayar hanya IDR 8.000.",
};

const CATEGORIES_WITH_ICONS = [
  { name: "TikTok Affiliate", icon: <Music className="w-4 h-4" /> },
  { name: "Copywriting", icon: <Megaphone className="w-4 h-4" /> },
  { name: "Personal Branding", icon: <User className="w-4 h-4" /> },
  { name: "Customer Service", icon: <Headphones className="w-4 h-4" /> },
  { name: "Content Ideas", icon: <Calendar className="w-4 h-4" /> },
  { name: "Market Research", icon: <BarChart2 className="w-4 h-4" /> },
  { name: "YouTube Scripts", icon: <Play className="w-4 h-4" /> },
  { name: "Email Marketing", icon: <Mail className="w-4 h-4" /> },
  { name: "Storytelling", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Product Launch", icon: <Rocket className="w-4 h-4" /> },
  { name: "Image Generation", icon: <ImageIcon className="w-4 h-4" /> },
];

const STATS = [
  { value: "1,000+", label: "Premium Prompts" },
  { value: "11", label: "Categories" },
  { value: "3", label: "AI Platforms" },
  { value: "IDR 8k", label: "One-time Price" },
];

const SAMPLE_PROMPTS = [
  {
    category: "TikTok Affiliate",
    title: "Viral TikTok Hook Generator",
    content: "Tulis naskah hook TikTok berdurasi 15 detik untuk produk afiliasi [nama produk] yang dimulai dengan statistik mengejutkan dan diakhiri dengan curiosity gap yang kuat. Gunakan bahasa yang relevan dengan tren anak muda Indonesia saat ini.",
    isLocked: false
  },
  {
    category: "Copywriting",
    title: "High-Conv FB Ads Framework",
    content: "Buat headline dan body copy iklan Facebook menggunakan formula PAS (Problem-Agitate-Solve). Fokus pada keresahan target audiens tentang [masalah] dan tawarkan [produk] sebagai solusi instan tertarget.",
    isLocked: false
  },
  {
    category: "Product Launch",
    title: "Launch Checklist Day-7",
    content: "Buat rencana hitung mundur peluncuran produk selama 7 hari. Sertakan jadwal posting harian, jenis konten (edukasi, soft-sell, hard-sell), dan strategi psikologi 'Fear of Missing Out' (FOMO) untuk memaksimalkan angka penjualan di hari-H.",
    isLocked: false
  },
];

const TESTIMONIALS = [
  {
    text: "8 ribu perak buat hemat waktu berjam-jam? No brainer sih! Langsung langganan biar update terus.",
    author: "Kreator Anonim",
    role: "TikTok Affiliate"
  },
  {
    text: "Gila sih, isinya lengkap banget. Tinggal copy-paste langsung jadi konten viral. Terlalu murah buat value segini.",
    author: "Content Creator",
    role: "Instagram Hero"
  },
  {
    text: "Dashboard-nya bersih dan gampang dipake. Sangat membantu buat riset market produk baru saya.",
    author: "Online Seller",
    role: "Shopee Top Rated"
  }
];

const FAQS = [
  {
    q: "Apakah ini langganan bulanan?",
    a: "Tidak, ini one-time payment. Bayar sekali, akses selamanya tanpa biaya tambahan di masa depan."
  },
  {
    q: "Bisa dipakai di HP?",
    a: "Sangat bisa. Veloprome didesain untuk kenyamanan copy-paste lewat smartphone agar Anda bisa bekerja di mana saja."
  },
  {
    q: "Apakah prompt-nya diupdate?",
    a: "Ya, kami menambah prompt baru secara berkala untuk memastikan Anda selalu mendapatkan teknik AI terbaru."
  },
  {
    q: "Gimana cara aktivasinya?",
    a: "Setelah pembayaran, sistem kami akan mendeteksi email Anda dalam 1-5 detik dan membuka akses premium secara otomatis."
  }
];

export default async function LandingPage() {
  const authObj = await auth();
  const userId = authObj.userId;

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Geist', system-ui, sans-serif", overflowX: "hidden" }}>

      {/* ────── NAV ────── */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/LOGO.png"
              alt="Veloprome"
              style={{
                height: "clamp(28px, 5vw, 44px)",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
            <span style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(18px, 2vw, 24px)",
              letterSpacing: "0.12em",
              lineHeight: 1,
              background: "linear-gradient(90deg, #065f46, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>VELOPROME</span>
          </div>

          <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {userId ? (
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: "#111", color: "#fff",
                  fontSize: 13, fontWeight: 600,
                  padding: "10px 24px", borderRadius: 100, border: "none", cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                }}>
                  Dashboard <ArrowRight style={{ width: 14, height: 14 }} />
                </button>
              </Link>
            ) : (
                <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                    <button style={{
                        background: "#111", color: "#fff",
                        fontSize: 13, fontWeight: 600,
                        padding: "10px 24px", borderRadius: 100, border: "none", cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                    }}>Get Started</button>
                </SignInButton>
            )}
          </div>
        </div>
      </nav>

      {/* ────── HERO SECTION (Original) ────── */}
      <header style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10%", right: "-5%", width: "40%", height: "60%",
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(60px)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-5%", width: "30%", height: "50%",
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(60px)", pointerEvents: "none"
        }} />

        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "100px 24px 120px",
          display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center"
        }} className="hero-container">
          
          <div style={{ zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 100,
              background: "rgba(34, 197, 94, 0.08)", color: "#16A34A",
              border: "1px solid rgba(34, 197, 94, 0.15)", marginBottom: 32
            }}>
              <Zap style={{ width: 14, height: 14, fill: "currentColor" }} /> EARLY ACCESS IDR 8.000
            </div>

            <h1 style={{
              fontSize: "clamp(48px, 5vw, 72px)", fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-0.04em", color: "#111", marginBottom: 28
            }}>
              The World&apos;s Most <br />
              <span style={{ 
                color: "#22C55E",
                background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Powerful AI</span> <br />
              Prompt Library.
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.6, color: "#52525B", maxWidth: 540, marginBottom: 48 }}>
              Buka akses ke 1.000+ prompt yang telah diuji untuk ChatGPT, Claude, dan Gemini. 
              Didesain untuk menghemat 20+ jam kerja Anda setiap minggu.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "#111", color: "#fff",
                  fontSize: 16, fontWeight: 600,
                  padding: "18px 36px", borderRadius: 100, border: "none", cursor: "pointer",
                  boxShadow: "0 20px 40px -12px rgba(0,0,0,0.3)",
                }} className="hover-scale">
                  {userId ? "Go to Dashboard" : "Get Instant Access"} <ArrowRight style={{ width: 18, height: 18 }} />
                </button>
              </SignInButton>
            </div>
            <div style={{ marginTop: 24, fontSize: 14, color: "#A1A1AA" }}>
              One-time payment · <span style={{ fontWeight: 700, color: "#111" }}>Only IDR 8,000</span>
            </div>
          </div>

          <div style={{ position: "relative" }} className="hero-visual">
            <div style={{
              borderRadius: 32,
              padding: 0,
              position: "relative",
              zIndex: 2,
              overflow: "hidden",
            }}>
              <img
                src="/hero-mockup.png"
                alt="Dashboard Preview"
                style={{
                  width: "100%", height: "auto", display: "block",
                  borderRadius: 24,
                  boxShadow: "0 40px 80px -20px rgba(0,0,0,0.12)",
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ────── CATEGORY MARQUEE (Original) ────── */}
      <section style={{ borderTop: "1px solid rgba(0,0,0,0.05)", borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "24px 0", background: "#fff", overflow: "hidden" }}>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...CATEGORIES_WITH_ICONS, ...CATEGORIES_WITH_ICONS].map((cat, i) => (
              <div key={i} style={{ 
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "0 40px", fontSize: 13, fontWeight: 600, color: "#111", opacity: 0.7
              }}>
                <span style={{ color: "#22C55E" }}>{cat.icon}</span>
                {cat.name.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── BENTO FEATURES (Original) ────── */}
      <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.04em", color: "#111", marginBottom: 16 }}>
            Designed for Speed.<br /><span style={{ color: "#22C55E" }}>Built for Quality.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#71717A", maxWidth: 600, margin: "0 auto" }}>
            Semua yang Anda butuhkan untuk menguasai alur kerja AI tanpa kurva belajar yang curam.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 240px)",
          gap: 24
        }} className="bento-grid">
          <div style={{
            gridColumn: "span 2", background: "#f9fafb", borderRadius: 32, padding: 40,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            position: "relative", overflow: "hidden", border: "1px solid #F1F1F1"
          }}>
            <div style={{ position: "absolute", top: 40, right: 40 }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(34, 197, 94, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Layers style={{ width: 40, height: 40, color: "#22C55E" }} />
              </div>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>11+ Specialized Categories</h3>
            <p style={{ color: "#71717A", fontSize: 15, maxWidth: 360 }}>Dari TikTok Affiliate hingga Coding Python Tingkat Lanjut — kami mencakup setiap kebutuhan niche Anda.</p>
          </div>

          <div style={{
            background: "#fff", borderRadius: 32, padding: 32,
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            display: "flex", flexDirection: "column", gap: 16
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap style={{ width: 22, height: 22, color: "#fff" }} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>Instant Access</h3>
            <p style={{ color: "#71717A", fontSize: 14 }}>Pembayaran sekali klik, tanpa waktu tunggu. Akses semuanya seketika.</p>
          </div>

          <div style={{
            background: "#fff", borderRadius: 32, padding: 32,
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            display: "flex", flexDirection: "column", gap: 16
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield style={{ width: 22, height: 22, color: "#22C55E" }} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>Secure Activation</h3>
            <p style={{ color: "#71717A", fontSize: 14 }}>Aktivasi otomatis langsung ke dashboard Anda setelah pembayaran berhasil.</p>
          </div>

          <div style={{
            gridColumn: "span 2", background: "linear-gradient(135deg, #111 0%, #333 100%)", borderRadius: 32, padding: 40,
            display: "flex", alignItems: "center", gap: 40, color: "#fff"
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Updates Forever</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>Satu kali pembayaran memberi Anda akses selamanya ke semua pembaruan prompt di masa depan secara gratis.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[Music, Mail, Rocket, Play].map((IconComp, i) => (
                  <div key={i} style={{ 
                    width: 50, height: 50, background: "rgba(255,255,255,0.1)", 
                    borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" 
                  }}>
                    <IconComp className="w-6 h-6 text-white opacity-40" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── UVP SECTION (Why Choose Veloprome) ────── */}
      <section style={{ padding: "100px 24px", background: "#fcfcfc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.04em", color: "#111", marginBottom: 20 }}>
              Why Choose <span style={{ color: "#10B981" }}>Veloprome?</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="responsive-grid">
            {[
              { 
                title: "Localized Context", 
                desc: "Satu-satunya vault yang dimengerti orang Indonesia. Prompt disesuaikan dengan bahasa dan tren lokal.", 
                icon: <Globe className="w-8 h-8 text-emerald-600" /> 
              },
              { 
                title: "Cost-Effective", 
                desc: "Lebih murah dari kopi saset, tapi memberikan nilai ribuan kali lipat untuk karir dan bisnis Anda.", 
                icon: <Zap className="w-8 h-8 text-emerald-600" /> 
              },
              { 
                title: "True Efficiency", 
                desc: "Potong waktu kerja dari jam-jaman jadi hitungan detik. Fokus pada strategi, biarkan AI yang menulis.", 
                icon: <Clock className="w-8 h-8 text-emerald-600" /> 
              }
            ].map((f, i) => (
              <div key={i} style={{ 
                background: "#fff", padding: 48, borderRadius: 32, 
                border: "1px solid #F1F5F9", transition: "transform 0.3s ease" 
              }} className="hover-lift">
                <div style={{ width: 64, height: 64, background: "#ECFDF5", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{f.title}</h3>
                <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── HOW IT WORKS ────── */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.15em" }}>Quick Start</span>
            <h2 style={{ fontSize: 42, fontWeight: 900, marginTop: 12, letterSpacing: "-0.04em" }}>3 Simple Steps to Results</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { step: "01", title: "Explore", desc: "Masuk ke dashboard dan cari kategori prompt yang Anda butuhkan (TikTok, Copy, dll)." },
              { step: "02", title: "Unlock", desc: "Pilih paket sekali bayar yang sesuai. Akses langsung terbuka dalam hitungan detik." },
              { step: "03", title: "Copy-Paste", desc: "Copy prompt-nya, paste ke ChatGPT/Claude/Midjourney dan lihat hasilnya secara instan." }
            ].map((s, i) => (
              <div key={i} style={{ 
                display: "flex", alignItems: "center", gap: 40, padding: 32, 
                background: "#fff", borderRadius: 32, border: "1px solid #F1F1F1" 
              }} className="step-card">
                <div style={{ fontSize: 42, fontWeight: 900, color: "#E2E8F0" }}>{s.step}</div>
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 16, color: "#64748B" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── WHO IS IT FOR ────── */}
      <section style={{ padding: "100px 24px", background: "#111", color: "#fff", borderRadius: "80px 80px 0 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 20 }}>Designed for the <span style={{ color: "#10B981" }}>Modern Pro.</span></h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>Apapun peran Anda, Veloprome punya solusinya.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="responsive-grid">
            {[
              { role: "TikTok Affiliate", task: "Butuh script viral dan hook yang memancing klik setiap hari untuk produk trending.", icon: <Music /> },
              { role: "Copywriter & Ad Specialist", task: "Butuh copy iklan FB/IG Ads yang menjual tinggi dengan berbagai framework psikologi.", icon: <Megaphone /> },
              { role: "Personal Branding Pro", task: "Ingin membangun otoritas di LinkedIn atau Instagram dengan konten storytelling yang kuat.", icon: <User /> },
              { role: "Digital Marketer", task: "Membutuhkan riset kompetitor, ide produk launch, dan funneling email marketing yang efektif.", icon: <Rocket /> },
              { role: "Content Creator / YouTuber", task: "Butuh ide konten 30 hari tanpa henti dan script video yang retensinya tinggi.", icon: <Play /> },
              { role: "AI Artist / Designer", task: "Membutuhkan prompt teknis untuk aset visual tingkat pro dan efisiensi pengerjaan desain.", icon: <ImageIcon /> }
            ].map((item, i) => (
              <div key={i} style={{ padding: 40, background: "rgba(255,255,255,0.03)", borderRadius: 32, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ color: "#10B981", marginBottom: 24 }}>{item.icon}</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>{item.role}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>{item.task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── SAMPLE PROMPTS (Premium Style) ────── */}
      <section style={{ padding: "120px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.15em" }}>The Vault Preview</span>
            <h2 style={{ fontSize: 42, fontWeight: 900, marginTop: 12, letterSpacing: "-0.04em" }}>Sneak Peek Inside</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="responsive-grid">
            {SAMPLE_PROMPTS.map((p, i) => (
              <PromptCard 
                key={i}
                id={i}
                title={p.title}
                category={p.category}
                content={p.content}
                isLocked={p.isLocked}
              />
            ))}
          </div>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 72 }}>
            {STATS.map((s,i) => (
                <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#1F2937" }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8", textTransform: "uppercase", fontWeight: 700, marginTop: 4 }}>{s.label}</div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── TESTIMONIALS ────── */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, alignItems: "center" }} className="responsive-grid">
            <div>
              <h2 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.05em", marginBottom: 24 }}>
                Wall of <br /><span style={{ color: "#10B981" }}>Social Proof.</span>
              </h2>
              <p style={{ fontSize: 18, color: "#64748B", fontWeight: 500 }}>
                Bergabunglah dengan ribuan kreator yang sudah meningkatkan produktivitas mereka ke level maksimal.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ padding: 32, borderRadius: 24, background: "#fff", border: "1px solid #F1F5F9", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
                   <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                      {[1,2,3,4,5].map(s => <Star key={s} style={{ width: 14, height: 14, fill: "#F59E0B", color: "#F59E0B" }} />)}
                   </div>
                   <p style={{ fontSize: 16, color: "#334155", fontWeight: 600, lineHeight: 1.6, marginBottom: 20 }}>&quot;{t.text}&quot;</p>
                   <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>{t.author[0]}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>{t.author}</div>
                        <div style={{ fontSize: 12, color: "#94A3B8" }}>{t.role}</div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────── FAQ SECTION ────── */}
      <section style={{ padding: "100px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, textAlign: "center", marginBottom: 60, letterSpacing: "-0.04em" }}>Frequently Asked <span style={{ color: "#10B981" }}>Questions</span></h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ padding: 32, borderRadius: 24, background: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111", marginBottom: 12 }}>{faq.q}</h3>
                <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── FINAL CTA ────── */}
      <section style={{ padding: "120px 24px" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto", padding: "80px 48px",
          background: "linear-gradient(135deg, #111 0%, #065F46 100%)", 
          borderRadius: 60, textAlign: "center",
          position: "relative", overflow: "hidden", color: "#fff",
          boxShadow: "0 40px 100px -20px rgba(16,185,129,0.3)"
        }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, marginBottom: 24, zIndex: 1, letterSpacing: "-0.05em" }}>
            Ready to Unlock <br />Your AI Potential?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 500, margin: "0 auto 40px", fontWeight: 500 }}>
            Dapatkan akses penuh ke 1,000+ premium prompts hanya dengan IDR 8.000 sekali bayar.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", zIndex: 1 }}>
             {userId ? (
               <Link href="/dashboard" style={{ textDecoration: "none" }}>
                 <button style={{
                   background: "#fff", color: "#111",
                   fontSize: 18, fontWeight: 800,
                   padding: "20px 56px", borderRadius: 100, border: "none", cursor: "pointer",
                 }} className="hover-scale">
                   Go to Dashboard <ArrowRight style={{ width: 18, height: 18 }} />
                 </button>
               </Link>
             ) : (
               <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                 <button style={{
                   background: "#fff", color: "#111",
                   fontSize: 18, fontWeight: 800,
                   padding: "20px 56px", borderRadius: 100, border: "none", cursor: "pointer",
                 }} className="hover-scale">
                   Get Unlimited Access — IDR 8k
                 </button>
               </SignInButton>
             )}
          </div>
          
          <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32, fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Check style={{ width: 16, height: 16 }} /> One-time Payment</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Check style={{ width: 16, height: 16 }} /> Lifetime Access</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Check style={{ width: 16, height: 16 }} /> Secure Activation</span>
          </div>
        </div>
      </section>

      {/* ────── FOOTER ────── */}
      <footer style={{
        padding: "80px 24px 40px", borderTop: "1px solid #F1F5F9",
        textAlign: "center", background: "#fff"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 32 }}>
          <img src="/LOGO.png" alt="Veloprome" style={{ height: 28, width: "auto" }} />
          <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: "0.1em", color: "#111", background: "linear-gradient(90deg, #064e3b, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>VELOPROME</span>
        </div>
        <p style={{ color: "#94A3B8", fontSize: 14, fontWeight: 500 }}>
          © 2026 Veloprome · Engineered for Indonesian Creators.
        </p>
      </footer>

      <style>{`
        .hover-scale { transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-scale:hover { transform: scale(1.05); }
        .hover-lift:hover { transform: translateY(-8px); border-color: #10B981 !important; box-shadow: 0 20px 40px rgba(16,185,129,0.05); }
        
        .marquee-wrapper { width: 100%; overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-flex; animation: marquee 40s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        @media (max-width: 968px) {
          .hero-container { grid-template-columns: 1fr !important; text-align: center; }
          .responsive-grid { grid-template-columns: 1fr !important; }
          .step-card { flex-direction: column !important; text-align: center; gap: 16px !important; }
          .bento-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          h1 { fontSize: 48px !important; }
          h2 { fontSize: 36px !important; }
        }
      `}</style>
    </div>
  );
}