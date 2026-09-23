# 🎯 Inverse Archer - Game Edukasi Fungsi Invers

Website game interaktif pembelajaran matematika materi **Fungsi Invers** dengan mekanisme panahan balon dan kuis adaptif. Aplikasi ini terintegrasi penuh dengan **Supabase** (database nilai aman khusus guru) dan siap di-deploy secara instan ke **Vercel**.

---

## 🌟 Fitur Utama

1. **Game Interaktif & Edukatif**:
   - 10 ronde tembak balon dinamis bergradien lintasan matematika.
   - Sesi latihan memanah 3 level untuk pembiasaan kontrol.
   - 10 soal fungsi invers bertingkat (fungsi linier, fungsi pecahan, fungsi kuadrat, dan masalah kontekstual kehidupan sehari-hari).
   - Pembahasan detail pada setiap soal setelah permainan selesai.
2. **Nol Friksi untuk Siswa**:
   - Siswa cukup memasukkan Nama dan Kelas tanpa perlu registrasi akun atau download aplikasi.
   - Responsif di semua ukuran layar smartphone maupun laptop/PC.
3. **Penyimpanan Nilai Otomatis ke Supabase**:
   - Nilai, jumlah benar/salah, medali, durasi pengerjaan, dan rincian jawaban per butir otomatis tersimpan ke cloud.
   - Dilengkapi *offline fallback* jika koneksi internet terputus.
4. **Keamanan Akses Guru (Row-Level Security / RLS)**:
   - Nilai seluruh siswa **hanya dapat dilihat dan diunduh oleh guru**.
   - Siswa (anonim) hanya diberi izin untuk mengirim nilai (*INSERT*), dan diblokir total dari membaca data siswa lain di database.
5. **Dasbor Khusus Guru (`guru.html`)**:
   - Autentikasi aman via Supabase Auth (Email & Password).
   - Statistik otomatis (Total siswa, rata-rata, nilai tertinggi & terendah).
   - Filter kelas & pencarian nama siswa.
   - *Real-time live update* saat siswa sedang mengerjakan di kelas.
   - Ekspor rekapitulasi nilai ke format **Excel / CSV** dengan sekali klik.

---

## 📁 Struktur File

```
InverseArcher/
├── index.html       # Game utama untuk siswa (archery + soal invers)
├── guru.html        # Dasbor portal guru terproteksi (rekap nilai, filter, ekspor)
├── config.js        # Konfigurasi SUPABASE_URL dan SUPABASE_ANON_KEY
└── README.md        # Panduan instalasi dan deployment
```

---

## 🚀 Panduan Setup Supabase (5 Menit)

### 1. Buat Project di Supabase
1. Buka [https://supabase.com](https://supabase.com) dan buat akun (gratis).
2. Klik **"New Project"**, beri nama proyek (contoh: `InverseArcherDB`), tentukan kata sandi database, dan pilih region terdekat (misal: *Singapore*).

### 2. Jalankan Script SQL & RLS
Buka menu **SQL Editor** di dashboard Supabase Anda, lalu salin dan jalankan (*Run*) script berikut:

```sql
-- 1. Buat tabel nilai siswa
CREATE TABLE IF NOT EXISTS student_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_name TEXT NOT NULL,
    student_class TEXT NOT NULL,
    score INTEGER NOT NULL,
    correct_count INTEGER NOT NULL,
    wrong_count INTEGER NOT NULL,
    medal TEXT,
    time_spent_seconds INTEGER,
    answers_detail JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE student_scores ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan untuk Siswa (Anonim): Hanya boleh INSERT nilai miliknya
CREATE POLICY "Allow public insert" 
ON student_scores 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. Kebijakan untuk Guru (Authenticated): Hanya akun guru yang boleh membaca data
CREATE POLICY "Allow authenticated read" 
ON student_scores 
FOR SELECT 
TO authenticated 
USING (true);

-- 5. Kebijakan untuk Guru: Hanya akun guru yang boleh menghapus data
CREATE POLICY "Allow authenticated delete" 
ON student_scores 
FOR DELETE 
TO authenticated 
USING (true);

-- 6. Aktifkan fitur Realtime agar dasbor guru ter-update otomatis
ALTER PUBLICATION supabase_realtime ADD TABLE student_scores;
```

### 3. Buat Akun Guru
1. Di dashboard Supabase, buka menu **Authentication** -> **Users**.
2. Klik tombol **"Add User"** -> **"Create user"**.
3. Masukkan email guru (contoh: `guru@sekolah.sch.id`) dan password yang kuat. Akun ini yang akan digunakan untuk login di `guru.html`.

### 4. Masukkan Kredensial ke `config.js`
1. Di dashboard Supabase, buka menu **Project Settings** (ikon gerigi) -> **API**.
2. Salin **Project URL** dan **Project API Keys (`anon` / `public`)**.
3. Buka file `config.js` di proyek ini dan tempelkan nilai tersebut:
   ```javascript
   const SUPABASE_CONFIG = {
     url: "https://xyzcompany.supabase.co", // ganti dengan URL Anda
     anonKey: "eyJhbGciOi..."              // ganti dengan anon key Anda
   };
   ```

---

## 🌐 Panduan Deployment ke Vercel (3 Langkah Mudah)

Karena proyek ini berbasis static web modern (HTML, Vanilla CSS, JS):

1. Masuk ke [https://vercel.com](https://vercel.com) menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** -> **"Project"**, lalu pilih repositori **`InverseArcher`**.
3. Klik **"Deploy"** (tanpa perlu mengubah pengaturan *Build & Output*).
4. Dalam < 1 menit, Vercel akan memberikan tautan publik gratis, misalnya:
   `https://inverse-archer.vercel.app`

Bagikan link tersebut ke siswa Anda, dan buka link `/guru.html` untuk memantau nilai mereka!
