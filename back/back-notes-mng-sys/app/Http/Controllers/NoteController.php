<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Note::all();
        return Note::orderBy('id')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'photo' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);
        if ($request->hasFile('photo') && !$request->file('photo')->isValid()) {
            return response()->json('{"error":"please provide an image"}');
        }
        try {

            $photo = $request->file('photo');
            $filename = $photo->getClientOriginalName();
            $filenameonly = pathinfo($filename, PATHINFO_FILENAME);
            $extension = $request->file('photo')->getClientOriginalExtension();
            $completePhoto = str_replace(' ', '_', $filenameonly) . '_' . rand() . '_' . time() . '.' . $extension;
            $path = $photo->storeAs('public/images', $completePhoto);

            $data = Note::create([
                'title' => $request->title,
                'text' => $request->text,
                'photo' => $completePhoto,

            ]);
            return response($data);
        } catch (\Exception $e) {
            return response()->json($e);
        }
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
        if ($request->hasFile('photo') && !$request->file('photo')->isValid()) {
            return response()->json('{"error":"please provide an image"}');
        };
        $this->validate($request, [

            'photo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);



        if (Note::where('id', $id)->exists()) {
            try {

                $note = Note::find($id);
                if ($request->hasFile('photo')) {
                    if ($request->hasFile('photo') && $note->photo) {
                        Storage::delete($note->photo);
                    }
                    $photo = $request->file('photo');
                    $filename = $photo->getClientOriginalName();
                    $filenameonly = pathinfo($filename, PATHINFO_FILENAME);
                    $extension = $request->file('photo')->getClientOriginalExtension();

                    $completePhoto = str_replace(' ', '-', $filenameonly) . '-' . rand() . '-' . time() . '.' . $extension;

                    $path = $photo->storeAs('public/images', $completePhoto);
                    $note->photo = $path;
                }
                $note->title = $request->title;
                $note->text = $request->text;

                $note->save();
                return response($note);
            } catch (\Exception $e) {
                return response()->json($e);
            }
        } else {
            return response()->json([
                "message" => "Note not found"
            ], 404);
        };
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (Note::where('id', $id)->exists()) {
            $note = Note::find($id);
            $note->delete();
            return response()->json([
                "message" => "record deleted"
            ], 202);
        } else {
            return response()->json([
                "message" => "Note not found"
            ], 404);
        }
    }
    public function searchByTitle(Request $request)
    {
        $searchTerm = $request->input('title');

        // Perform the search query
        $notes = Note::where('title', 'LIKE', "%{$searchTerm}%")->get();

        // Pass the results to the view or return a JSON response
        return view('notes.index', compact('notes'));
        // Alternatively, you can return a JSON response:
        // return response()->json($notes);
    }
}
