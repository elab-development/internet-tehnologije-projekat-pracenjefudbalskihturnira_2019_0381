<?php

use App\Http\Controllers\TournamentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/users', [UserController::class, 'index']);

Route::get('/users/{id}', [UserController::class, 'show']);

Route::get('/tournaments/{id}/teams', [TournamentController::class, 'showAllTeams']);

Route::get('/tournaments/{id}', [TournamentController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::delete('/teams/{id}/delete', [TeamController::class, 'destroy']);

    Route::post('/teams/{tournament_id}/create', [TeamController::class, 'create']);

    Route::put('/teams/{id}/edit', [TeamController::class, 'edit']);

    Route::post('/logout', [AuthController::class, 'logout']);
});