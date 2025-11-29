import { render } from "../../utils/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DataSelector from "./DataSelector";
import { useDataSelectorContext } from '../../context/DataSelectorContext';

// Mock the context but keep the provider
vi.mock('../../context/DataSelectorContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../context/DataSelectorContext')>();
  return {
    ...actual,
    useDataSelectorContext: vi.fn()
  };
});

describe("DataSelector", () => {
  const mockFields = [{ dataType: 'name', name: 'Field 1' }];

  beforeEach(() => {
    (useDataSelectorContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      fields: mockFields,
      setFields: vi.fn(),
      allowedDataTypes: ['name', 'number']
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
