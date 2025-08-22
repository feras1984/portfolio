<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;

Route::get('/file/categories/{img_name}', [ImageController::class, 'getCategoryImg']);
Route::get('/file/products/{img_name}', [ImageController::class, 'getProductImg']);
Route::get('/file/blocks/{img_name}', [ImageController::class, 'getBlockImg']);
Route::get('/file/menus/{file_name}', [ImageController::class, 'getMenuFile']);
Route::get('/file/logo', [ImageController::class, 'getLogoImg']);
Route::get('/file/users/{img_name}', [ImageController::class, 'getUserImg']);
Route::get('/file/uploads/{img_name}', [ImageController::class, 'getUploadImg']);
Route::get('/file/defaults/{img_name}', [ImageController::class, 'getDefaultImg']);
