<?php

namespace App\Http\Controllers;

use App\Http\Resources\TournamentResource;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class TournamentController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Tournament::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    /*
    public function create(Request $request)
    {
        
       
        $tournament = Tournament::create([
            'Tournament_name' => $request->Tournament_name,
            //'user_id' => Auth::user()->id,
        ]);

        return response()->json([
            'message' => 'Tournament has been created successfully',
            'tournament' => new TournamentResource($tournament),
        ]);
    }
    */
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
    public function show($tournament_id)
    {
        return new TournamentResource(Tournament::find($tournament_id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $tournament_id)
     {
        
    //     $tournamentIds = array_values((array) Tournament::pluck('id'))[0];

    //     if(!in_array($tournament_id, $tournamentIds)){
    //         return response()->json([
    //             'message' => 'Tournament ID does not exist',
    //         ]);
    //     }
        

    //     $tournament = Tournament::find($tournament_id);
    //     //$tournament->user_id = Auth::user()->id;
    //     $tournament->Tournament_name = $request->Tournament_name;
        
        

    //     $tournament->save();

    //     return response()->json([
    //         'message' => 'Tournament updated successfully',
    //         'Tournament' => new TournamentResource($tournament),
    //     ]);
     }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tournament $tournament)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($tournament_id)
    {
        // $tournamentIds = array_values((array) Tournament::pluck('id'))[0];

        // if(!in_array($tournament_id, $tournamentIds)){
        //     return response()->json([
        //         'message' => 'Tournament ID does not exist',
        //     ]);
        // }

        // $tournament = Tournament::find($tournament_id); 

        // if (!$tournament->delete()) {
        //     return response()->json([
        //         'error' => 'Unable to delete the tournament'
        //     ]);
        // }
        
        // return response()->json([
        //     'message' => 'Tournament deleted successfully',
        //     'tournament' => new TournamentResource($tournament),
        // ]);
    }
    public function showAllTeams($tournament_id)
    { 
        $teams = Team::where('tournament_id', $tournament_id)->get()->makeHidden(['created_at', 'updated_at']);
        return $teams;
    }

}
