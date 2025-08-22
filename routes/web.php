<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\Language;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});
//
//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');
//
//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});
//
//require __DIR__.'/auth.php';

Route::get('/', function () {
    return redirect(\app()->getLocale() . '/home');
})->name('home');

Route::middleware(Language::class)->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home');
//    Route::get('/block/{category}', [BlockController::class, 'index']);
//    Route::get('/block/details/{category}/{block}', [BlockController::class, 'show']);
});

Route::post('/send-email', [NotificationController::class, 'sendUserEmail']);

require __DIR__.'/file.web.php';
