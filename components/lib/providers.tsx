'use client';
import { ReactNode } from 'react';

import ContextProvider from './context/provider';

const Providers = ({ children }: { children: ReactNode }) => (
  <ContextProvider>{children}</ContextProvider>
);

export default Providers;
