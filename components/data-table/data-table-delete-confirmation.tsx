'use client';

import React, { ReactNode } from 'react';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { i18n } from '@/components/data-table/i18n';

export function RequestDeleteConfirmation({
   children,
   onConfirm,
   multiple,
}: {
   children: ReactNode;
   onConfirm: () => void;
   multiple?: boolean;
}) {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild={false} className={'w-full'}>
            {children}
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  {i18n
                     .t('CONFIRM_DELETE_TITLE')
                     .replace(
                        '{target}',
                        multiple ? i18n.t('ALL_SELECTED_ROWS') : i18n.t('SELECTED_ROW')
                     )}
               </AlertDialogTitle>
               <AlertDialogDescription>
                  {i18n
                     .t('CONFIRM_DELETE_DESC')
                     .replace(
                        '{target}',
                        multiple ? i18n.t('ALL_SELECTED_ROWS') : i18n.t('SELECTED_ROW')
                     )}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>{i18n.t('CANCEL')}</AlertDialogCancel>
               <AlertDialogAction onClick={onConfirm}>{i18n.t('DELETE')}</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
