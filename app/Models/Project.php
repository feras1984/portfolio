<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Block
{
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(
            Block::class,
            ProjectSkill::class,
            'project_id',
            'skill_id',
            'id'
        );
    }

    public function libraries(): BelongsToMany
    {
        return $this->belongsToMany(
            Block::class,
            ProjectLibrary::class,
            'project_id',
            'library_id',
            'id',
        );
    }
}
