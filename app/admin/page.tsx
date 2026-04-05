"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, KeyRound, RefreshCw, LogIn, Eye, EyeOff, Check, Video, ExternalLink, Save, BarChart3, ArrowDownToLine, X, MessageSquare } from "lucide-react";

export default function AdminPage() {
  const [adminSecret, setAdminSecret] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [activeTab, setActiveTab] = useState<"password" | "campaign" | "payouts">("password");

  // --- Password State ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passStatus, setPassStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [passMsg, setPassMsg] = useState("");

  // --- Campaign State ---
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  // --- Payouts State ---
  const [payouts, setPayouts] = useState<any[]>([]);
  const [isLoadingPayouts, setIsLoadingPayouts] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [adminNoteMap, setAdminNoteMap] = useState<Record<string, string>>({});

  // --- Login as Admin ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!adminSecret.trim()) return;

    // Fetch current password to verify secret is correct
    const res = await fetch("/api/admin/password", {
      headers: { "x-admin-secret": adminSecret },
    });

    if (res.ok) {
      const data = await res.json();
      setCurrentPassword(data.password);
      setIsLoggedIn(true);
      if (activeTab === "campaign") fetchSubmissions();
    } else {
      setLoginError("Admin Secret salah. Coba lagi.");
    }
  };

  // --- Update Password ---
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.trim().length < 4) {
      setPassMsg("Password minimal 4 karakter.");
      setPassStatus("error");
      return;
    }
    setPassStatus("loading");
    setPassMsg("");

    const res = await fetch("/api/admin/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminSecret,
      },
      body: JSON.stringify({ password: newPassword }),
    });
    const data = await res.json();

    if (res.ok) {
      setCurrentPassword(data.password);
      setNewPassword("");
      setPassStatus("success");
      setPassMsg(`Password berhasil diubah ke: ${data.password}`);
      setTimeout(() => setPassStatus("idle"), 3000);
    } else {
      setPassStatus("error");
      setPassMsg(data.error || "Gagal mengubah password.");
    }
  };

  // --- Fetch Submissions ---
  const fetchSubmissions = async () => {
    setIsLoadingCampaign(true);
    try {
      const res = await fetch("/api/admin/campaign", {
        headers: { "x-admin-secret": adminSecret },
      });
      if (res.ok) {
        const data = await res.json();
        // Initialize local views state for inputs
        const subsWithLocalState = data.submissions.map((sub: any) => ({
            ...sub,
            localViews: sub.views,
            localStatus: sub.status
        }));
        setSubmissions(subsWithLocalState);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoadingCampaign(false);
  };

  useEffect(() => {
    if (isLoggedIn && activeTab === "campaign" && submissions.length === 0) {
        fetchSubmissions();
    }
    if (isLoggedIn && activeTab === "payouts" && payouts.length === 0) {
        fetchPayouts();
    }
  }, [activeTab, isLoggedIn]);

  // --- Update Submission ---
  const handleUpdateSubmission = async (id: string, views: number, status: string) => {
    setSavingId(id);
    try {
        const res = await fetch("/api/admin/campaign", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-admin-secret": adminSecret,
            },
            body: JSON.stringify({ id, views, status }),
        });
        
        if (res.ok) {
            // Success flash purely visual, data is updated in state directly below via inputs
            setSubmissions(prev => prev.map(s => 
                s.id === id ? { ...s, views, status } : s
            ));
        } else {
            alert("Gagal update data");
        }
    } catch (e) {
        console.error(e);
        alert("Gagal update data");
    }
    setSavingId(null);
  };

  // --- Fetch Payouts ---
  const fetchPayouts = async () => {
    setIsLoadingPayouts(true);
    try {
      const res = await fetch("/api/admin/withdrawals", {
        headers: { "x-admin-secret": adminSecret },
      });
      if (res.ok) {
        const data = await res.json();
        setPayouts(data.withdrawals || []);
        const noteMap: Record<string, string> = {};
        data.withdrawals?.forEach((w: any) => { noteMap[w.id] = w.adminNote || ""; });
        setAdminNoteMap(noteMap);
      }
    } catch (e) { console.error(e); }
    setIsLoadingPayouts(false);
  };

  // --- Process Payout ---
  const handleProcessPayout = async (id: string, status: "PAID" | "REJECTED") => {
    setProcessingId(id);
    try {
      const res = await fetch("/api/admin/withdrawals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret },
        body: JSON.stringify({ id, status, adminNote: adminNoteMap[id] || null }),
      });
      if (res.ok) {
        setPayouts(prev => prev.map(p => p.id === id ? { ...p, status, adminNote: adminNoteMap[id] } : p));
      } else {
        alert("Gagal memproses permintaan");
      }
    } catch (e) { alert("Terjadi kesalahan"); }
    setProcessingId(null);
  };

  // --- UI Styles ---
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#0A0A0F",
    display: "flex",
    alignItems: isLoggedIn ? "flex-start" : "center",
    justifyContent: "center",
    padding: isLoggedIn ? "40px 20px" : 20,
    fontFamily: "'Geist', system-ui, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background: "#141418", border: "1px solid #2A2A35", borderRadius: 24,
    padding: "48px 40px", maxWidth: isLoggedIn ? 1000 : 480, width: "100%",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", borderRadius: 12, border: "1px solid #2A2A35",
    background: "#1C1C24", color: "#F4F4F5", fontSize: 15, outline: "none", boxSizing: "border-box",
  };

  const btnStyle = (variant: "primary" | "ghost"): React.CSSProperties => ({
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    width: "100%", padding: "14px", borderRadius: 100,
    background: variant === "primary" ? "#7C3AED" : "#1C1C24",
    color: "#fff", fontSize: 15, fontWeight: 600,
    border: variant === "primary" ? "none" : "1px solid #2A2A35",
    cursor: "pointer", transition: "all 0.2s",
  });

  // ---- LOGIN SCREEN ----
  if (!isLoggedIn) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <ShieldCheck style={{ width: 26, height: 26, color: "#fff" }} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#F4F4F5", marginBottom: 8 }}>
              Admin Platform
            </h1>
            <p style={{ color: "#71717A", fontSize: 14 }}>Veloprome — Internal Access Only</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <input
                type={showSecret ? "text" : "password"}
                placeholder="Masukkan Admin Secret..."
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.06em" }}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#71717A" }}
              >
                {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {loginError && <div style={{ color: "#F87171", fontSize: 13, textAlign: "center" }}>{loginError}</div>}
            <button type="submit" style={btnStyle("primary")}><LogIn size={16} /> Masuk ke Admin Panel</button>
          </form>
        </div>
      </div>
    );
  }

  // ---- DASHBOARD SCREEN ----
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40, borderBottom: "1px solid #2A2A35", paddingBottom: 16, overflowX: "auto" }}>
            <button 
                onClick={() => setActiveTab("password")}
                style={{ 
                    background: "none", border: "none", color: activeTab === "password" ? "#F4F4F5" : "#71717A", 
                    fontSize: 16, fontWeight: 700, padding: "8px 16px", cursor: "pointer",
                    borderBottom: activeTab === "password" ? "2px solid #7C3AED" : "2px solid transparent",
                    display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", whiteSpace: "nowrap"
                }}
            >
                <KeyRound size={18} /> Password Aktivasi
            </button>
            <button 
                onClick={() => setActiveTab("campaign")}
                style={{ 
                    background: "none", border: "none", color: activeTab === "campaign" ? "#F4F4F5" : "#71717A", 
                    fontSize: 16, fontWeight: 700, padding: "8px 16px", cursor: "pointer",
                    borderBottom: activeTab === "campaign" ? "2px solid #10B981" : "2px solid transparent",
                    display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", whiteSpace: "nowrap"
                }}
            >
                <Video size={18} /> Verifikasi Campaign
            </button>
            <button 
                onClick={() => setActiveTab("payouts")}
                style={{ 
                    background: "none", border: "none", color: activeTab === "payouts" ? "#F4F4F5" : "#71717A", 
                    fontSize: 16, fontWeight: 700, padding: "8px 16px", cursor: "pointer",
                    borderBottom: activeTab === "payouts" ? "2px solid #F59E0B" : "2px solid transparent",
                    display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", whiteSpace: "nowrap"
                }}
            >
                <ArrowDownToLine size={18} /> Pencairan Komisi
                {payouts.filter(p => p.status === "PENDING").length > 0 && (
                  <span style={{ background: "#F59E0B", color: "#000", fontSize: 11, fontWeight: 800, padding: "2px 7px", borderRadius: 20 }}>
                    {payouts.filter(p => p.status === "PENDING").length}
                  </span>
                )}
            </button>
        </div>

        {/* Tab 1: Password Manager */}
        {activeTab === "password" && (
            <div style={{ maxWidth: 480 }}>
                <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#F4F4F5", marginBottom: 8 }}>Kelola Password</h1>
                <p style={{ color: "#71717A", fontSize: 13, margin: 0 }}>
                    Password ini harus dimasukkan user di halaman <code style={{ background: "#1C1C24", padding: "2px 6px", borderRadius: 4, color: "#A78BFA" }}>/dashboard-success</code>.
                </p>
                </div>

                <div style={{ background: "#1C1C24", border: "1px solid #2A2A35", borderRadius: 12, padding: "16px 20px", marginBottom: 28 }}>
                <div style={{ fontSize: 11, color: "#52525B", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>Password Aktif Saat Ini</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#A78BFA", fontFamily: "monospace", letterSpacing: "0.1em" }}>{currentPassword}</div>
                </div>

                <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontSize: 13, color: "#A1A1AA", marginBottom: 4 }}>Otomatis dikonversi ke HURUF KAPITAL.</div>
                <input
                    type="text" placeholder="Contoh: VAULT2025NEW"
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value.toUpperCase())}
                    style={{ ...inputStyle, textTransform: "uppercase", fontFamily: "monospace" }} disabled={passStatus === "loading"}
                />

                {passMsg && (
                    <div style={{ fontSize: 13, fontWeight: 500, color: passStatus === "error" ? "#F87171" : "#34D399", textAlign: "center" }}>
                    {passStatus === "success" && <Check size={14} style={{ display: "inline", marginRight: 4 }} />} {passMsg}
                    </div>
                )}

                <button type="submit" disabled={passStatus === "loading" || !newPassword.trim()} style={{ ...btnStyle("primary"), opacity: !newPassword.trim() ? 0.6 : 1 }}>
                    {passStatus === "loading" ? <><RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} /> Menyimpan...</> : <><Check size={15} /> Simpan Password Baru</>}
                </button>
                </form>
            </div>
        )}

        {/* Tab 2: Campaign Verification */}
        {activeTab === "campaign" && (
            <div>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <div>
                        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#F4F4F5", marginBottom: 8 }}>Verifikasi Video Creator Quest</h1>
                        <p style={{ color: "#71717A", fontSize: 13, margin: 0 }}>Cek link video peserta secara manual dan masukkan jumlah views.</p>
                    </div>
                    <button onClick={fetchSubmissions} disabled={isLoadingCampaign} style={{ background: "#1C1C24", border: "1px solid #2A2A35", color: "#A1A1AA", padding: "8px 16px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                         {isLoadingCampaign ? <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> : <RefreshCw size={14} />} Refresh Data
                    </button>
                 </div>

                 {isLoadingCampaign && submissions.length === 0 ? (
                     <div style={{ textAlign: "center", padding: 60, color: "#71717A" }}>Memuat data pendaftar...</div>
                 ) : submissions.length === 0 ? (
                     <div style={{ textAlign: "center", padding: 60, color: "#71717A", background: "#1C1C24", borderRadius: 16 }}>Belum ada video yang dikirim.</div>
                 ) : (
                     <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                         {submissions.map((sub) => (
                             <div key={sub.id} style={{ 
                                 background: "#18181B", border: "1px solid #2A2A35", borderRadius: 16, 
                                 padding: 24, display: "flex", flexDirection: typeof window !== "undefined" && window.innerWidth < 768 ? "column" : "row", gap: 24, alignItems: "flex-start",
                                 position: "relative", overflow: "hidden"
                             }}>
                                 {/* Status border left */}
                                 <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: sub.localStatus === 'APPROVED' ? '#10B981' : sub.localStatus === 'REJECTED' ? '#EF4444' : '#EAB308' }} />

                                 <div style={{ flex: 1 }}>
                                     <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                         <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{sub.user?.name || "Unknown User"}</span>
                                         <span style={{ fontSize: 12, color: "#71717A", background: "#27272A", padding: "2px 8px", borderRadius: 100 }}>{sub.user?.email}</span>
                                     </div>
                                     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                         <span style={{ fontSize: 11, fontWeight: 800, color: "#A1A1AA", background: "#27272A", padding: "4px 10px", borderRadius: 6, textTransform: "uppercase" }}>{sub.platform}</span>
                                         <span style={{ fontSize: 13, color: "#A1A1AA" }}>@ {sub.username}</span>
                                     </div>
                                     
                                     <a href={sub.videoUrl} target="_blank" rel="noreferrer" style={{ 
                                         display: "inline-flex", alignItems: "center", gap: 8, color: "#60A5FA", textDecoration: "none", fontSize: 14, fontWeight: 600, background: "rgba(96, 165, 250, 0.1)", padding: "10px 16px", borderRadius: 100 
                                     }}>
                                         Buka Video <ExternalLink size={14} />
                                     </a>
                                 </div>

                                 <div style={{ display: "flex", flexDirection: "column", gap: 12, width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : 280, background: "#1C1C24", padding: 16, borderRadius: 12, border: "1px solid #2A2A35" }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: "#A1A1AA", marginBottom: 6, fontWeight: 700 }}>VERIFIKASI VIEWS</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <BarChart3 size={16} color="#A1A1AA" />
                                            <input 
                                                type="number"
                                                value={sub.localViews}
                                                onChange={(e) => setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, localViews: parseInt(e.target.value) || 0 } : s))}
                                                style={{ ...inputStyle, padding: "8px 12px", fontSize: 13 }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: 11, color: "#A1A1AA", marginBottom: 6, fontWeight: 700 }}>UPDATE STATUS</div>
                                        <select 
                                            value={sub.localStatus}
                                            onChange={(e) => setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, localStatus: e.target.value } : s))}
                                            style={{ ...inputStyle, padding: "8px 12px", fontSize: 13, appearance: "none" }}
                                        >
                                            <option value="PENDING">Pending (Tinjauan)</option>
                                            <option value="APPROVED">Approved (Sah)</option>
                                            <option value="REJECTED">Rejected (Ditolak)</option>
                                        </select>
                                    </div>

                                    <button 
                                        onClick={() => handleUpdateSubmission(sub.id, sub.localViews, sub.localStatus)}
                                        disabled={savingId === sub.id}
                                        style={{ ...btnStyle("primary"), padding: "10px", fontSize: 13, background: savingId === sub.id ? "#5B21B6" : (sub.views !== sub.localViews || sub.status !== sub.localStatus ? "#10B981" : "#3F3F46") }}
                                    >
                                        {savingId === sub.id ? <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={14} />} 
                                        {savingId === sub.id ? "Menyimpan..." : (sub.views !== sub.localViews || sub.status !== sub.localStatus ? "Simpan Perubahan" : "Ter-Sinkronisasi")}
                                    </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                 )}
            </div>
        )}

        {/* Tab 3: Payout Requests */}
        {activeTab === "payouts" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: "#F4F4F5", marginBottom: 8 }}>Pencairan Komisi Referral</h1>
                <p style={{ color: "#71717A", fontSize: 13, margin: 0 }}>Proses permintaan pencairan dari pengguna. Transfer manual lewat M-Banking lalu klik Tandai Lunas.</p>
              </div>
              <button onClick={fetchPayouts} disabled={isLoadingPayouts} style={{ background: "#1C1C24", border: "1px solid #2A2A35", color: "#A1A1AA", padding: "8px 16px", borderRadius: 100, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                {isLoadingPayouts ? <RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> : <RefreshCw size={14} />} Refresh
              </button>
            </div>

            {isLoadingPayouts && payouts.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, color: "#71717A" }}>Memuat data...</div>
            ) : payouts.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, color: "#71717A", background: "#1C1C24", borderRadius: 16 }}>Belum ada permintaan pencairan.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {payouts.map((payout) => {
                  const statusColor = payout.status === "PAID" ? "#10B981" : payout.status === "REJECTED" ? "#EF4444" : "#F59E0B";
                  const statusLabel = payout.status === "PAID" ? "Lunas" : payout.status === "REJECTED" ? "Ditolak" : "Pending";
                  return (
                    <div key={payout.id} style={{ background: "#18181B", border: `1px solid ${statusColor}44`, borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: statusColor }} />

                      {/* Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>{payout.user?.name || "Unknown"}</span>
                          <span style={{ marginLeft: 10, fontSize: 12, color: "#71717A", background: "#27272A", padding: "2px 8px", borderRadius: 100 }}>{payout.user?.email}</span>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: statusColor, background: `${statusColor}22`, padding: "4px 10px", borderRadius: 20, border: `1px solid ${statusColor}44` }}>
                          {statusLabel}
                        </span>
                      </div>

                      {/* Bank Info */}
                      <div style={{ background: "#1C1C24", borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 20 }}>
                        <div>
                          <div style={{ fontSize: 10, color: "#71717A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Jumlah</div>
                          <div style={{ fontSize: 20, fontWeight: 900, color: "#F59E0B" }}>Rp {payout.amount.toLocaleString("id-ID")}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#71717A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Bank / E-Wallet</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#F4F4F5" }}>{payout.bankName}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#71717A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>No. Rekening</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#F4F4F5", fontFamily: "monospace", letterSpacing: "0.06em" }}>{payout.accountNumber}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#71717A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Atas Nama</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#F4F4F5" }}>{payout.accountName}</div>
                        </div>
                      </div>

                      {/* Admin Note + Actions (only for PENDING) */}
                      {payout.status === "PENDING" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <MessageSquare size={13} color="#71717A" />
                            <input
                              type="text"
                              placeholder="Catatan admin (opsional, misal: BCA reff 12345)"
                              value={adminNoteMap[payout.id] || ""}
                              onChange={e => setAdminNoteMap(prev => ({ ...prev, [payout.id]: e.target.value }))}
                              style={{ ...inputStyle, flex: 1, padding: "8px 12px", fontSize: 12 }}
                            />
                          </div>
                          <div style={{ display: "flex", gap: 10 }}>
                            <button
                              onClick={() => handleProcessPayout(payout.id, "PAID")}
                              disabled={processingId === payout.id}
                              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px", borderRadius: 10, border: "none", background: "#10B981", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                            >
                              {processingId === payout.id ? <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Check size={13} />}
                              Tandai Lunas
                            </button>
                            <button
                              onClick={() => handleProcessPayout(payout.id, "REJECTED")}
                              disabled={processingId === payout.id}
                              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px", borderRadius: 10, border: "none", background: "#EF4444", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                            >
                              <X size={13} /> Tolak
                            </button>
                          </div>
                        </div>
                      )}

                      {payout.status !== "PENDING" && payout.adminNote && (
                        <div style={{ fontSize: 12, color: "#71717A", background: "#1C1C24", padding: "10px 14px", borderRadius: 10 }}>
                          Catatan: {payout.adminNote}
                        </div>
                      )}

                      <div style={{ fontSize: 11, color: "#3F3F46", marginTop: 12 }}>
                        Diajukan: {new Date(payout.createdAt).toLocaleString("id-ID")}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <button onClick={() => { setIsLoggedIn(false); setAdminSecret(""); }} style={{ ...btnStyle("ghost"), marginTop: 24 }}>Logout</button>
      </div>
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
