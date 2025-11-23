<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

uses(RefreshDatabase::class);

it('creates a token with valid credentials', function () {
    $password = 'secret123';
    $user = User::factory()->create([
        'password' => bcrypt($password),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => $password,
        'device_name' => 'test-device',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure(['token']);
});

it('does not create a token with invalid credentials', function () {
    $user = User::factory()->create(['password' => bcrypt('right-password')]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
        'device_name' => 'test-device',
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors('email');
});

it('allows access to protected route with valid token', function () {
    $user = User::factory()->create();

    $token = $user->createToken('test-token')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson('/api/conteudos');

    $response->assertStatus(200);
});

it('denies access to protected route without token', function () {
    $response = $this->getJson('/api/conteudos');
    $response->assertStatus(401);
});

it('revokes token on logout and then denies access', function () {
    $user = User::factory()->create();
    $token = $user->createToken('to-revoke')->plainTextToken;

    $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson('/api/conteudos')
        ->assertStatus(200);

    $logoutResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->postJson('/api/logout');

    $this->assertContains($logoutResponse->status(), [200, 204]);

    $this->app['auth']->forgetGuards();

    $afterResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson('/api/conteudos');

    $afterResponse->assertStatus(401);
});
