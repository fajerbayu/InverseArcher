// ===============================================================
// KONFIGURASI SUPABASE - INVERSE ARCHER
// ===============================================================
// Kredensial project Supabase dapat diisi langsung di bawah ini,
// ATAU diisi secara praktis lewat menu "⚙️ Supabase" di website (tersimpan aman di browser).
// Dapatkan di: Supabase Dashboard -> Project Settings -> API
//
// 1. SUPABASE_URL: URL Project Anda (contoh: https://xyzcompany.supabase.co)
// 2. SUPABASE_ANON_KEY: Kunci publik anon (aman di sisi client karena diproteksi RLS)
// ===============================================================

const SUPABASE_CONFIG = {
  url: "https://hpteiddvawtfvcjivdup.supabase.co",
  anonKey: "sb_publishable_1ONiiZVizIteQbt2kfU07Q_UIwVlxtm"
};

// Inisialisasi client Supabase secara global
let supabaseClient = null;

function normalizeSupabaseUrl(rawUrl) {
  if (!rawUrl) return "";
  let u = rawUrl.trim();
  const match = u.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://${match[1]}.supabase.co`;
  }
  return u.replace(/\/+$/, "");
}

function getActiveSupabaseConfig() {
  let url = normalizeSupabaseUrl(SUPABASE_CONFIG.url || "");
  let anonKey = (SUPABASE_CONFIG.anonKey || "").trim();

  // Dukung override dari pengaturan UI browser jika ada nilai khusus
  try {
    const saved = JSON.parse(localStorage.getItem("inverse_archer_supabase_config") || "{}");
    if (saved && saved.url && saved.anonKey && saved.url.trim() && saved.anonKey.trim() && !saved.url.includes("GANTI_DENGAN")) {
      const normalizedSavedUrl = normalizeSupabaseUrl(saved.url);
      if (normalizedSavedUrl) {
        url = normalizedSavedUrl;
        anonKey = saved.anonKey.trim();
      }
    }
  } catch (e) {}

  return { url, anonKey };
}

function initSupabase() {
  const cfg = getActiveSupabaseConfig();
  if (typeof supabase !== "undefined" && cfg.url && !cfg.url.includes("GANTI_DENGAN")) {
    try {
      supabaseClient = supabase.createClient(cfg.url, cfg.anonKey);
      return supabaseClient;
    } catch (e) {
      console.warn("Gagal inisialisasi Supabase:", e);
      return null;
    }
  }
  return null;
}
