import type { Metadata } from 'next';
import { Archivo, Archivo_Narrow, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@radix-ui/react-separator';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/theme-button';
import { ToastContainer } from 'react-toastify';
import QueryProvider from '@/context/QueryProvider';
import { GlobalProvider, useGlobal } from '@/context/GlobalProvider';
import PageHeader from '@/components/ui/page-header';
const archivoSans = Archivo({
  variable: '--font-archivo-sans-serif',
  subsets: ['latin'],
});

const archivoNarrow = Archivo_Narrow({
  variable: '--font-archivo-narrow',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | NextGen',
    default: 'POS Nextgen',
  },
  description: 'Generated Next Gen',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='[--header-height:calc(theme(spacing.14))]'>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                  <div className='flex w-full pr-5 justify-between'>
                    <div className='flex items-center gap-2 px-4'>
                      <SidebarTrigger className='-ml-1' />
                      <Separator orientation='vertical' className='mr-2 h-4' />
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem className='hidden md:block'>
                            <BreadcrumbLink href='#'>
                              Building Your Application
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className='hidden md:block' />
                          <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                    <ModeToggle></ModeToggle>
                  </div>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                  <GlobalProvider>
                    <PageHeader />
                    <QueryProvider>{children}</QueryProvider>
                  </GlobalProvider>
                </div>
                <ToastContainer />
              </SidebarInset>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
