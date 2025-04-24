"use client";

import { DataTableColumnHeader } from "@/components/datatable/dt-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Trash2 } from "lucide-react";
import { DataTableActions } from "@/components/datatable/dt-column-action";
import { ProductCategory } from "@/types/products/categories";

export const columns: ColumnDef<ProductCategory>[] = [
  {
    accessorKey: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableActions<ProductCategory>
        row={row}
        actions={[
          {
            label: "View details",
            icon: FileText,
            onClick: (category) => console.log("View details", category),
          },
          {
            label: "Delete payment",
            icon: Trash2,
            destructive: true,
            onClick: (category) => console.log("Delete", category),
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
