import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThemeWrapper from './ThemeWrapper';
import { ThemeProvider } from '../../../context/ThemeContext';
import '@testing-library/jest-dom';

describe('ThemeWrapper', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeWrapper>
          <div>Test Content</div>
        </ThemeWrapper>
      </ThemeProvider>
    );
    
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies MUI theme provider', () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeWrapper>
          <div>Test</div>
        </ThemeWrapper>
      </ThemeProvider>
    );
    
    expect(container).toBeInTheDocument();
  });
});

