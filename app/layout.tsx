import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/data-table/providers';
import { QueryProvider } from '@/components/tanstack-query';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'React Advance Table',
   description: 'Example of TanStack Table',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={inter.className}>
            <QueryProvider>
               <Providers>
                  <ThemeProvider
                     attribute="class"
                     defaultTheme="system"
                     enableSystem
                     disableTransitionOnChange
                  >
                     <div className={'p-5'}>{children}</div>
                  </ThemeProvider>
               </Providers>
            </QueryProvider>
         </body>
      </html>
   );
}
