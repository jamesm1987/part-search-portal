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
        Schema::create('supplier_parts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('supplier_id')->constrained('suppliers')->cascadeOnDelete();
            $table->foreignId('part_id')->constrained('parts')->cascadeOnDelete();
            $table->string('part_number')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_parts');
    }
};
