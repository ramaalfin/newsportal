<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::with(['category', 'user'])->orderByDesc('created_at')->paginate(10);

        return Inertia::render('Homepage', [
            'title' => 'Homepage',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        News::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => auth()->user()->id
        ]);

        return redirect()->back()->with('message', 'News has beed successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        $news->load('user', 'category');
        return Inertia::render('EditNews', [
            "title" => "Edit News",
            "myNews" => $news,
            "categories" => Category::orderBy('name')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id'
        ]);

        $news->update([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => Auth::id()
        ]);

        return redirect()->back()->with('message', 'News has been successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        // if ($news->user_id !== Auth::id()) {
        //     abort(403, 'Unauthorized');
        // }
        $news->delete();
        return redirect()->back()->with('message', 'News has been successfully deleted!');
    }
}
