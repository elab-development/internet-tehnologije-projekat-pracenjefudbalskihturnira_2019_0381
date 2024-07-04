<?php

namespace Database\Factories;

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
            'league' => $this->faker->randomElement(['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1']),
            'coach' => $this->faker->name(),


        ];
    }
}
