// components/datatable/table-actions.tsx
'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Copy, User, FileText, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import React from 'react'

interface TableAction<TData> {
  label: string
  onClick: (data: TData) => void
  icon?: React.ComponentType<{ className?: string }>
  separatorBefore?: boolean
  destructive?: boolean
}

interface TableActionsProps<TData> {
  row: {
    original: TData
  }
  actions: TableAction<TData>[]
}

export function DataTableActions<TData>({ row, actions }: TableActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.separatorBefore && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => action.onClick(row.original)}
              className={cn(
                'flex items-center gap-2',
                action.destructive && 'text-destructive'
              )}
            >
              {action.icon && <action.icon className="h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
            </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}