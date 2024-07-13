<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tournament extends Model
{
    use HasFactory;
    protected $fillable = [ 'Tournament_name', 'user_id', 'year'];

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class);
    }

    
}

