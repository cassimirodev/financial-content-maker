<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\ConteudoController;


Route::post('/conteudos/gerar', [ConteudoController::class, 'gerar'])
    ->name('conteudos.gerar');

Route::get('/conteudos', [ConteudoController::class, 'index'])
    ->name('conteudos.index');

Route::get('/conteudos/{conteudo}', [ConteudoController::class, 'show'])
    ->name('conteudos.show');

Route::put('/conteudos/{conteudo}', [ConteudoController::class, 'update'])
    ->name('conteudos.update');

Route::delete('/conteudos/{conteudo}', [ConteudoController::class, 'destroy'])
    ->name('conteudos.destroy');

Route::post('/conteudos/{conteudo}/aprovar', [ConteudoController::class, 'aprovar'])
    ->name('conteudos.aprovar');

Route::post('/conteudos/{conteudo}/reprovar', [ConteudoController::class, 'reprovar'])
    ->name('conteudos.reprovar');
