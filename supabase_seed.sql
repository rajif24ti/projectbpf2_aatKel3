-- ==========================================
-- DUMMY DATA SEEDER UNTUK SUPABASE
-- Silakan jalankan ini di menu SQL Editor Supabase
-- ==========================================

-- Hapus data lama agar tidak duplikat jika dijalankan ulang
TRUNCATE TABLE laporan, kotak_saran, absensi, produksi, karyawan, users, sekolah RESTART IDENTITY CASCADE;

-- 1. Insert Data Sekolah
INSERT INTO sekolah (id, npsn, nama, jenjang, jumlah_siswa, alamat) VALUES
(1, '20103211', 'SDN 01 Pekanbaru', 'SD', 340, 'Jl. Pemuda No.10 Pekanbaru'),
(2, '20104562', 'SDN 05 Merdeka', 'SD', 210, 'Jl. Merdeka Barat No.45 Jakarta'),
(3, '20107788', 'SMP Negeri 03 Jakarta', 'SMP', 400, 'Jl. Pendidikan No.12 Jakarta'),
(4, '20109999', 'SMAN 05 Jakarta', 'SMA', 550, 'Jl. Kebangsaan No. 1 Jakarta');

-- 2. Insert Data Users
INSERT INTO users (username, password, role) VALUES
('pjdapur', '123', 'pj_dapur'),
('ahligizi', '123', 'ahli_gizi'),
('pjsekolah', '123', 'pj_sekolah');

-- 3. Insert Data Karyawan
INSERT INTO karyawan (id, nip, nama, divisi, status_kerja) VALUES
(1, 'NIP1001', 'Rahmat Hidayat', 'Persiapan', 'Aktif'),
(2, 'NIP1002', 'Siti Aminah', 'Pengolahan', 'Aktif'),
(3, 'NIP1003', 'Budi Santoso', 'Pengolahan', 'Aktif'),
(4, 'NIP1004', 'Rina Lestari', 'Pemorsian', 'Aktif'),
(5, 'NIP1005', 'Agus Pratama', 'Distribusi', 'Aktif'),
(6, 'NIP1006', 'Dewi Kartika', 'Pencucian', 'Aktif'),
(7, 'NIP1007', 'Nur Aisyah', 'Persiapan', 'Aktif');

-- 4. Insert Data Produksi
INSERT INTO produksi (tanggal, sekolah_id, menu, porsi, kalori, protein, karbohidrat, lemak, serat) VALUES
('2026-06-15', 1, 'Nasi Ayam Teriyaki', 340, 650, 30, 80, 18, 6),
('2026-06-15', 2, 'Nasi Ikan Goreng', 210, 620, 28, 75, 16, 5),
('2026-06-15', 3, 'Nasi Ayam Kecap', 185, 640, 29, 79, 17, 5),
('2026-06-15', 4, 'Nasi Rendang', 520, 720, 35, 82, 22, 6);

-- 5. Insert Data Absensi
INSERT INTO absensi (tanggal, karyawan_id, jam_masuk, status, keterangan) VALUES
('2026-05-21', 2, '00:00', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 3, '00:05', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 4, '05:30', 'Terlambat', 'Melewati Jam Shift'),
('2026-05-21', 5, '08:00', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 1, '19:00', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 6, '-', 'Izin', 'Izin Tidak Masuk');

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

-- Seed Data Kotak Saran
INSERT INTO kotak_saran (sekolah_nama, kategori, subjek, isi, tanggal, status) VALUES
('SDN 01 Menteng', 'Saran Pelayanan', 'Kualitas Kemasan Makanan', 'Mohon kemasan makanan diperkuat karena beberapa kotak makanan mengalami kerusakan saat diterima siswa.', '2026-05-20', 'Belum Dibaca'),
('SMP Negeri 03 Jakarta', 'Masukan Distribusi', 'Pengiriman Terlambat', 'Distribusi makanan hari ini datang lebih lambat sekitar 20 menit dari jadwal biasanya.', '2026-05-20', 'Sudah Dibaca'),
('SMAN 1 Pekanbaru', 'Evaluasi Menu', 'Variasi Menu Mingguan', 'Siswa berharap ada variasi sayur lokal khas Riau seperti gulai daun singkong agar lebih beragam.', '2026-05-19', 'Sudah Dibaca');

-- Seed Data Laporan
INSERT INTO laporan (tanggal, jenis, keterangan, petugas, status) VALUES
('2026-05-19', 'Produksi', 'Produksi 1.200 porsi makanan harian', 'Siti Aminah', 'Selesai'),
('2026-05-20', 'Absensi', '13 pegawai hadir, 1 izin, 1 sakit', 'Budi Santoso', 'Selesai'),
('2026-05-21', 'Bahan Baku', 'Stok bawang merah mulai menipis', 'Dewi Kartika', 'Perlu Tindak Lanjut');
