<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sekolah extends Model
{
    use HasFactory;

    protected $table = 'sekolah';

    protected $primaryKey = 'id_sekolah';

    protected $fillable = [
        'nama_sekolah',
        'alamat',
        'jenjang',
        'jumlah_siswa',
    ];

    public function produksis()
    {
        return $this->hasMany(Produksi::class, 'id_sekolah');
    }

    public function sarans()
    {
        return $this->hasMany(Saran::class, 'id_sekolah');
    }
}