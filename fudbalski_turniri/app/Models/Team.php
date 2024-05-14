<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Team extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'year'];

    public function tournaments(): BelongsToMany
    {
        return $this->belongsToMany(Tournament::class);
    }
}
