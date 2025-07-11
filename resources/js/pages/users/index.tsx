"use client";

import * as React from "react";
import { router, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem, User } from "@/types";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { CreateUserModal } from "./partials/create-user";
import { Input } from "@/components/ui/input";



import {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';

interface IndexProps {
  users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard/',
  },
];

export default function Index({ users }: IndexProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const nameFilter = columnFilters.find(f => f.id === 'name')?.value as string || '';

const handleViewUser = (user: User) => {
    router.get(`/users/${user.id}`)
};

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="py-12">
        <Head title="Dashboard" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search users..."
                value={nameFilter}
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
              <CreateUserModal />
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable
              columns={columns({ 
                onViewUser: handleViewUser
              })}
              data={users}
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