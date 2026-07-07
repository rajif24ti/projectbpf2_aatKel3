<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gizi', function (Blueprint $table) {
            $table->id('id_gizi');
            $table->decimal('kalori', 10, 2);
            $table->decimal('protein', 10, 2);
            $table->decimal('lemak', 10, 2);
            $table->decimal('karbohidrat', 10, 2);
            $table->decimal('serat', 10, 2);

            $table->foreignId('id_produksi')
                ->constrained('produksi', 'id_produksi')
                ->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gizis');
    }
};
