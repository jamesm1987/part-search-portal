<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Supplier extends Model
{
    protected $fillable = [
        'name',
        'logo_path'
    ];

    public function parts()
    {
        return $this->hasMany(SupplierPart::class);
    }

    public function logoUrl(): ?string
    {
        return asset('storage/' . ltrim($this->logo_path, '/'));
    }

}
