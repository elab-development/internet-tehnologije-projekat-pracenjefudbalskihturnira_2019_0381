<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        Schema::disableForeignKeyConstraints();

        
        DB::table('users')->truncate();
        DB::table('tournaments')->truncate();
        DB::table('teams')->truncate();

        
        Schema::enableForeignKeyConstraints();

       
        User::factory(5)->create();
        Tournament::factory(4)->create();
        Team::factory(24)->create();
    }
}
