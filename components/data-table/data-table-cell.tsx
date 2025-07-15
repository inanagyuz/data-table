'use client';

import { flexRender } from '@tanstack/react-table';
import { useSortable } from '@dnd-kit/sortable';
import * as React from 'react';
import { CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { TableCell } from '@/components/ui/table';
import { getCommonPinningStyles } from '@/components/data-table/lib/columns';
import {
   ContextMenu,
   ContextMenuContent,
   ContextMenuItem,
   ContextMenuSeparator,
   ContextMenuSub,
   ContextMenuSubContent,
   ContextMenuSubTrigger,
   ContextMenuTrigger,
} from '@/components/ui/context-menu';
import _ from 'lodash';
import { useDataTableStore } from '@/components/data-table/store/dataTableStore';
import { IDataTableCellEdit } from '@/components/data-table/interface/IDataTable';
import { DataTableEditRow } from '@/components/data-table/data-table-edit-row';
import { RequestDeleteConfirmation } from '@/components/data-table/data-table-delete-confirmation';
import { i18n } from '@/components/data-table/i18n';

export function DataTableCell<T>({ cell }: IDataTableCellEdit<T>) {
   const { isDragging, setNodeRef, transform } = useSortable({
      id: cell.column.id,
   });
   const { contextMenuProps, isSelecting } = useDataTableStore();
   const pinStyle = getCommonPinningStyles(cell.column);
   const combinedStyle: CSSProperties = {
      opacity: isDragging ? 0.8 : 1,
      position: 'relative',
      transform: CSS.Translate.toString(transform),
      transition: 'width transform 0.2s ease-in-out',
      width: cell.column.getSize(),
      zIndex: isDragging ? 1 : 0,
      ...(pinStyle || {}),
      alignContent: 'center',
   };
   const onContextMenuItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      handler?: (probably: T) => void
   ) => {
      event.stopPropagation();
      if (handler) {
         handler(cell.row.original);
      }
   };
   const showContextMenu = isSelecting !== true && contextMenuProps !== undefined;
   if (showContextMenu) {
      return (
         <TableCell style={combinedStyle} ref={setNodeRef}>
            <ContextMenu>
               <ContextMenuTrigger className={'block'}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
               </ContextMenuTrigger>
               <ContextMenuContent className="w-36">
                  {contextMenuProps.enableEdit && (
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     <DataTableEditRow presetData={cell.row.original as { [k: string]: any }} />
                  )}
                  {!_.isEmpty(contextMenuProps?.extra) && <ContextMenuSeparator />}
                  {!_.isEmpty(contextMenuProps?.extra) && (
                     <ContextMenuSub>
                        <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                           {Object.keys(contextMenuProps?.extra).map((name, index) => (
                              <ContextMenuItem                                 
                                 onClick={(event) =>
                                    onContextMenuItemClick(event, contextMenuProps.extra?.[name])
                                 }
                                 key={'Sub-data-table-context-menu-item-'.concat(index.toString())}
                              >
                                 {name}
                              </ContextMenuItem>
                           ))}
                        </ContextMenuSubContent>
                     </ContextMenuSub>
                  )}
                  {contextMenuProps.enableDelete && <ContextMenuSeparator />}
                  {contextMenuProps.enableDelete && (
                     <RequestDeleteConfirmation
                        onConfirm={() => contextMenuProps.onDelete(cell.row.original)}
                        multiple={false}
                     >
                        <div
                           className={
                              'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 hover:bg-accent'
                           }
                        >
                           <span className={'text-red-500'}>{i18n.t('DELETE_ROW')}</span>
                        </div>
                     </RequestDeleteConfirmation>
                  )}
               </ContextMenuContent>
            </ContextMenu>
         </TableCell>
      );
   }
   return (
      <TableCell style={combinedStyle} ref={setNodeRef}>
         {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
   );
}
