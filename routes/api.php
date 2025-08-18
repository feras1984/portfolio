<?php

use App\Http\Controllers\Admin\BlockController;
use Illuminate\Support\Facades\Route;

Route::get('get-blocks/{category}', [BlockController::class, 'getActiveBlocks']);
