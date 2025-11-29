import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeWrapper from '../app/components/ThemeWrapper/ThemeWrapper';
import { DataSelectorProvider } from '../context/DataSelectorContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <DataSelectorProvider>
          {children}
        </DataSelectorProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
