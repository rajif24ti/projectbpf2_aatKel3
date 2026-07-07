<?php

namespace App\Http\Controllers;

use App\Models\Sekolah;
use Illuminate\Http\Request;

class SekolahController extends Controller
{
    // Menampilkan semua data
    public function index()
    {
        return response()->json(Sekolah::all(), 200);
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'npsn' => 'required|max:8|unique:sekolah,npsn',
            'nama' => 'required|string|max:255',
            'jenjang' => 'required|string|max:20',
            'jumlah_siswa' => 'required|integer|min:1',
            'alamat' => 'required|string',
        ]);

        $sekolah = Sekolah::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data sekolah berhasil ditambahkan',
            'data' => $sekolah
        ], 201);
    }

    // Menampilkan satu data
    public function show($id)
    {
        $sekolah = Sekolah::findOrFail($id);

        return response()->json($sekolah, 200);
    }

    // Mengubah data
    public function update(Request $request, $id)
    {
        $sekolah = Sekolah::findOrFail($id);

        $validated = $request->validate([
            'npsn' => 'required|max:8|unique:sekolah,npsn,' . $id . ',id_sekolah',
            'nama' => 'required|string|max:255',
            'jenjang' => 'required|string|max:20',
            'jumlah_siswa' => 'required|integer|min:1',
            'alamat' => 'required|string',
        ]);

        $sekolah->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data sekolah berhasil diupdate',
            'data' => $sekolah
        ]);
    }

    // Menghapus data
    public function destroy($id)
    {
        $sekolah = Sekolah::findOrFail($id);
        $sekolah->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data sekolah berhasil dihapus'
        ]);
    }
}