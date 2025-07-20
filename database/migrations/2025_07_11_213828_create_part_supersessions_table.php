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
        Schema::create('supersessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('old_part_id')->constrained('parts')->cascadeOnDelete();
            $table->foreignId('new_part_id')->constrained('parts')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['old_part_id', 'new_part_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('part_alias');
    }
};
