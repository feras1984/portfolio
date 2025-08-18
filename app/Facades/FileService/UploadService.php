<?php

namespace App\Facades\FileService;

use Illuminate\Support\Facades\Facade;

class UploadService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'UploadService'; }
}
