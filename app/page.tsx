'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Person } from '@/lib/makeData';
import { AdvancedDataTable } from '@/components/data-table';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import { ModeToggle } from '@/components/ModeToggle';
import { i18n } from '@/components/data-table/i18n';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';

export default function Home() {
   const [isLoading, setLoading] = useState(true);
   const filename = 'exampleExport';

   const {
      data,
      isLoading: isLoading2,
      error,
   } = useQuery({
      queryKey: ['tableData'],
      queryFn: async () => {
         const res = await fetch('/api/table');
         if (!res.ok) throw new Error('Veri alınamadı');
         return res.json();
      },
   });

   useEffect(() => {
      const tmo = setTimeout(() => {
         setLoading(false);
         clearTimeout(tmo);
      }, 5000);
   }, []);

   if (isLoading2) return <div>Yükleniyor...</div>;
   if (error) return <div>Hata: {error.message}</div>;

   return (
      <>
         <AdvancedDataTable<Person>
            id={'example-advance-table'}
            columns={columns}
            data={data}
            exportProps={{
               exportFileName: filename,
            }}
            actionProps={{
               onDelete: (props) => {
                  console.log('actionProps', props);
               },
            }}
            onRowClick={(prop) => {
               console.log('onRowClick', prop);
            }}
            contextMenuProps={{
               enableEdit: true,
               enableDelete: true,
               onDelete: (prop) => {
                  console.log('contextMenuProps:onDelete', prop);
               },
               extra: {
                  [i18n.t('COPY_TO_CLIPBOARD')]: (data) => {
                     const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
                     navigator.clipboard.writeText(text);
                  },
               },
            }}
            addDataProps={{
               enable: true,
               title: 'Add a new netizen',
               description: 'Netizens can be rude sometimes. Add them with caution.',
               onSubmitNewData: (netizen) => {
                  console.log('onSubmitNewData', netizen);
               },
            }}
            editDataProps={{
               title: 'Amend netizen data',
               description: 'Netizens can be rude sometimes. Edit them with caution.',
               onSubmitEditData: (netizen) => {
                  console.log('onSubmitEditData', netizen);
               },
            }}
            isLoading={isLoading}
            dataValidationProps={[
               {
                  id: 'firstName',
                  component: 'input',
                  label: 'First Name',
                  schema: z.string().min(3, 'First name must be at least 3 characters'),
               },
               {
                  id: 'lastName',
                  component: 'input',
                  label: 'Last Name',
                  schema: z.string().min(3, 'Last name must be at least 3 characters'),
               },
               {
                  id: 'address',
                  component: 'input',
                  label: 'Address',
                  schema: z.string().min(3, 'Address must be at least 3 characters'),
               },
               {
                  id: 'status',
                  component: 'select',
                  label: 'Relationship Status',
                  placeholder: 'Your current relationship status?',
                  data: [
                     {
                        value: 'relationship',
                        children: 'relationship',
                     },
                     {
                        value: 'complicated',
                        children: 'complicated',
                     },
                     {
                        value: 'single',
                        children: 'single',
                     },
                  ],
                  schema: z.enum(['relationship', 'complicated', 'single']),
                  componentCssProps: {
                     parent: 'w-full',
                  },
               },
               {
                  id: 'gender',
                  component: 'radio',
                  label: 'Gender',
                  placeholder: 'There are only 2 genders',
                  data: [
                     {
                        value: 'male',
                        children: 'Male',
                     },
                     {
                        value: 'female',
                        children: 'Female',
                     },
                  ],
                  schema: z.enum(['male', 'female']),
                  componentCssProps: {
                     parent: 'w-full',
                  },
               },
               {
                  id: 'locality',
                  component: 'combobox',
                  label: 'Locality',
                  placeholder: 'Your current location?',
                  data: new Array(120).fill(0).map(() => {
                     const country = faker.location.country();
                     return {
                        value: country,
                        children: country,
                     };
                  }),
                  schema: z.string().min(3, 'You must choose your locality'),
                  componentCssProps: {
                     parent: 'w-full',
                  },
               },
            ]}
         />
         <div className={'flex flex-row items-center max-w-96 float-right'}>
            <ModeToggle />
         </div>
      </>
   );
}
