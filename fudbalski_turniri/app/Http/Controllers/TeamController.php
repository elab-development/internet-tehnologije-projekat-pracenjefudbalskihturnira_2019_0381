<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeamResource;
use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($tournament_id, Request $request)
    {
        $team = Team::create([
            'name' => $request->name,
            'year' => $request->year,
            'tournament_id' => $tournament_id,
        ]);

        return response()->json([
            'message' => 'Team has been created successfully',
            'team' => new TeamResource($team),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $team_id)
    {
        
        $team = Team::find($team_id);
    
        if (!$team) {
            return response()->json([
                'message' => 'Team ID does not exist',
            ], 404);
        }
    
       
        $team->name = $request->name;
        $team->year = $request->year;
    
        $team->save();
    
        return response()->json([
            'message' => 'Team updated successfully',
            'team' => $team,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($team_id)
    {
        $teamIds = array_values((array) Team::pluck('id'))[0];

        if(!in_array($team_id, $teamIds)){
            return response()->json([
                'message' => 'Team ID does not exist',
            ]);
        }

        $team = Team::find($team_id); 

        if (!$team->delete()) {
            return response()->json([
                'error' => 'Unable to delete the tournament'
            ]);
        }
        
        return response()->json([
            'message' => 'Team deleted successfully',
            'team' => new TeamResource($team),
        ]);
    }
    
}
