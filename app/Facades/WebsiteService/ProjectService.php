<?php

namespace App\Facades\WebsiteService;

use Illuminate\Support\Facades\Facade;

class ProjectService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'ProjectService'; }

}
