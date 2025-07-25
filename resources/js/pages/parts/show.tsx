"use client";

import * as React from "react";
import { router, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem, Part } from "@/types";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { CreatePartModal } from "./partials/create-part";
import { Input } from "@/components/ui/input";



import {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';

interface IndexProps {
  part: Part;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Parts',
    href: '/parts/',
  },
];

export default function Show({ part }: IndexProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const partNumberFilter = columnFilters.find(f => f.id === 'part_number')?.value as string || '';

const handleViewPart = (part: Part) => {
    router.get(`/parts/${part.id}`)
};

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="py-12">
        <Head title="Parts" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search parts..."
                value={partNumberFilter}
                onChange={(e) => {
                  setColumnFilters([
                    ...columnFilters.filter(f => f.id !== 'part_number'),
                    { id: 'part_number', value: e.target.value },
                  ]);
                }}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <CreatePartModal />
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable
              columns={columns({ 
                onViewPart: handleViewPart
              })}
              data={parts}
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