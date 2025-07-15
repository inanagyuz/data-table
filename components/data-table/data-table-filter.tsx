'use client';

import { Column } from '@tanstack/react-table';
import * as React from 'react';
import { useMemo } from 'react';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { DataTableInput } from '@/components/data-table/data-table-input';
import { i18n } from '@/components/data-table/i18n';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTableFilter({ column }: { column: Column<any, unknown> }) {
   const { filterVariant } = column.columnDef.meta ?? {};

   const columnFilterValue = column.getFilterValue();

   const sortedUniqueValues = useMemo(
      () =>
         filterVariant === 'range'
            ? []
            : Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [column.getFacetedUniqueValues(), filterVariant]
   );

   return filterVariant === 'range' ? (
      <div>
         <div className="flex flex-row justify-between space-x-2">
            <DataTableInput
               type="number"
               min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
               max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
               value={(columnFilterValue as [number, number])?.[0] ?? ''}
               onChange={(value) =>
                  column.setFilterValue((old: [number, number]) => [value, old?.[1]])
               }
               placeholder={`Min ${
                  column.getFacetedMinMaxValues()?.[0] !== undefined
                     ? `(${column.getFacetedMinMaxValues()?.[0]})`
                     : ''
               }`}
               className="w-6/12 border shadow-sm rounded"
            />
            <DataTableInput
               type="number"
               min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
               max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
               value={(columnFilterValue as [number, number])?.[1] ?? ''}
               onChange={(value) =>
                  column.setFilterValue((old: [number, number]) => [old?.[0], value])
               }
               placeholder={`Max ${
                  column.getFacetedMinMaxValues()?.[1]
                     ? `(${column.getFacetedMinMaxValues()?.[1]})`
                     : ''
               }`}
               className="w-6/12 border shadow-sm rounded"
            />
         </div>
         <div className="h-1" />
      </div>
   ) : filterVariant === 'select' ? (
      <Select
         onValueChange={(e) => column.setFilterValue(e === '*' ? '' : e)}
         value={columnFilterValue?.toString()}
      >
         <SelectTrigger className="w-full">
            <SelectValue placeholder={i18n.t('ALL')} />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value={'*'} key={'all'}>
               {i18n.t('ALL')}
            </SelectItem>
            {sortedUniqueValues.map((value) => (
               <SelectItem value={value} key={value}>
                  {value}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   ) : (
      <>
         <datalist id={column.id + 'list'}>
            {sortedUniqueValues.map((value: string | number) => (
               <option value={value} key={value} />
            ))}
         </datalist>
         <DataTableInput
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`${i18n.t('SEARCH')}... (${column.getFacetedUniqueValues().size})`}
            className="w-full border shadow-sm rounded"
            list={column.id + 'list'}
         />
         <div className="h-1" />
      </>
   );
}
