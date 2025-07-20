<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supersession extends Model
{
    protected $fillable = [
        'old_part_id', 
        'new_part_id'
    ];

    public function part()
    {
        return $this->belongsTo(Part::class);
    }
}
