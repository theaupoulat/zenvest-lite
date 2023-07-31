import { ReactNode } from 'react';
import 'tailwindcss/tailwind.css';

import Providers from '../components/lib/providers';
import Header from '../components/lib/header';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className="h-full">
    <body className="h-full overflow-x-hidden bg-slate-50">
      <Providers>
        <Header />
        {children}
      </Providers>
    </body>
  </html>
);

export const dynamic = 'force-dynamic';

export default RootLayout;
