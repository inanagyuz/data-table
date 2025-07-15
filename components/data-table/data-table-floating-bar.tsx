'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { DownloadIcon, ListXIcon, TrashIcon, XIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { exportExcel, exportExcelData } from '@/components/data-table/lib/exportExcel';
import { useDataTableStore } from '@/components/data-table/store/dataTableStore';
import { IDataTableFloatingBar } from '@/components/data-table/interface/IDataTable';
import { format } from 'date-fns';
import { RequestDeleteConfirmation } from '@/components/data-table/data-table-delete-confirmation';
import { i18n } from '@/components/data-table/i18n';

export function DataTableFloatingBar<T>({
   table,
   onUserExport,
   onDelete,
}: IDataTableFloatingBar<T>) {
   const { exportProps } = useDataTableStore();
   const isFiltered = table.getState().columnFilters.length > 0 || !!table.getState().globalFilter;
   const isRowSelected = table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const naming: { [k: string]: any } = {};
   for (let i = 0; i < table.options.columns.length; i++) {
      const col = table.options.columns[i];
      naming[col.id as string] = col.header as string;
   }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const currentFilters = table.getState().columnFilters.map((item: any) => {
      const fieldName = naming[item.id];
      if (item.value instanceof Array) {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         item.value = item.value.map((ii: any) => (!ii ? '♾️' : ii));
         // range filter
         return {
            columnId: item.id,
            filter: i18n
               .t('IN_RANGE_OF')
               .replace('{field}', fieldName)
               .replace('{range}', item.value.join(' - ')),
         };
      }
      if (typeof item.value === 'string') {
         // either search string or select
         return {
            columnId: item.id,
            filter: i18n
               .t('EQUALS_OR_CONTAINS')
               .replace('{field}', fieldName)
               .replace('{value}', item.value),
         };
      }
      if (typeof item.value === 'object' && item.value !== null && !(item.value instanceof Array)) {
         if (Object.keys(item.value).includes('from')) {
            // datetime
            if (typeof item.value.from === 'string') {
               // parseISO yerine new Date() kullanarak daha esnek ayrıştırma yapın
               const fromDate = new Date(item.value.from);
               const toDate = new Date(item.value.to);
               // Tarihlerin geçerli olup olmadığını kontrol edin
               if (!isNaN(fromDate.getTime())) {
                  item.value.from = format(fromDate, 'yyyy/MM/dd');
               }
               if (item.value.to && !isNaN(toDate.getTime())) {
                  item.value.to = format(toDate, 'yyyy/MM/dd');
               }
            } else {
               item.value.from = format(item.value.from, 'yyyy/MM/dd');
               if (item.value.to) {
                  item.value.to = format(item.value.to, 'yyyy/MM/dd');
               }
            }
            return {
               columnId: item.id,
               filter: i18n
                  .t('IS_BETWEEN')
                  .replace('{field}', fieldName)
                  .replace('{from}', item.value.from)
                  .replace('{to}', item.value.to || i18n.t('NOW')),
            };
         }
      }
      return item;
   });
   const onRemoveColumnFilter = (columnId: string) => {
      table.setColumnFilters(table.getState().columnFilters.filter((item) => item.id !== columnId));
   };
   const onPressResetFilter = () => {
      table.resetColumnFilters();
      table.resetGlobalFilter();
   };
   const onDeleteInner = () => {
      const rows = table.getSelectedRowModel().rows.map((item) => item.original);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onDelete && onDelete(rows);
   };
   const onExport = () => {
      const rows = table.getSelectedRowModel().rows.map((item) => item.original);
      const data = exportExcelData(rows, table.getAllColumns(), exportProps?.excludeColumns ?? []);
      if (onUserExport) {
         onUserExport(data);
      } else {
         exportExcel(data, exportProps?.exportFileName ?? '');
      }
   };

   return (
      <div className="fixed inset-x-0 bottom-4 z-50 w-full px-4">
         <div className="w-full overflow-x-auto space-y-2">
            {isFiltered && (
               <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
                  <div className="flex h-7 items-center rounded-md border ">
                     <Button
                        onClick={onPressResetFilter}
                        variant={'default'}
                        size={'sm'}
                        className={'h-8'}
                     >
                        <XIcon className={'w-4 h-4 mr-1'} />
                        {i18n.t('CLEAR_FILTERS')}
                     </Button>
                  </div>
                  {currentFilters.length > 0 ? '●' : ''}
                  {currentFilters.length > 0 &&
                     currentFilters.map(
                        (
                           f: {
                              columnId: string;
                              filter: string;
                           },
                           index: number
                        ) => (
                           <Button
                              onClick={() => onRemoveColumnFilter(f.columnId)}
                              key={String(index).concat('--filter')}
                              variant={'outline'}
                              size={'sm'}
                              className={'h-8'}
                           >
                              <XIcon className={'w-4 h-4 mr-1'} />
                              {f.filter}
                           </Button>
                        )
                     )}
               </div>
            )}
            {isRowSelected && (
               <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
                  <div className="flex h-7 items-center rounded-md border ">
                     <Button
                        onClick={() => table.resetRowSelection()}
                        variant={'default'}
                        size={'sm'}
                        className={'h-8'}
                     >
                        <ListXIcon className={'w-4 h-4 mr-1'} />
                        {i18n.t('CLEAR_FILTERS')}
                     </Button>
                  </div>
                  ●
                  {isRowSelected && onDelete !== undefined ? (
                     <Tooltip>
                        <TooltipTrigger>
                           <RequestDeleteConfirmation multiple={true} onConfirm={onDeleteInner}>
                              <Button variant={'destructive'} size={'icon'} className={'h-8'}>
                                 <TrashIcon className={'w-4 h-4'} />
                              </Button>
                           </RequestDeleteConfirmation>
                        </TooltipTrigger>
                        <TooltipContent>
                           <p> {i18n.t('DELETE_CURRENT_ROWS')}</p>
                        </TooltipContent>
                     </Tooltip>
                  ) : null}
                  <Tooltip>
                     <TooltipTrigger>
                        <Button
                           onClick={onExport}
                           variant={'default'}
                           size={'icon'}
                           className={'h-8'}
                        >
                           <DownloadIcon className={'w-4 h-4'} />
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p> {i18n.t('EXPORT_CURRENT_ROWS')}</p>
                     </TooltipContent>
                  </Tooltip>
               </div>
            )}
         </div>
      </div>
   );
}
