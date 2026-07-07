-- ==========================================
-- DUMMY DATA SEEDER UNTUK SUPABASE
-- Silakan jalankan ini di menu SQL Editor Supabase
-- ==========================================

-- 1. Insert Data Sekolah (diperlukan terlebih dahulu untuk relasi tabel produksi)
INSERT INTO sekolah (id, npsn, nama, jenjang, jumlah_siswa, alamat) VALUES
(1, '20103211', 'SDN 01 Pekanbaru', 'SD', 340, 'Jl. Pemuda No.10 Pekanbaru'),
(2, '20104562', 'SDN 05 Merdeka', 'SD', 210, 'Jl. Merdeka Barat No.45 Jakarta'),
(3, '20107788', 'SMP Negeri 03 Jakarta', 'SMP', 400, 'Jl. Pendidikan No.12 Jakarta'),
(4, '20109999', 'SMAN 05 Jakarta', 'SMA', 550, 'Jl. Kebangsaan No. 1 Jakarta');

-- 2. Insert Data Users (Sistem Login Sederhana)
-- Gunakan UUID acak atau default dari Supabase (uuid_generate_v4())
INSERT INTO users (username, password, role) VALUES
('pjdapur', '123', 'pj_dapur'),
('ahligizi', '123', 'ahli_gizi'),
('pjsekolah', '123', 'pj_sekolah');

-- 3. Insert Data Karyawan (Dapur / Operasional)
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
-- Sesuaikan karyawan_id dengan tabel karyawan (Rahmat=1, Siti=2, Budi=3, Rina=4, Agus=5, Dewi=6)
INSERT INTO absensi (tanggal, karyawan_id, jam_masuk, status, keterangan) VALUES
('2026-05-21', 2, '00:00', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 3, '00:05', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 4, '05:30', 'Terlambat', 'Melewati Jam Shift'),
('2026-05-21', 5, '08:00', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 1, '19:00', 'Hadir', 'Tepat Waktu'),
('2026-05-21', 6, '-', 'Izin', 'Izin Tidak Masuk');

-- 6. Insert Data Kotak Saran
INSERT INTO kotak_saran (sekolah_nama, kategori, subjek, isi, tanggal, status) VALUES
('SDN 01 Menteng', 'Saran Pelayanan', 'Kualitas Kemasan Makanan', 'Mohon kemasan makanan diperkuat karena beberapa kotak makanan mengalami kerusakan saat diterima siswa.', '2026-05-20', 'Belum Dibaca'),
('SMP Negeri 03 Jakarta', 'Masukan Distribusi', 'Pengiriman Terlambat', 'Distribusi makanan hari ini datang lebih lambat sekitar 20 menit dari jadwal biasanya.', '2026-05-20', 'Sudah Dibaca'),
('SMAN 05 Jakarta', 'Evaluasi Menu', 'Variasi Menu Mingguan', 'Siswa berharap terdapat variasi menu tambahan agar tidak monoton setiap minggunya.', '2026-05-19', 'Sudah Dibaca');
