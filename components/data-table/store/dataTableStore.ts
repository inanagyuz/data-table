import { createContext, useContext } from 'react';
import { combine } from 'zustand/middleware';
import { createStore as createZustandStore, useStore as useZustandStore } from 'zustand';
import {
   TDataTableAddDataProps,
   TDataTableContextMenuProps,
   TDataTableDataValidation,
   TDataTableEditDataProps,
   TDataTableExportProps,
} from '@/components/data-table/@types';

export interface IDataTableStore {
   isSelecting: boolean;
   exportProps?: TDataTableExportProps;
   contextMenuProps?: TDataTableContextMenuProps;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   addDataProps?: TDataTableAddDataProps<any>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   editDataProps?: TDataTableEditDataProps<any>;
   dataValidationProps?: TDataTableDataValidation[];
}

const getDefaultState = (): IDataTableStore => ({
   isSelecting: false,
   exportProps: undefined,
   contextMenuProps: undefined,
   addDataProps: undefined,
   editDataProps: undefined,
   dataValidationProps: [],
});

export const createDataTableStore = (preloadedState: IDataTableStore) => {
   return createZustandStore(
      combine({ ...getDefaultState(), ...preloadedState }, (set) => ({
         toggleSelection: () => {
            set((prev) => ({
               isSelecting: !prev.isSelecting,
            }));
         },
         setExtraProps: (
            exportProps: TDataTableExportProps | undefined,
            contextMenuProps: TDataTableContextMenuProps | undefined,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            addDataProps: TDataTableAddDataProps<any> | undefined,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            editDataProps: TDataTableEditDataProps<any> | undefined,
            dataValidationProps: TDataTableDataValidation[] | undefined
         ) => {
            set(() => ({
               exportProps,
               contextMenuProps,
               addDataProps,
               editDataProps,
               dataValidationProps: dataValidationProps ?? [],
            }));
         },
      }))
   );
};

export type DataTableStoreType = ReturnType<typeof createDataTableStore>;

const zustandContext = createContext<DataTableStoreType | null>(null);
export const DataTableProvider = zustandContext.Provider;

// HOOK'U BU ŞEKİLDE GÜNCELLEYİN
export const useDataTableStore = () => {
   const store = useContext(zustandContext);
   if (!store) throw new Error('DataTable Store is missing the provider');
   // State'in tamamını shallow karşılaştırma ile döndürün
   return useZustandStore(store, (state) => state);
};
