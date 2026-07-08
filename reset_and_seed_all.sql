-- ============================================================
-- RESET & SEED LENGKAP - SISTEM MBG PEKANBARU
-- Jalankan SELURUH file ini di Supabase SQL Editor
-- ============================================================

-- --------------------------------------------------------
-- STEP 1: BERSIHKAN SEMUA DATA LAMA
-- --------------------------------------------------------
TRUNCATE TABLE laporan, kotak_saran, absensi, produksi RESTART IDENTITY CASCADE;
DELETE FROM karyawan;
DELETE FROM sekolah;
DELETE FROM users;

-- --------------------------------------------------------
-- STEP 2: PASTIKAN KOLOM BARU ADA (MIGRASI AMAN)
-- --------------------------------------------------------
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS nama VARCHAR(100);
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS divisi VARCHAR(50);
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS jam_pulang VARCHAR(5) DEFAULT '-';
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS status_pulang VARCHAR(50) DEFAULT 'Belum Absen';
ALTER TABLE absensi ADD COLUMN IF NOT EXISTS keterangan_pulang VARCHAR(100);

-- --------------------------------------------------------
-- STEP 3: INSERT DATA USERS (LOGIN)
-- --------------------------------------------------------
INSERT INTO users (username, password, role) VALUES
('pjdapur',   '123', 'pj_dapur'),
('ahligizi',  '123', 'ahli_gizi'),
('pjsekolah', '123', 'pj_sekolah');

-- --------------------------------------------------------
-- STEP 4: INSERT DATA SEKOLAH MITRA PEKANBARU
-- --------------------------------------------------------
INSERT INTO sekolah (id, npsn, nama, jenjang, jumlah_siswa, alamat) VALUES
(1, '20103211', 'SDN 01 Pekanbaru',       'SD',  340, 'Jl. Jenderal Sudirman No.10, Pekanbaru'),
(2, '20104562', 'SDN 36 Pekanbaru',       'SD',  210, 'Jl. Hangtuah No.45, Pekanbaru'),
(3, '20107788', 'SMP Negeri 4 Pekanbaru', 'SMP', 400, 'Jl. Pattimura No.12, Pekanbaru'),
(4, '20109999', 'SMAN 1 Pekanbaru',       'SMA', 550, 'Jl. Sultan Syarif Kasim No.1, Pekanbaru');

-- Sync sequence
SELECT setval('sekolah_id_seq', (SELECT MAX(id) FROM sekolah));

-- --------------------------------------------------------
-- STEP 5: INSERT DATA KARYAWAN TIM DAPUR
-- --------------------------------------------------------
INSERT INTO karyawan (id, nip, nama, divisi, status_kerja) VALUES
(1, 'NIP1001', 'Rahmat Hidayat', 'Persiapan',  'Aktif'),
(2, 'NIP1002', 'Siti Aminah',    'Pengolahan', 'Aktif'),
(3, 'NIP1003', 'Budi Santoso',   'Pengolahan', 'Aktif'),
(4, 'NIP1004', 'Rina Lestari',   'Pemorsian',  'Aktif'),
(5, 'NIP1005', 'Agus Pratama',   'Distribusi', 'Aktif'),
(6, 'NIP1006', 'Dewi Kartika',   'Pencucian',  'Aktif'),
(7, 'NIP1007', 'Nur Aisyah',     'Persiapan',  'Aktif');

-- Sync sequence
SELECT setval('karyawan_id_seq', (SELECT MAX(id) FROM karyawan));

-- --------------------------------------------------------
-- STEP 6: INSERT DATA PRODUKSI / DISTRIBUSI
-- --------------------------------------------------------
INSERT INTO produksi (tanggal, sekolah_id, menu, porsi, kalori, protein, karbohidrat, lemak, serat) VALUES
('2026-06-15', 1, 'Nasi Ayam Teriyaki', 340, 650, 30, 80, 18, 6),
('2026-06-15', 2, 'Nasi Ikan Goreng',   210, 620, 28, 75, 16, 5),
('2026-06-15', 3, 'Nasi Ayam Kecap',    400, 640, 29, 79, 17, 5),
('2026-06-15', 4, 'Nasi Rendang',       550, 720, 35, 82, 22, 6);

-- --------------------------------------------------------
-- STEP 7: INSERT DATA ABSENSI (MASUK + PULANG)
-- --------------------------------------------------------
INSERT INTO absensi (tanggal, karyawan_id, nama, divisi, jam_masuk, jam_pulang, status, status_pulang, keterangan, keterangan_pulang) VALUES
('2026-06-15', 1, 'Rahmat Hidayat', 'Persiapan',  '19:00', '00:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-15', 2, 'Siti Aminah',    'Pengolahan', '00:00', '08:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-15', 3, 'Budi Santoso',   'Pengolahan', '00:05', '08:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-15', 4, 'Rina Lestari',   'Pemorsian',  '05:30', '09:30', 'Terlambat', 'Pulang Cepat',       'Melewati Jam Shift', 'Sebelum Jadwal Selesai'),
('2026-06-15', 5, 'Agus Pratama',   'Distribusi', '08:00', '17:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-15', 6, 'Dewi Kartika',   'Pencucian',  '-',     '-',     'Izin',      'Belum Absen',        'Izin Tidak Masuk',   'Belum Melakukan Absensi Pulang'),
('2026-06-15', 7, 'Nur Aisyah',     'Persiapan',  '19:00', '00:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-16', 1, 'Rahmat Hidayat', 'Persiapan',  '19:00', '00:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-16', 2, 'Siti Aminah',    'Pengolahan', '00:00', '08:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-16', 3, 'Budi Santoso',   'Pengolahan', '00:10', '08:00', 'Terlambat', 'Pulang Tepat Waktu', 'Melewati Jam Shift', 'Sesuai Jadwal Kerja'),
('2026-06-16', 4, 'Rina Lestari',   'Pemorsian',  '05:00', '10:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-16', 5, 'Agus Pratama',   'Distribusi', '08:00', '17:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-16', 6, 'Dewi Kartika',   'Pencucian',  '13:00', '19:00', 'Hadir',     'Pulang Tepat Waktu', 'Tepat Waktu',        'Sesuai Jadwal Kerja'),
('2026-06-16', 7, 'Nur Aisyah',     'Persiapan',  '-',     '-',     'Sakit',     'Belum Absen',        'Tidak Masuk Sakit',  'Belum Melakukan Absensi Pulang');

-- --------------------------------------------------------
-- STEP 8: INSERT DATA KOTAK SARAN
-- --------------------------------------------------------
INSERT INTO kotak_saran (sekolah_nama, kategori, subjek, isi, tanggal, status) VALUES
(
  'SDN 01 Pekanbaru',
  'Saran Pelayanan',
  'Kualitas Kemasan Makanan',
  'Mohon kemasan makanan diperkuat, beberapa kotak mengalami kerusakan saat diterima siswa.',
  '2026-06-10',
  'Belum Dibaca'
),
(
  'SMP Negeri 4 Pekanbaru',
  'Masukan Distribusi',
  'Pengiriman Terlambat',
  'Distribusi hari ini terlambat sekitar 20 menit karena kemacetan di Jl. Pattimura.',
  '2026-06-12',
  'Sudah Dibaca'
),
(
  'SMAN 1 Pekanbaru',
  'Evaluasi Menu',
  'Variasi Menu Mingguan',
  'Siswa berharap ada variasi sayur lokal khas Riau seperti gulai daun singkong agar lebih beragam.',
  '2026-06-14',
  'Sudah Dibaca'
),
(
  'SDN 36 Pekanbaru',
  'Saran Pelayanan',
  'Porsi Makanan Kurang',
  'Beberapa siswa merasa porsi yang diberikan belum mencukupi kebutuhan makan siang mereka.',
  '2026-06-15',
  'Belum Dibaca'
);

-- --------------------------------------------------------
-- STEP 9: INSERT DATA LAPORAN
-- --------------------------------------------------------
INSERT INTO laporan (tanggal, jenis, keterangan, petugas, status) VALUES
('2026-06-15', 'Produksi',    '1.500 porsi makanan berhasil diproduksi dan didistribusikan ke 4 sekolah mitra', 'Siti Aminah',    'Selesai'),
('2026-06-15', 'Absensi',     '6 pegawai hadir, 1 izin. Produksi berjalan lancar tanpa hambatan',               'Budi Santoso',   'Selesai'),
('2026-06-14', 'Bahan Baku',  'Stok bawang merah mulai menipis, perlu pengadaan segera',                       'Rahmat Hidayat', 'Perlu Tindak Lanjut'),
('2026-06-14', 'Distribusi',  'Seluruh distribusi ke 4 sekolah selesai tepat waktu pukul 07:30',               'Agus Pratama',   'Selesai'),
('2026-06-13', 'Produksi',    '1.500 porsi diproduksi. Menu: Nasi Rendang dan Nasi Ayam Kecap',               'Dewi Kartika',   'Selesai'),
('2026-06-13', 'Gizi',        'Kalori rata-rata per porsi: 657 kkal. Sudah memenuhi standar gizi harian MBG',  'Nur Aisyah',     'Selesai');

-- ============================================================
-- SELESAI! Semua data berhasil dimasukkan.
-- ============================================================
