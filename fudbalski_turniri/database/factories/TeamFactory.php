<?php

namespace Database\Factories;

use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->name(),
            'year' => $this->faker->numberBetween(1990, 2023),
            'coach' => $this->faker->name(),
            'tournament_id' => $this->faker->randomElement(Tournament::pluck('id')),

        ];
    }
}
