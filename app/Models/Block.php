<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;


class Block extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'parent_id',
        'category',
        'name',
        'description',
        'image',
        'url',
        'file',
        'order',
        'is_active',
        'start_date',
        'end_date',
    ];

//    public function category(): BelongsTo
//    {
//        return $this->belongsTo(BlockCategory::class, 'category_id', 'id');
//    }

    public function children(): HasMany
    {
        return $this->hasMany(Block::class, 'parent_id', 'id');
    }

    public function translations(): HasMany
    {
        return $this->hasMany(BlockTranslation::class, 'block_id', 'id');
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'reference')->where('is_image', false);
    }

    public function images(): MorphMany
    {
        return $this->morphMany(File::class, 'reference')->where('is_image', true);
    }

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

    public function links(): HasMany
    {
        return $this->hasMany(Link::class, 'project_id', 'id');
    }




//    protected static function newFactory()
//    {
//        return BlockFactory::new();
//    }
}
