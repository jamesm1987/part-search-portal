<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Part;
use App\Http\Requests\PartCreateRequest;

use Illuminate\Support\Facades\Hash;

class PartController extends Controller
{
    public function index(Request $request): Response
    {
        $parts = Part::all();
        
        return Inertia::render('parts/index', [
            'parts' => $parts
        ]);
    }


    public function store(PartCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        
        $part = Part::create($validated);
        
        return to_route('parts.index')->with('toast', [
            'type' => 'success',
            'message' => 'Part created successfully',
        ]);
    }    
}
