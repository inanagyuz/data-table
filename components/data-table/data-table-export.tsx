'use client';

import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDataTableStore } from '@/components/data-table/store/dataTableStore';
import { exportExcel, exportExcelData } from '@/components/data-table/lib/exportExcel';
import { IDataTableExport } from '@/components/data-table/interface/IDataTable';
import { i18n } from '@/components/data-table/i18n';

export function DataTableExport<T>({ table, onUserExport }: IDataTableExport<T>) {
   const { exportProps } = useDataTableStore();
   const onPress = () => {
      const data = exportExcelData(
         table.options.data,
         table.getAllColumns(),
         exportProps?.excludeColumns ?? []
      );
      if (onUserExport) {
         onUserExport(data);
      } else {
         exportExcel(data, exportProps?.exportFileName ?? '');
      }
   };

   return (
      <Button
         onClick={onPress}
         aria-label="Export data"
         variant="ghost"
         size="sm"
         className="ml-auto hidden h-8 lg:flex text-slate-500"
      >
         <DownloadIcon className="mr-2 size-4" />
         {i18n.t('EXPORT')}
         <span className="sr-only"> {i18n.t('EXPORT')}</span>
      </Button>
   );
}
