import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DataSelector from "./DataSelector";
import { DataSelectorContextProps, useDataSelectorContext } from '../../context/DataSelectorContext';

// Mock the context
vi.mock('../../context/DataSelectorContext', () => ({
  useDataSelectorContext: vi.fn()
}));

describe("DataSelector", () => {
  const mockFields = [{ field1: 'value1' }];

  beforeEach(() => {
    (useDataSelectorContext as unknown as DataSelectorContextProps).mockReturnValue({
      fields: mockFields
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  
  it("renders without crashing", () => {
    const { container } = render(<DataSelector />);
    expect(container).toMatchSnapshot();
  });
});
