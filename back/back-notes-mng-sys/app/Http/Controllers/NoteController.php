<?php

namespace App\Http\Controllers;
use App\Models\Note;
use Illuminate\Http\Request;


class NoteController extends Controller
{  /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $notes = Note::orderBy('id','desc')->paginate(5);
        return view('notes.index', compact('notes'));
    }

    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create()
    {
        return view('notes.create');
    }

      /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'text' => 'required',
        ]);
        
        Note::create($request->post());

        return redirect()->route('notes.index')->with('success','Note has been created successfully.');
    }

 /**
    * Display the specified resource.
    *
    * @param  \App\note  $note
    * @return \Illuminate\Http\Response
    */
    public function show(Note $note)
    {
        return view('notes.show',compact('note'));
    }
  /**
    * Show the form for editing the specified resource.
    *
    * @param  \App\Note  $note
    * @return \Illuminate\Http\Response
    */
    public function edit(Note $note)
    {
        return view('notes.edit',compact('note'));
    }

      /**
    * Update the specified resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \App\note  $note
    * @return \Illuminate\Http\Response
    */
    public function update(Request $request, Note $note)
    {
        $request->validate([
            'title' => 'required',
            'text' => 'required',
          
        ]);
        
        $note->fill($request->post())->save();

        return redirect()->route('notes.index')->with('success','Note Has Been updated successfully');
    }

        /**
    * Remove the specified resource from storage.
    *
    * @param  \App\Note  $note
    * @return \Illuminate\Http\Response
    */
    public function destroy(Note $note)
    {
        $note->delete();
        return redirect()->route('notes.index')->with('success','Note has been deleted successfully');
    }
}
