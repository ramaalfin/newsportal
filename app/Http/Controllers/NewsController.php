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
        $news = News::with(['category', 'user'])->latest()->paginate(9);

        return Inertia::render('Homepage', [
            'title' => 'Homepage',
            'news' => $news
        ]);
    }

    public function myNews(){
        $categories = Category::all();
        $news = News::with(['category', 'user'])->where('user_id', auth()->user()->id)->latest()->paginate(9);
        return Inertia::render('News/MyNews', [
            'categories' => $categories,
            'myNews' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('News/Create', [
            'title' => "News Create",
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateNewsRequest $request)
    {
        $newsData = [
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => auth()->user()->id
        ];

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->storeAs('public/news', $image->hashName());
            $imageName = basename($imagePath);

            $newsData['image'] = $imageName;
            $newsData['image'] = Storage::url($imageName);
        }

        News::create($newsData);

        return redirect()->back()->with('message', 'News has been successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('News/Show', [
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
        return Inertia::render('News/Edit', [
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
        $news->delete();
        return redirect()->back()->with('message', 'News has been successfully deleted!');
    }
}
