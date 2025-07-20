<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Part extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'part_number',
        'status',
    ];

    public function aliases()
    {
        return $this->hasMany(PartAlias::class);
    }

    public function superseededBy()
    {
        return $this->hasOne(PartSupersession::class, 'old_part_id');
    }

    public function supercedes()
    {
        return $this->hasMany(PartSupression::class, 'new_part_id');
    }

    public function suppersessions()
    {
        return $this->hasMany(SuperSession::class, 'current_part_id');
    }
}
