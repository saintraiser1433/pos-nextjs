import React from "react";
import { Input } from "../ui/input";
import { Table } from "@tanstack/react-table";

interface DataTableSearch<TData> {
  table: Table<TData>;
}

export function DataTableSearch<TData>({ table }: DataTableSearch<TData>) {
  return (
    <Input
      placeholder={"Search anything.."}
      value={(table.getState().globalFilter as string) ?? ""}
      onChange={(event) => table.setGlobalFilter(event.target.value)}
      className="max-w-lg h-8"
    />
  );
}
