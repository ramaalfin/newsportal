<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', [NewsController::class, 'index'])->name('home');
    Route::get('/myNews', [NewsController::class, 'myNews'])->middleware(['auth', 'verified'])->name('myNews');
    Route::resource('news', NewsController::class)->middleware(['auth', 'verified']);
    Route::resource('category', CategoryController::class)->middleware(['auth', 'verified']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
