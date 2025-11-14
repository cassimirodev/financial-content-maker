<?php

use App\Enum\ConteudoStatusEnum;
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
        Schema::create('conteudos', function (Blueprint $table) {
            $table->id();

            $table->string('topico');
            $table->text('conteudo');
            $table->string('status', 50)->default(ConteudoStatusEnum::ESCRITO);
            $table->text('motivo_reprovacao')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conteudos');
    }
};
