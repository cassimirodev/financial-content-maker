<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Conteudo;
use App\Enums\ConteudoStatusEnum;


it('can list all conteudos', function () {
    Conteudo::factory()->count(3)->create();

    $response = $this->getJson('/api/conteudos');

    $response->assertStatus(200)
        ->assertJsonCount(3);
});

it('can create a conteudo', function () {
    $data = [
        'papel' => 'redator',
        'conteudo' => 'Este é um conteúdo com mais de vinte caracteres para passar na validação.'
    ];

    $response = $this->postJson('/api/conteudos', $data);

    $response->assertStatus(201)
        ->assertJsonFragment($data);

    $this->assertDatabaseHas('conteudos', $data);
});

it('fails to create a conteudo with invalid data', function () {
    $data = [
        'papel' => 'redator',
        'conteudo' => 'conteudo curto'
    ];

    $response = $this->postJson('/api/conteudos', $data);

    $response->assertStatus(422)
        ->assertJsonValidationErrors('conteudo');
});

it('can show a specific conteudo', function () {
    $conteudo = Conteudo::factory()->create();

    $response = $this->getJson("/api/conteudos/{$conteudo->id}");

    $response->assertStatus(200)
        ->assertJsonFragment(['id' => $conteudo->id]);
});

it('can approve a conteudo', function () {
    $conteudo = Conteudo::factory()->create(['status' => ConteudoStatusEnum::ESCRITO]);

    $response = $this->postJson("/api/conteudos/{$conteudo->id}/aprovar");

    $response->assertStatus(200)
        ->assertJsonFragment(['status' => ConteudoStatusEnum::APROVADO]);

    $this->assertDatabaseHas('conteudos', [
        'id' => $conteudo->id,
        'status' => ConteudoStatusEnum::APROVADO
    ]);
});

it('can reprove a conteudo', function () {
    $conteudo = Conteudo::factory()->create(['status' => ConteudoStatusEnum::ESCRITO]);
    $motivo = 'Este é o motivo da reprovação com mais de 20 caracteres.';

    $response = $this->postJson("/api/conteudos/{$conteudo->id}/reprovar", [
        'motivo_reprovacao' => $motivo
    ]);

    $response->assertStatus(200)
        ->assertJsonFragment([
            'status' => ConteudoStatusEnum::REPROVADO,
            'motivo_reprovacao' => $motivo
        ]);
});

it('can delete a conteudo', function () {
    $conteudo = Conteudo::factory()->create();

    $response = $this->deleteJson("/api/conteudos/{$conteudo->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('conteudos', ['id' => $conteudo->id]);
});
