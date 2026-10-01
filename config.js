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
  url: "https://GANTI_DENGAN_PROJECT_URL_ANDA.supabase.co",
  anonKey: "GANTI_DENGAN_ANON_PUBLIC_KEY_ANDA"
};

// Inisialisasi client Supabase secara global
let supabaseClient = null;

function getActiveSupabaseConfig() {
  let url = (SUPABASE_CONFIG.url || "").trim();
  let anonKey = (SUPABASE_CONFIG.anonKey || "").trim();

  // Dukung override dari pengaturan UI browser jika file config.js belum diedit
  try {
    const saved = JSON.parse(localStorage.getItem("inverse_archer_supabase_config") || "{}");
    if (saved && saved.url && saved.anonKey && saved.url.trim() && saved.anonKey.trim()) {
      url = saved.url.trim();
      anonKey = saved.anonKey.trim();
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
