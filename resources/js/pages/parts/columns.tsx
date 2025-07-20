"use client";

import type { Part } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = ({ 
  onViewPart,
}: { 
  onViewPart: (part: Part) => void; 
}): ColumnDef<Part>[] => [
  {
    accessorKey: 'part_number',
    header: 'Part Number',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const part = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onViewPart(part)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

];