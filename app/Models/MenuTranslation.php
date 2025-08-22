<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Website\Database\factories\MenuTranslationFactory;

class MenuTranslation extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'menu_id',
        'name',
        'slug',
        'html_text',
        'language',
        'is_active',
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
        return MenuTranslationFactory::new();
    }
}
