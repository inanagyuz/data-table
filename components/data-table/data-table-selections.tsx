'use client';

import { Button } from '@/components/ui/button';
import { ListChecksIcon, ListXIcon } from 'lucide-react';
import { useDataTableStore } from '@/components/data-table/store/dataTableStore';
import { Table } from '@tanstack/react-table';
import { i18n } from '@/components/data-table/i18n';

export function DataTableSelections<T>({ table }: { table: Table<T> }) {
   const { toggleSelection, isSelecting } = useDataTableStore();
   const onPress = () => {
      toggleSelection();
      table.resetRowSelection();
   };
   return (
      <Button
         onClick={onPress}
         aria-label="Toggle selection"
         variant="ghost"
         size="sm"
         className="ml-auto hidden h-8 lg:flex text-slate-500"
      >
         {isSelecting ? (
            <ListXIcon className="mr-2 size-4" />
         ) : (
            <ListChecksIcon className="mr-2 size-4" />
         )}
         {isSelecting ? i18n.t('RESET_ROWS') : i18n.t('SELECT_ROWS')}
      </Button>
   );
}
