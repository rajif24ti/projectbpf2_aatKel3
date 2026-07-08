import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlgzsiwguczeflfpqifh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZ3pzaXdndWN6ZWZsZnBxaWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mjg0ODMsImV4cCI6MjA5OTAwNDQ4M30.qDp22oiB154GNuoE9IGgLEKFpzhMfQnJhDOfMmurwPc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding data...');
  
  // KARYAWAN
  const karyawanData = [
    { id: 1, nip: 'NIP1001', nama: 'Rahmat Hidayat', divisi: 'Persiapan',  status_kerja: 'Aktif' },
    { id: 2, nip: 'NIP1002', nama: 'Siti Aminah',    divisi: 'Pengolahan', status_kerja: 'Aktif' },
    { id: 3, nip: 'NIP1003', nama: 'Budi Santoso',   divisi: 'Pengolahan', status_kerja: 'Aktif' },
    { id: 4, nip: 'NIP1004', nama: 'Rina Lestari',   divisi: 'Pemorsian',  status_kerja: 'Aktif' },
    { id: 5, nip: 'NIP1005', nama: 'Agus Pratama',   divisi: 'Distribusi', status_kerja: 'Aktif' },
    { id: 6, nip: 'NIP1006', nama: 'Dewi Kartika',   divisi: 'Pencucian',  status_kerja: 'Aktif' },
    { id: 7, nip: 'NIP1007', nama: 'Nur Aisyah',     divisi: 'Persiapan',  status_kerja: 'Aktif' }
  ];
  
  for (const k of karyawanData) {
    await supabase.from('karyawan').upsert(k);
  }
  console.log('Karyawan seeded.');

  // SEKOLAH
  const sekolahData = [
    { id: 1, npsn: '20103211', nama: 'SDN 01 Pekanbaru', jenjang: 'SD', jumlah_siswa: 340, alamat: 'Jl. Jenderal Sudirman No.10, Pekanbaru' },
    { id: 2, npsn: '20104562', nama: 'SDN 36 Pekanbaru', jenjang: 'SD', jumlah_siswa: 210, alamat: 'Jl. Hangtuah No.45, Pekanbaru' },
    { id: 3, npsn: '20107788', nama: 'SMP Negeri 4 Pekanbaru', jenjang: 'SMP', jumlah_siswa: 400, alamat: 'Jl. Pattimura No.12, Pekanbaru' },
    { id: 4, npsn: '20109999', nama: 'SMAN 1 Pekanbaru', jenjang: 'SMA', jumlah_siswa: 550, alamat: 'Jl. Sultan Syarif Kasim No.1, Pekanbaru' }
  ];
  
  for (const s of sekolahData) {
    await supabase.from('sekolah').upsert(s);
  }
  console.log('Sekolah seeded.');

  // PRODUKSI
  const produksiData = [
    { tanggal: '2026-06-15', sekolah_id: 1, menu: 'Nasi Ayam Teriyaki', porsi: 340, kalori: 650, protein: 30, karbohidrat: 80, lemak: 18, serat: 6 },
    { tanggal: '2026-06-15', sekolah_id: 2, menu: 'Nasi Ikan Goreng',   porsi: 210, kalori: 620, protein: 28, karbohidrat: 75, lemak: 16, serat: 5 },
    { tanggal: '2026-06-15', sekolah_id: 3, menu: 'Nasi Ayam Kecap',    porsi: 400, kalori: 640, protein: 29, karbohidrat: 79, lemak: 17, serat: 5 },
    { tanggal: '2026-06-15', sekolah_id: 4, menu: 'Nasi Rendang',       porsi: 550, kalori: 720, protein: 35, karbohidrat: 82, lemak: 22, serat: 6 }
  ];
  
  for (const p of produksiData) {
    await supabase.from('produksi').upsert(p);
  }
  console.log('Produksi seeded.');

  console.log('Seeding done!');
}

seed().catch(console.error);
