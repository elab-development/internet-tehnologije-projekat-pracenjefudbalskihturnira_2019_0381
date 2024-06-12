<?php

use App\Http\Controllers\TournamentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/users', [UserController::class, 'index']);

Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/users/{id}/tournaments', [UserController::class, 'showAllTournaments']);

Route::get('/tournaments/{id}', [TournamentController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::delete('/tournaments/{id}/delete', [TournamentController::class, 'destroy']);

    Route::post('/tournaments/create', [TournamentController::class, 'create']);

    Route::put('/tournaments/{id}/edit', [TournamentController::class, 'edit']);

    Route::post('/logout', [AuthController::class, 'logout']);
});