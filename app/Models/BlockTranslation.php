<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Website\Database\factories\BlockTranslationFactory;
use Cviebrock\EloquentSluggable\Sluggable;

class BlockTranslation extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'block_id',
        'name',
        'description',
        'brief',
        'slug',
        'language',
        'is_visible',
    ];

    public function sluggable(): array
    {
        // TODO: Implement sluggable() method.
        Return [
            'slug' => [
                'source' => 'name',
            ],
        ];

    }

    protected static function newFactory()
    {
        return BlockTranslationFactory::new();
    }
}
