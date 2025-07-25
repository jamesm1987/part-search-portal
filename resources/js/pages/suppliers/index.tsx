"use client";

import * as React from "react";
import { router, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem, Supplier } from "@/types";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { CreateSupplierModal } from "./partials/create-supplier";
import { Input } from "@/components/ui/input";



import {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';

interface IndexProps {
  suppliers: Supplier[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Suppliers',
    href: '/suppliers/',
  },
];

export default function Index({ suppliers }: IndexProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const supplierFilter = columnFilters.find(f => f.id === 'name')?.value as string || '';

const handleViewSupplier = (supplier: Supplier) => {
    router.get(`/suppliers/${supplier.id}`)
};

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="py-12">
        <Head title="Parts" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search suppliers..."
                value={supplierFilter}
                onChange={(e) => {
                  setColumnFilters([
                    ...columnFilters.filter(f => f.id !== 'name'),
                    { id: 'name', value: e.target.value },
                  ]);
                }}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <CreateSupplierModal />
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable
              columns={columns({ 
                onViewSupplier: handleViewSupplier
              })}
              data={suppliers}
              sorting={sorting}
              onSortingChange={setSorting}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}