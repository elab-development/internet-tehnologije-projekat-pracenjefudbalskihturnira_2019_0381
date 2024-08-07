<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Team extends Model
{
    use HasFactory;
    protected $fillable = [ 'name', 'year', 'coach', 'tournament_id'];

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }
}
