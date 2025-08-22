<?php

namespace App\Models;

use Database\Factories\ProjectSkillFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectSkill extends Model
{
    /** @use HasFactory<ProjectSkillFactory> */
    use HasFactory;

    protected $fillable = [
        'project_id',
        'skill_id',
    ];
}
