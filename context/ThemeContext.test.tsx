import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeProvider, useThemeContext } from './ThemeContext';
import '@testing-library/jest-dom';

// Test component that uses the context
const TestComponent = () => {
  const { mode, toggleColorMode } = useThemeContext();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleColorMode} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('provides default light mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });

  it('toggles between light and dark mode', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByTestId('toggle');
    const modeDisplay = screen.getByTestId('mode');
    
    expect(modeDisplay).toHaveTextContent('light');
    
    fireEvent.click(toggleButton);
    expect(modeDisplay).toHaveTextContent('dark');
    
    fireEvent.click(toggleButton);
    expect(modeDisplay).toHaveTextContent('light');
  });

  it('saves mode to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByTestId('toggle');
    
    fireEvent.click(toggleButton);
    
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    
    setItemSpy.mockRestore();
  });
});

