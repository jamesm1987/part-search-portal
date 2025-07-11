<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::all();
        
        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }
}
