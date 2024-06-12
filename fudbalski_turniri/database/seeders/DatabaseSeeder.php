<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        
        User::truncate();
        Tournament::truncate();
        Team::truncate();
        
        Schema::enableForeignKeyConstraints();

        User::factory(10)->create();
        Tournament::factory(4)->create();
        Team::factory(12)->create();
    }
}
