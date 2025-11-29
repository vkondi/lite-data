import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataSelectorProvider, useDataSelectorContext } from './DataSelectorContext';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Test component that uses the context
const TestComponent = () => {
  const { fields, allowedDataTypes, setFields } = useDataSelectorContext();
  return (
    <div>
      <span data-testid="fields-count">{fields.length}</span>
      <span data-testid="allowed-types">{allowedDataTypes.join(',')}</span>
      <button onClick={() => setFields([...fields, { dataType: 'name', name: 'New Field' }])} data-testid="add-field">
        Add Field
      </button>
    </div>
  );
};

describe('DataSelectorContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides default empty field', async () => {
    (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { allowedDataTypes: ['name', 'email'] }
    });

    render(
      <DataSelectorProvider>
        <TestComponent />
      </DataSelectorProvider>
    );
    
    expect(screen.getByTestId('fields-count')).toHaveTextContent('1');
  });

  it('fetches and sets allowed data types', async () => {
    const mockDataTypes = ['name', 'email', 'phone'];
    (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { allowedDataTypes: mockDataTypes }
    });

    render(
      <DataSelectorProvider>
        <TestComponent />
      </DataSelectorProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('allowed-types')).toHaveTextContent('name,email,phone');
    });
  });

  it('handles fetch config error gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (axios.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network error'));

    render(
      <DataSelectorProvider>
        <TestComponent />
      </DataSelectorProvider>
    );
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch config:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  it('allows updating fields', async () => {
    (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: { allowedDataTypes: ['name'] }
    });

    render(
      <DataSelectorProvider>
        <TestComponent />
      </DataSelectorProvider>
    );
    
    const addButton = screen.getByTestId('add-field');
    addButton.click();
    
    await waitFor(() => {
      expect(screen.getByTestId('fields-count')).toHaveTextContent('2');
    });
  });
});

