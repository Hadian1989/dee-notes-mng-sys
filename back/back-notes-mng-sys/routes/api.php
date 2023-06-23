<?php

use Illuminate\Support\Facades\Route;
use App\Models\Note;
use App\Http\Controllers\NoteController;
use App\Http\Resources\NoteResource;

// use App\Resources\NoteResource;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/notes',function (){
    return NoteResource::collection(Note::all());
});
Route::get('note/{id}',function ($id){
    return new NoteResource(Note::findorFail($id));
});
Route::post('notes',[NoteController::class,'store']);
Route::put('note/{id}',[NoteController::class,'update']);
Route::patch('note/{id}',[NoteController::class,'update']);
Route::delete('note/{id}',[NoteController::class,'destroy']);
