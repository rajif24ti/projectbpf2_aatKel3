-- ==========================================
-- SKEMA + RLS + SEEDER SUPABASE: MBG PEKANBARU
-- Jalankan SELURUH query ini di SQL Editor Supabase Anda
-- ==========================================

-- --------------------------------------------------------
-- BAGIAN 1: PEMBUATAN TABEL (SCHEMA)
-- --------------------------------------------------------

-- 1. Tabel Users (Autentikasi sederhana)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- 2. Tabel Sekolah
CREATE TABLE IF NOT EXISTS sekolah (
    id SERIAL PRIMARY KEY,
    npsn VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL,
    jenjang VARCHAR(10) NOT NULL,
    jumlah_siswa INTEGER DEFAULT 0,
    alamat TEXT
);

-- 3. Tabel Karyawan (Tim Operasional Dapur)
CREATE TABLE IF NOT EXISTS karyawan (
    id SERIAL PRIMARY KEY,
    nip VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL,
    divisi VARCHAR(50) NOT NULL,
    status_kerja VARCHAR(20) DEFAULT 'Aktif'
);

-- 4. Tabel Produksi (Distribusi Makanan ke Sekolah)
CREATE TABLE IF NOT EXISTS produksi (
    id SERIAL PRIMARY KEY,
    tanggal DATE NOT NULL,
    sekolah_id INTEGER REFERENCES sekolah(id) ON DELETE CASCADE,
    menu VARCHAR(100) NOT NULL,
    porsi INTEGER NOT NULL,
    kalori INTEGER NOT NULL,
    protein INTEGER NOT NULL,
    karbohidrat INTEGER NOT NULL,
    lemak INTEGER NOT NULL,
    serat INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. Tabel Absensi
CREATE TABLE IF NOT EXISTS absensi (
    id SERIAL PRIMARY KEY,
    tanggal DATE NOT NULL,
    karyawan_id INTEGER REFERENCES karyawan(id) ON DELETE CASCADE,
    jam_masuk VARCHAR(5) DEFAULT '-',
    status VARCHAR(20) NOT NULL,
    keterangan VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. Tabel Kotak Saran
CREATE TABLE IF NOT EXISTS kotak_saran (
    id SERIAL PRIMARY KEY,
    sekolah_nama VARCHAR(100) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    subjek VARCHAR(150) NOT NULL,
    isi TEXT NOT NULL,
    tanggal DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Belum Dibaca',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- --------------------------------------------------------
-- BAGIAN 2: ROW LEVEL SECURITY (RLS)
-- WAJIB agar frontend React via Anon Key bisa mengakses data.
-- Tanpa ini semua query dari Vercel akan diblokir Supabase.
-- --------------------------------------------------------

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sekolah ENABLE ROW LEVEL SECURITY;
ALTER TABLE karyawan ENABLE ROW LEVEL SECURITY;
ALTER TABLE produksi ENABLE ROW LEVEL SECURITY;
ALTER TABLE absensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE kotak_saran ENABLE ROW LEVEL SECURITY;

-- Policy: Izinkan semua operasi CRUD untuk public/anon role
DROP POLICY IF EXISTS "Allow all for anon" ON users;
DROP POLICY IF EXISTS "Allow all for anon" ON sekolah;
DROP POLICY IF EXISTS "Allow all for anon" ON karyawan;
DROP POLICY IF EXISTS "Allow all for anon" ON produksi;
DROP POLICY IF EXISTS "Allow all for anon" ON absensi;
DROP POLICY IF EXISTS "Allow all for anon" ON kotak_saran;

CREATE POLICY "Allow all for anon" ON users        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON sekolah      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON karyawan     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON produksi     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON absensi      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON kotak_saran  FOR ALL TO anon USING (true) WITH CHECK (true);

-- --------------------------------------------------------
-- BAGIAN 3: SEEDER DATA (KHUSUS WILAYAH PEKANBARU)
-- --------------------------------------------------------

-- Hapus data lama agar tidak duplikat jika dijalankan ulang
TRUNCATE TABLE kotak_saran, absensi, produksi RESTART IDENTITY CASCADE;
DELETE FROM karyawan;
DELETE FROM sekolah;
DELETE FROM users;

-- 1. Data Users (Login Sistem)
INSERT INTO users (username, password, role) VALUES
('pjdapur',   '123', 'pj_dapur'),
('ahligizi',  '123', 'ahli_gizi'),
('pjsekolah', '123', 'pj_sekolah');

-- 2. Data Sekolah Pekanbaru (Penerima Layanan MBG)
INSERT INTO sekolah (id, npsn, nama, jenjang, jumlah_siswa, alamat) VALUES
(1, '20103211', 'SDN 01 Pekanbaru',      'SD',  340, 'Jl. Jenderal Sudirman No.10, Pekanbaru'),
(2, '20104562', 'SDN 36 Pekanbaru',      'SD',  210, 'Jl. Hangtuah No.45, Pekanbaru'),
(3, '20107788', 'SMP Negeri 4 Pekanbaru','SMP', 400, 'Jl. Pattimura No.12, Pekanbaru'),
(4, '20109999', 'SMAN 1 Pekanbaru',      'SMA', 550, 'Jl. Sultan Syarif Kasim No.1, Pekanbaru');

-- 3. Data Karyawan Tim Dapur
INSERT INTO karyawan (id, nip, nama, divisi, status_kerja) VALUES
(1, 'NIP1001', 'Rahmat Hidayat', 'Persiapan',  'Aktif'),
(2, 'NIP1002', 'Siti Aminah',    'Pengolahan', 'Aktif'),
(3, 'NIP1003', 'Budi Santoso',   'Pengolahan', 'Aktif'),
(4, 'NIP1004', 'Rina Lestari',   'Pemorsian',  'Aktif'),
(5, 'NIP1005', 'Agus Pratama',   'Distribusi', 'Aktif'),
(6, 'NIP1006', 'Dewi Kartika',   'Pencucian',  'Aktif'),
(7, 'NIP1007', 'Nur Aisyah',     'Persiapan',  'Aktif');

-- Sinkronkan sequence SERIAL agar tidak bentrok dengan id manual
SELECT setval('karyawan_id_seq', (SELECT MAX(id) FROM karyawan));
SELECT setval('sekolah_id_seq',  (SELECT MAX(id) FROM sekolah));

-- 4. Data Produksi / Distribusi ke Sekolah Pekanbaru
INSERT INTO produksi (tanggal, sekolah_id, menu, porsi, kalori, protein, karbohidrat, lemak, serat) VALUES
('2026-06-15', 1, 'Nasi Ayam Teriyaki', 340, 650, 30, 80, 18, 6),
('2026-06-15', 2, 'Nasi Ikan Goreng',   210, 620, 28, 75, 16, 5),
('2026-06-15', 3, 'Nasi Ayam Kecap',    400, 640, 29, 79, 17, 5),
('2026-06-15', 4, 'Nasi Rendang',       550, 720, 35, 82, 22, 6);

-- 5. Data Absensi Karyawan
INSERT INTO absensi (tanggal, karyawan_id, jam_masuk, status, keterangan) VALUES
('2026-05-21', 2, '00:00', 'Hadir',     'Tepat Waktu'),
('2026-05-21', 3, '00:05', 'Hadir',     'Tepat Waktu'),
('2026-05-21', 4, '05:30', 'Terlambat', 'Melewati Jam Shift'),
('2026-05-21', 5, '08:00', 'Hadir',     'Tepat Waktu'),
('2026-05-21', 1, '19:00', 'Hadir',     'Tepat Waktu'),
('2026-05-21', 6, '-',     'Izin',      'Izin Tidak Masuk');

-- 6. Data Kotak Saran dari Sekolah Pekanbaru
INSERT INTO kotak_saran (sekolah_nama, kategori, subjek, isi, tanggal, status) VALUES
(
  'SDN 01 Pekanbaru',
  'Saran Pelayanan',
  'Kualitas Kemasan Makanan',
  'Mohon kemasan makanan diperkuat, beberapa kotak mengalami kerusakan saat diterima siswa.',
  '2026-05-20',
  'Belum Dibaca'
),
(
  'SMP Negeri 4 Pekanbaru',
  'Masukan Distribusi',
  'Pengiriman Terlambat',
  'Distribusi hari ini terlambat sekitar 20 menit karena kemacetan di Jl. Pattimura.',
  '2026-05-20',
  'Sudah Dibaca'
),
(
  'SMAN 1 Pekanbaru',
  'Evaluasi Menu',
  'Variasi Menu Mingguan',
  'Siswa berharap ada variasi sayur lokal khas Riau seperti gulai daun singkong agar lebih beragam.',
  '2026-05-19',
  'Sudah Dibaca'
);
