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
    nama VARCHAR(100),
    divisi VARCHAR(50),
    jam_masuk VARCHAR(5) DEFAULT '-',
    jam_pulang VARCHAR(5) DEFAULT '-',
    status VARCHAR(20) NOT NULL,
    status_pulang VARCHAR(50) DEFAULT 'Belum Absen',
    keterangan VARCHAR(100),
    keterangan_pulang VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tambahkan kolom baru jika tabel absensi sudah ada (migrasi aman)
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS nama VARCHAR(100);
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS divisi VARCHAR(50);
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS jam_pulang VARCHAR(5) DEFAULT '-';
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS status_pulang VARCHAR(50) DEFAULT 'Belum Absen';
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS keterangan_pulang VARCHAR(100);

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

-- 7. Tabel Laporan
CREATE TABLE IF NOT EXISTS laporan (
    id SERIAL PRIMARY KEY,
    tanggal DATE NOT NULL,
    jenis VARCHAR(50) NOT NULL,
    keterangan TEXT NOT NULL,
    petugas VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Selesai',
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
ALTER TABLE laporan ENABLE ROW LEVEL SECURITY;

-- Policy: Izinkan semua operasi CRUD untuk public/anon role
DROP POLICY IF EXISTS "Allow all for anon" ON users;
DROP POLICY IF EXISTS "Allow all for anon" ON sekolah;
DROP POLICY IF EXISTS "Allow all for anon" ON karyawan;
DROP POLICY IF EXISTS "Allow all for anon" ON produksi;
DROP POLICY IF EXISTS "Allow all for anon" ON absensi;
DROP POLICY IF EXISTS "Allow all for anon" ON kotak_saran;
DROP POLICY IF EXISTS "Allow all for anon" ON laporan;

CREATE POLICY "Allow all for anon" ON users        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON sekolah      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON karyawan     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON produksi     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON absensi      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON kotak_saran  FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON laporan      FOR ALL TO anon USING (true) WITH CHECK (true);

-- --------------------------------------------------------
-- BAGIAN 3: SEEDER DATA (KHUSUS WILAYAH PEKANBARU)
-- --------------------------------------------------------

-- Hapus data lama agar tidak duplikat jika dijalankan ulang
TRUNCATE TABLE laporan, kotak_saran, absensi, produksi RESTART IDENTITY CASCADE;
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
INSERT INTO absensi (tanggal, karyawan_id, nama, divisi, jam_masuk, jam_pulang, status, status_pulang, keterangan, keterangan_pulang) VALUES
('2026-05-21', 2, 'Siti Aminah',    'Pengolahan', '00:00', '08:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-05-21', 3, 'Budi Santoso',   'Pengolahan', '00:05', '08:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-05-21', 4, 'Rina Lestari',   'Pemorsian',  '05:30', '09:30', 'Terlambat', 'Pulang Cepat',       'Melewati Jam Shift', 'Sebelum Jadwal Selesai'),
('2026-05-21', 5, 'Agus Pratama',   'Distribusi', '08:00', '17:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-05-21', 1, 'Rahmat Hidayat', 'Persiapan',  '19:00', '00:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-05-21', 6, 'Dewi Kartika',   'Pencucian',  '-',     '-',     'Izin',      'Belum Absen',        'Izin Tidak Masuk',   'Belum Melakukan Absensi Pulang');

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

-- 7. Data Laporan
INSERT INTO laporan (tanggal, jenis, keterangan, petugas, status) VALUES
('2026-05-19', 'Produksi', 'Produksi 1.200 porsi makanan harian', 'Siti Aminah', 'Selesai'),
('2026-05-20', 'Absensi', '13 pegawai hadir, 1 izin, 1 sakit', 'Budi Santoso', 'Selesai'),
('2026-05-21', 'Bahan Baku', 'Stok bawang merah mulai menipis', 'Dewi Kartika', 'Perlu Tindak Lanjut');
