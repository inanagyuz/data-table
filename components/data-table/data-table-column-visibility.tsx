'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableViewOptionsProps } from '@/components/data-table/interface/IDataTable';
import {i18n } from '@/components/data-table/i18n';

export function DataTableColumnVisibility<TData>({ table }: DataTableViewOptionsProps<TData>) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               aria-label={i18n.t('VIEW')}
               variant="ghost"
               size="sm"
               className="ml-auto hidden h-8 lg:flex text-slate-500"
            >
               <MixerHorizontalIcon className="mr-2 size-4" />
               {i18n.t('VIEW')}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-40">
            {table
               .getAllColumns()
               .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
               .map((column) => {
                  return (
                     <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                     >
                        <span className="truncate">{String(column.columnDef.header)}</span>
                     </DropdownMenuCheckboxItem>
                  );
               })}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
