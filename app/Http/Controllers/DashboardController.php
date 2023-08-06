<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        $categories = Category::all();
        return Inertia::render('Dashboard', [
            'categories' => $categories,
            'myNews' => News::with(['category', 'user'])->where('user_id', auth()->user()->id)->orderByDesc('created_at')->get(),
        ]);
    }
}
