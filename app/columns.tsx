'use client';

import * as React from 'react';
import { ColumnDef, Table } from '@tanstack/react-table';
import { Person } from '@/lib/makeData';
import { DataTableCheckBox } from '@/components/data-table/data-table-checkbox';
import { isWithinInterval } from 'date-fns';


export const columns: ColumnDef<Person>[] = [
   {
      id: 'select',
      header: ({ table }: { table: Table<Person> }) => (
         <div className={'pt-1'}>
            <DataTableCheckBox
               {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
               }}
            />
         </div>
      ),
      cell: ({ row }) => (
         <div className={'pt-1'}>
            <DataTableCheckBox
               {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
               }}
            />
         </div>
      ),
      size: 50,
   },
   {
      header: 'First Name',
      accessorKey: 'firstName',
      id: 'firstName',
      cell: (info) => info.getValue(),
      meta: {
         filterVariant: 'text', // veya 'select', 'range', 'date'
      },
      filterFn: (row, columnId, filterValue) => {
         const columnValue = row.getValue(columnId) as string;
         return columnValue.toLowerCase().includes(filterValue.toLowerCase());
      },
   },
   {
      accessorFn: (row) => row.lastName,
      id: 'lastName',
      cell: (info) => info.getValue(),
      header: 'Last Name',
   },
   {
      accessorKey: 'gender',
      id: 'gender',
      header: 'Gender',
      meta: {
         filterVariant: 'select',
      },
   },
   {
      accessorFn: (row) => row.jobType,
      id: 'jobType',
      cell: (info) => info.getValue(),
      header: 'Job Type',
   },
   {
      accessorFn: (row) => row.address,
      id: 'address',
      cell: (info) => info.getValue(),
      header: 'Address',
   },
   {
      accessorFn: (row) => row.locality,
      id: 'locality',
      cell: (info) => info.getValue(),
      header: 'Locality',
      meta: {
         filterVariant: 'select',
      },
   },
   {
      accessorFn: (row) => Number(row.age),
      id: 'age',
      header: 'Age',
      meta: {
         filterVariant: 'range',
      },
      filterFn: (row, columnId, filterValue) => {
         const columnValue = row.getValue(columnId) as number;
         const [from, to] = filterValue as [string, string];
         if (from && !to) {
            return columnValue >= Number(from);
         } else if (!from && to) {
            return columnValue <= Number(to);
         } else if (from && to) {
            return columnValue >= Number(from) && columnValue <= Number(to);
         }
         return true;
      },
   },
   {
      accessorFn: (row) => Number(row.visits),
      id: 'visits',
      header: 'Visits',
      meta: {
         filterVariant: 'range',
      },
      filterFn: (row, columnId, filterValue) => {
         const columnValue = row.getValue(columnId) as number;
         const [from, to] = filterValue as [string, string];
         if (from && !to) {
            return columnValue >= Number(from);
         } else if (!from && to) {
            return columnValue <= Number(to);
         } else if (from && to) {
            return columnValue >= Number(from) && columnValue <= Number(to);
         }
         return true;
      },
   },
   {
      accessorKey: 'status',
      id: 'status',
      header: 'Status',
      meta: {
         filterVariant: 'select',
      },
      filterFn: (row, columnId, filterValue) => {
         const columnValue = row.getValue(columnId);
         return columnValue === filterValue;
      },
   },
   {
      accessorKey: 'lastUpdate',
      id: 'lastUpdate',
      header: 'Last Update',
      cell: (info) => {
         const value = info.getValue();
         const date =
            value instanceof Date ? value : new Date(value as string | number | Date);
         return date.toLocaleDateString();
      },
      meta: {
         filterVariant: 'date',
      },
      filterFn: (row, columnId, filterValue) => {
         const columnDate = row.getValue(columnId) as Date;
         const { from, to } = filterValue;
         return isWithinInterval(columnDate, { start: from, end: to || from });
      },
   },
];