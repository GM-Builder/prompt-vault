"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutGrid, Menu, X, Settings,
  HelpCircle, Search, Music, Megaphone, User,
  Headphones, Calendar, BarChart2, Play,
  Mail, BookOpen, Rocket, Image,
} from "lucide-react";

import { DashboardContext } from "./context";
import { UserButton, useUser } from "@clerk/nextjs";

const CATEGORIES = [
  { key: "Image Generation", Icon: Image, short: "Image Gen" },
  { key: "TikTok Affiliate Viral (Hooks & Scripts)", Icon: Music, short: "TikTok Affiliate" },
  { key: "High-Converting Copywriting (FB/IG Ads)", Icon: Megaphone, short: "Copywriting" },
  { key: "Personal Branding Expert (LinkedIn/IG)", Icon: User, short: "Personal Branding" },
  { key: "Customer Service & Crisis Management", Icon: Headphones, short: "Customer Service" },
  { key: "Daily Content Ideas (30-Day Calendar Niche-based)", Icon: Calendar, short: "Content Ideas" },
  { key: "Market Research & Competitor Analysis", Icon: BarChart2, short: "Market Research" },
  { key: "YouTube / Long Video Scripting", Icon: Play, short: "YouTube Scripts" },
  { key: "Email Marketing & FOMO Newsletters", Icon: Mail, short: "Email Marketing" },
  { key: "Storytelling & Emotional Selling", Icon: BookOpen, short: "Storytelling" },
  { key: "Product Launch Strategy (H-7 to Launch Day)", Icon: Rocket, short: "Product Launch" },
];

function NavItem({
  icon, label, isActive, onClick,
}: {
  icon: ReactNode; label: string; isActive: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "10px 14px",
        borderRadius: 8,
        fontSize: 15,
        fontFamily: "'Geist', system-ui, sans-serif",
        fontWeight: isActive ? 600 : 500,
        color: isActive ? "#111" : hovered ? "#111" : "#71717A",
        background: hovered && !isActive ? "rgba(0,0,0,0.04)" : "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.12s ease",
        letterSpacing: "-0.01em",
      }}
    >
      <span style={{
        width: 18, height: 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        color: isActive ? "#111" : hovered ? "#52525B" : "#A1A1AA",
        transition: "color 0.12s ease",
      }}>
        {icon}
      </span>
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>
      {isActive && (
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: "#10B981", flexShrink: 0,
        }} />
      )}
    </button>
  );
}

function SidebarContent({
  activeCategory,
  setActiveCategory,
  setSidebarOpen,
}: {
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  setSidebarOpen: (v: boolean) => void;
}) {
  const { user } = useUser();
  const fallbackEmail = user?.primaryEmailAddress?.emailAddress || "user@example.com";
  const displayName = user?.fullName || fallbackEmail.split('@')[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Nav */}
      <nav style={{
        flex: 1,
        overflowY: "auto",
        padding: "14px 8px 10px", // Exactly as requested
        scrollbarWidth: "thin",
        scrollbarColor: "#E5E7EB transparent",
      }}>
        <p style={{
          fontSize: 12, fontWeight: 600,
          fontFamily: "'Geist', system-ui, sans-serif",
          color: "#A1A1AA",
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "4px 14px 10px", // Exactly as requested
          margin: 0
        }}>
          Browse
        </p>

        <NavItem
          icon={<LayoutGrid style={{ width: 13, height: 13 }} />}
          label="All Prompts"
          isActive={activeCategory === "All"}
          onClick={() => { setActiveCategory("All"); setSidebarOpen(false); }}
        />

        <p style={{
          fontSize: 12, fontWeight: 600,
          fontFamily: "'Geist', system-ui, sans-serif",
          color: "#A1A1AA",
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "20px 14px 10px", // Exactly as requested
          margin: 0
        }}>
          Categories
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CATEGORIES.map((cat) => (
            <NavItem
              key={cat.key}
              icon={<cat.Icon style={{ width: 13, height: 13 }} />}
              label={cat.short}
              isActive={activeCategory === cat.key}
              onClick={() => { setActiveCategory(cat.key); setSidebarOpen(false); }}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div style={{
        padding: "8px",
        borderTop: "1px solid #EBEBEB",
        display: "flex", flexDirection: "column", gap: 1,
      }}>
        <NavItem icon={<Settings style={{ width: 13, height: 13 }} />} label="Settings" isActive={false} onClick={() => { }} />
        <NavItem icon={<HelpCircle style={{ width: 13, height: 13 }} />} label="Help Center" isActive={false} onClick={() => { }} />

        <div style={{
          display: "flex", alignItems: "center", gap: 9,
          padding: "10px 10px",
          marginTop: 4,
          borderRadius: 8,
          background: "#F7F7F8",
          border: "1px solid #EBEBEB",
        }}>
          <div style={{ flexShrink: 0 }}>
            <UserButton appearance={{
              elements: { userButtonAvatarBox: "w-7 h-7" }
            }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontSize: 12, fontWeight: 500,
              fontFamily: "'Geist', system-ui, sans-serif",
              color: "#111",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              letterSpacing: "-0.02em",
              margin: 0
            }}>
              {displayName}
            </p>
            <p style={{
              fontSize: 10, color: "#A1A1AA",
              fontFamily: "'Geist', system-ui, sans-serif",
              fontWeight: 400,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              margin: 0
            }}>
              {fallbackEmail}
            </p>
          </div>
          {(user?.publicMetadata?.isPaid === true) && (
            <span style={{
              fontSize: 10, fontWeight: 600,
              fontFamily: "'Geist', system-ui, sans-serif",
              color: "#16A34A", background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              padding: "2px 7px", borderRadius: 5,
              flexShrink: 0,
              letterSpacing: "-0.01em",
            }}>
              Pro
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/prompts?limit=1")
      .then((r) => r.json())
      .then((d) => setTotalCount(d.total ?? null));
  }, []);

  return (
    <DashboardContext.Provider value={{ activeCategory, searchQuery }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Lock to viewport height
        overflow: "hidden", // Disable global scroll
        background: "#fff",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}>

        {/* ────── STICKY TOPBAR ────── */}
        <header className="dashboard-header" style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "#fff",
          borderBottom: "1px solid #EBEBEB",
          height: 108, // Exactly as requested
          display: "flex",
          alignItems: "center",
          paddingLeft: 0,
          paddingRight: 20,
          flexShrink: 0,
        }}>

          {/* Logo zone — same width as sidebar so content aligns */}
          <div style={{
            width: 280, // Exactly as requested
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 16px",
            borderRight: "1px solid #EBEBEB",
            height: "100%",
          }}
            className="sidebar-logo-zone"
          >
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
              <img
                src="/LOGO.png"
                alt="Veloprome"
                style={{
                  height: "38px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: "'Geist', system-ui, sans-serif",
                fontWeight: 900,
                fontSize: "18px",
                letterSpacing: "0.12em",
                lineHeight: 1,
                flexShrink: 0,
                background: "linear-gradient(90deg, #064e3b, #059669, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>VELOPROME</span>
            </Link>
          </div>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 400, marginLeft: 16 }} className="search-container">
            <Search style={{
              position: "absolute", left: 12, top: "50%",
              transform: "translateY(-50%)",
              width: 14, height: 14, color: "#94A3B8",
              pointerEvents: "none",
            }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts…"
              style={{
                width: "100%",
                background: "#F4F4F5",
                border: "1px solid transparent",
                borderRadius: 100,
                padding: "8px 16px 8px 40px",
                fontSize: 13,
                fontFamily: "'Geist', system-ui, sans-serif",
                fontWeight: 600,
                color: "#111",
                outline: "none",
                transition: "all 0.15s ease",
                letterSpacing: "-0.01em",
              }}
              onFocus={(e) => {
                e.target.style.background = "#fff";
                e.target.style.borderColor = "#10B981";
                e.target.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.background = "#F4F4F5";
                e.target.style.borderColor = "transparent";
                e.target.style.boxShadow = "none";
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#94A3B8", padding: 0, lineHeight: 0,
                }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>

          <div style={{ flex: 1 }} />

          {/* Right side items */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 800,
              padding: "6px 14px", borderRadius: 100,
              color: "#059669", background: "#F4F4F5",
              border: "1px solid #E4E4E7",
            }} className="desktop-stat">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
              {totalCount ? totalCount.toLocaleString() : "1,000+"} prompts
            </div>

            <Link href="/" style={{ textDecoration: "none" }}>
              <button style={{
                background: "transparent", color: "#71717A",
                fontSize: 12, fontWeight: 500,
                padding: "8px 16px", borderRadius: 8,
                border: "1px solid #E4E4E7", cursor: "pointer",
                transition: "all 0.2s"
              }} className="back-btn">
                ← Home
              </button>
            </Link>

            <button
              onClick={() => setSidebarOpen(true)}
              className="mobile-menu-btn"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#71717A", padding: "0 12px",
              }}
            >
              <Menu style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </header>

        {/* ────── BODY ────── */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Desktop Sidebar */}
          <aside
            className="desktop-sidebar"
            style={{
              width: 280, // Exactly as requested
              flexShrink: 0,
              background: "#fff",
              borderRight: "1px solid #EBEBEB",
              height: "100%", // Take full height of parent
              overflow: "hidden", // Disable scrolling for entire sidebar
            }}
          >
            <SidebarContent
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setSidebarOpen={setSidebarOpen}
            />
          </aside>

          {/* Mobile Overlay Sidebar */}
          {sidebarOpen && (
            <div
              style={{
                position: "fixed", inset: 0, zIndex: 50,
                background: "rgba(0,0,0,0.28)",
              }}
              onClick={() => setSidebarOpen(false)}
            >
              <aside
                style={{
                  position: "absolute", left: 0, top: 0,
                  height: "100%", width: 300,
                  background: "#fff",
                  boxShadow: "8px 0 32px rgba(0,0,0,0.08)",
                  animation: "slideIn 0.18s ease",
                  overflow: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: "24px 20px", borderBottom: "1px solid #EBEBEB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <img src="/LOGO.png" alt="Logo" style={{ height: 24 }} />
                  <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none" }}><X /></button>
                </div>
                <SidebarContent
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  setSidebarOpen={setSidebarOpen}
                />
              </aside>
            </div>
          )}

          <main className="main-content" style={{
            flex: 1,
            background: "#FAFAFA",
            overflowY: "auto",
            padding: "24px",
          }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              {children}
            </div>
          </main>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(-100%) } to { transform: translateX(0) } }
        @keyframes fadein-up {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein-up { animation: fadein-up 0.22s ease both; }
        .skeleton {
          background: #ECECEC;
          animation: pulse 1.8s ease-in-out infinite;
          border-radius: 5px;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .sidebar-logo-zone { display: none !important; }
          .dashboard-header { 
            height: 64px !important; // Reduced from 72 for sleeker mobile look
            padding: 0 12px !important; 
          }
          .main-content { padding: 16px !important; }
          .search-container { 
            maxWidth: none !important; 
            margin-left: 8px !important;
          }
          .search-container input {
            font-size: 14px !important;
            padding-top: 6px !important;
            padding-bottom: 6px !important;
          }
          .desktop-stat { display: none !important; }
          .back-btn { font-size: 11px !important; padding: 6px 12px !important; }
          .prompt-card { padding: 10px !important; border-radius: 20px !important; }
          .prompt-card-thumbnail { height: 120px !important; border-radius: 16px !important; }
          .prompt-card-content { font-size: 12px !important; line-height: 1.4 !important; }
        }
        @media (max-width: 620px) {
          .main-content { padding: 16px 24px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </DashboardContext.Provider>
  );
}