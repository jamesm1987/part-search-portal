<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'name',
        'logo_path'
    ];

    public function parts()
    {
        return $this->hasMany(PartAlias::class);
    }

    public function supersessions()
    {
        return $this->hasMany(PartAlias::class, 'current_part_id');
    }
}
