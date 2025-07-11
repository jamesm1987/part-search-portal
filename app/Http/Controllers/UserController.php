<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Http\Requests\UserCreateRequest;

use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::all();
        
        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }


    public function store(UserCreateRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        
        $user = User::create($validated);
        
        return to_route('users.index')->with('toast', [
            'type' => 'success',
            'message' => 'User created successfully',
        ]);
    }    
}
