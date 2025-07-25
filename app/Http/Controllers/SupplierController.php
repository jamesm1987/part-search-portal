<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Supplier;
use App\Http\Requests\SupplierCreateRequest;

class SupplierController extends Controller
{
    public function index(Request $request): Response
    {
        $suppliers = Supplier::all();
        
        return Inertia::render('suppliers/index', [
            'suppliers' => $suppliers
        ]);
    }


    public function store(SupplierCreateRequest $request): RedirectResponse
    {   
        $validated = $request->validated();
        $supplier = Supplier::create($validated);
        
        return to_route('suppliers.index')->with('toast', [
            'type' => 'success',
            'message' => 'Supplier created successfully',
        ]);
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('suppliers/show', [
            'supplier' => $supplier
        ]);
    }
}
