-- ==========================================
-- INSERT DATA KARYAWAN (Jalankan di Supabase SQL Editor)
-- Gunakan file ini jika tabel karyawan kosong
-- ==========================================

-- Hapus data karyawan lama jika ada (opsional, hapus baris ini jika tidak mau reset)
DELETE FROM karyawan;

-- Insert 7 data karyawan tim dapur SPPG
INSERT INTO karyawan (id, nip, nama, divisi, status_kerja) VALUES
(1, 'NIP1001', 'Rahmat Hidayat', 'Persiapan',  'Aktif'),
(2, 'NIP1002', 'Siti Aminah',    'Pengolahan', 'Aktif'),
(3, 'NIP1003', 'Budi Santoso',   'Pengolahan', 'Aktif'),
(4, 'NIP1004', 'Rina Lestari',   'Pemorsian',  'Aktif'),
(5, 'NIP1005', 'Agus Pratama',   'Distribusi', 'Aktif'),
(6, 'NIP1006', 'Dewi Kartika',   'Pencucian',  'Aktif'),
(7, 'NIP1007', 'Nur Aisyah',     'Persiapan',  'Aktif');

-- Sinkronkan sequence SERIAL agar tidak bentrok saat tambah data baru
SELECT setval('karyawan_id_seq', (SELECT MAX(id) FROM karyawan));
