<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
// use App\Http\Controllers\NoteController;
use App\Http\Controllers\AngularController;
Route::any('/{any}', [AngularController::class,'index'])->where('any','^(?!api).*$');

 
// Route::resource('notes', NoteController::class);
