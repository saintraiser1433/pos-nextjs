"use client";

import { DataTableColumnHeader } from "@/components/datatable/dt-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Trash2 } from "lucide-react";
import { DataTableActions } from "@/components/datatable/dt-column-action";
import { Checkbox } from "@/components/ui/checkbox";
import { PartialProductBaseUnit, ProductBaseUnit } from "../types";

export const getBaseUnitsColumns = (
  setBaseUnitToDelete: React.Dispatch<
    React.SetStateAction<ProductBaseUnit | null>
  >,
  setBaseUnit: React.Dispatch<React.SetStateAction<PartialProductBaseUnit>>,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<ProductBaseUnit>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "#",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableActions<ProductBaseUnit>
        row={row}
        actions={[
          {
            label: "Edit Base Unit",
            icon: FileText,
            onClick: (unit) => {
              setIsUpdate(true);
              setBaseUnit(unit);
              setOpen(true);
            },
          },
          {
            label: "Delete Base Unit",
            icon: Trash2,
            destructive: true,
            onClick: async (unit) => {
              setBaseUnitToDelete(unit);
              setOpenAlert(true);
            },
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
