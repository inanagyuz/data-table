'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { DataTableStoreProvider } from '@/components/data-table/store/dataTableStoreProvider';

export function Providers({ children }: { children: React.ReactNode }) {
   return (
      <TooltipProvider>
         <DataTableStoreProvider isSelecting={false}>{children}</DataTableStoreProvider>
      </TooltipProvider>
   );
}
