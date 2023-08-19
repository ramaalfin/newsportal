<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateNewsRequest;
use App\Http\Requests\EditNewsRequest;
use App\Models\Category;
use App\Models\News;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::with(['category', 'user'])->latest()->paginate(10);

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
        $categories = Category::all();
        return Inertia::render('Post/Create', [
            'title' => "Post Create",
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateNewsRequest $request)
    {
        // upload image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->storeAs('public/news', $image->hashName());
            $imageName = basename($imagePath);
        }

        $news = News::create([
            'image' => $imageName,
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => auth()->user()->id
        ]);

        $news->image = Storage::url($imageName);

        return redirect()->back()->with('message', 'News has beed successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('Post/Show', [
            'title' => "Detail News",
            'news' => $news,
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        $news->load('user', 'category');
        return Inertia::render('Post/Edit', [
            "title" => "Edit News",
            "myNews" => $news,
            "categories" => Category::orderBy('name')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditNewsRequest $request, News $news)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->storeAs('public/news', $image->hashName());
            $imageName = basename($imagePath);

            Storage::delete('public/news/' . $news->image);

            $news->update([
                'image' => $imageName,
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'user_id' => Auth::id()
            ]);
        } else {
            $news->update([
                'title' => $request->title,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'user_id' => Auth::id()
            ]);
        }

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
