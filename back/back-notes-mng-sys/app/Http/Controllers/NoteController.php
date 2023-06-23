<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Note::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Note::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Note::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if(Note::where('id',$id)->exists()){
            $note=Note::find($id);
            $note->title=$request->title;
            $note->text=$request->text;
            $note-> save();
            return response()-> json([
                "message"=> "record updated successfully"
            ],200);

        }else{
            return response()->json([
                "message"=> "Note not found"
            ],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Note::where('id',$id)->exists()){
            $note=Note::find($id);
            $note-> delete();
            return response()-> json([
                "message"=> "record deleted"
            ],202);

        }else{
            return response()->json([
                "message"=> "Note not found"
            ],404);
        }
    }
}
