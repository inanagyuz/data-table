'use client';

import * as React from 'react';
import { HTMLProps, useEffect, useRef } from 'react';

export function DataTableCheckBox({
   indeterminate,
   className = '',
   ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
   const ref = useRef<HTMLInputElement>(null!);

   useEffect(() => {
      if (typeof indeterminate === 'boolean') {
         ref.current.indeterminate = !rest.checked && indeterminate;
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ref, indeterminate]);

   return (
      <input
         type="checkbox"
         ref={ref}
         className={
            className +
            ' cursor-pointer peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
         }
         {...rest}
      />
   );
}
