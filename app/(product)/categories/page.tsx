"use client";

import { DataTable } from "@/components/datatable/data-table";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { getCategories } from "@/lib/test";
import { ProductCategory } from "@/types/products/categories";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { columns } from "./column";
import Link from "next/link";

const ProductCategories = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: 1,
  });
  return (
    <div className="">
      <DataTable columns={columns} data={data ?? []}>
        <Link href="/product/create">
          <Button className="cursor-pointer" variant="outline">
            <Box />
            Create Category
          </Button>
        </Link>
      </DataTable>
    </div>
  );
};

export default ProductCategories;
