"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface PromptCardProps {
  id: number;
  title: string;
  category: string;
  content: string;
}

const getGradientForCategory = (category: string) => {
  const hash = Array.from(category).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)",
    "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
    "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
    "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
    "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)",
    "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
  ];
  return gradients[hash % gradients.length];
};

export function PromptCard({ id, title, category, content }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const preview = content.length > 120 ? content.slice(0, 120) + "…" : content;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        border: `1px solid ${hovered ? "#E4E4E7" : "#EBEBEB"}`,
        borderRadius: 20,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: hovered
          ? "0 12px 30px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.03)"
          : "0 4px 12px rgba(0,0,0,0.02)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        height: "100%",
        boxSizing: "border-box",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}
    >
      {/* Visual Thumbnail */}
      <div style={{
        height: 140,
        borderRadius: 12,
        background: getGradientForCategory(category),
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Decorative blur/blobs */}
        <div style={{
          position: "absolute",
          width: 80, height: 80,
          background: "rgba(255,255,255,0.4)",
          filter: "blur(20px)",
          borderRadius: "50%",
          top: -20, right: -20
        }} />
        <div style={{
          position: "absolute",
          width: 100, height: 100,
          background: "rgba(0,0,0,0.1)",
          filter: "blur(30px)",
          borderRadius: "50%",
          bottom: -30, left: -20
        }} />

        {/* Floating Category Badge */}
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "#A7F3D0",
          color: "#065F46",
          padding: "5px 12px",
          borderRadius: 100,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}>
          {category.length > 20 ? category.slice(0, 20) + "…" : category}
        </div>
        
        {/* Placeholder title inside thumbnail to look like Glider's graphic */}
        <h3 style={{
           color: "rgba(255,255,255,0.95)",
           fontSize: 22,
           fontWeight: 800,
           textAlign: "center",
           letterSpacing: "-0.04em",
           padding: "0 24px",
           textShadow: "0 2px 10px rgba(0,0,0,0.15)",
           zIndex: 1,
           lineHeight: 1.1,
        }}>
           {category}
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, flexGrow: 1, padding: "0 4px" }}>
        <h3 style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.25,
          color: "#111",
          letterSpacing: "-0.04em",
          margin: 0,
        }}>
          {title.replace(/…$/, "").replace(/\.\.\.$/, "")}
        </h3>
        
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            color: "#71717A",
            flexGrow: 1,
            fontWeight: 400,
          }}
        >
          {preview}
        </div>
      </div>

      <div style={{ marginTop: "auto", padding: "0 4px" }}>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            padding: "8px 20px",
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 600,
            background: copied ? "#A7F3D0" : "#fff",
            color: copied ? "#065F46" : "#111",
            border: copied ? "1px solid #A7F3D0" : "1px solid #E4E4E7",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: copied ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              (e.currentTarget as HTMLButtonElement).style.background = "#F4F4F5";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#D4D4D8";
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#E4E4E7";
            }
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}