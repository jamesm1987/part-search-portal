<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierPart extends Model
{    
    protected $fillable = [
        'part_id',
        'supplier_id',
        'part_number',
    ];
}
