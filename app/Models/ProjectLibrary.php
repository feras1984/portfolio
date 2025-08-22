<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectLibrary extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectLibraryFactory> */
    use HasFactory;

    protected $fillable = [
        'project_id',
        'library_id',
    ];
}
