<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SekolahController;
use App\Http\Controllers\KaryawanController;
use App\Http\Controllers\ProduksiController;
use App\Http\Controllers\GiziController;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\SaranController;

Route::apiResource('sekolah', SekolahController::class);
Route::apiResource('karyawan', KaryawanController::class);
Route::apiResource('produksi', ProduksiController::class);
Route::apiResource('gizi', GiziController::class);
Route::apiResource('absensi', AbsensiController::class);
Route::apiResource('saran', SaranController::class);