// ===============================================================
// KONFIGURASI SUPABASE - INVERSE ARCHER
// ===============================================================
// Ganti nilai di bawah ini dengan kredensial dari project Supabase Anda:
// Dapatkan di: Supabase Dashboard -> Project Settings -> API
//
// 1. SUPABASE_URL: URL Project Anda (contoh: https://xyzcompany.supabase.co)
// 2. SUPABASE_ANON_KEY: Kunci publik anon (aman ditaruh di sisi client karena diproteksi RLS)
// ===============================================================

const SUPABASE_CONFIG = {
  url: "https://GANTI_DENGAN_PROJECT_URL_ANDA.supabase.co",
  anonKey: "GANTI_DENGAN_ANON_PUBLIC_KEY_ANDA"
};

// Inisialisasi client Supabase secara global
let supabaseClient = null;

function initSupabase() {
  if (typeof supabase !== "undefined" && SUPABASE_CONFIG.url && !SUPABASE_CONFIG.url.includes("GANTI_DENGAN")) {
    try {
      supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      console.log("Supabase client berhasil diinisialisasi.");
    } catch (e) {
      console.warn("Gagal inisialisasi Supabase:", e);
    }
  }
}
