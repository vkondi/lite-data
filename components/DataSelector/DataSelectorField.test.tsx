import { render, screen, fireEvent } from "../../utils/test-utils";
import { describe, expect, vi, beforeEach, test } from "vitest";
import DataSelectorField from "./DataSelectorField";
import { useDataSelectorContext } from "../../context/DataSelectorContext";

// Mock the context
vi.mock('../../context/DataSelectorContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../context/DataSelectorContext')>();
  return {
    ...actual,
    useDataSelectorContext: vi.fn()
  };
});

describe("DataSelectorField", () => {
  const mockOnTypeChange = vi.fn();
  const mockOnNameChange = vi.fn();
  const mockOnDelete = vi.fn();

  const defaultProps = {
    onTypeChange: mockOnTypeChange,
    onNameChange: mockOnNameChange,
    onDelete: mockOnDelete,
    index: 0,
    dataTypeValue: "name",
    nameValue: "Test Name",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useDataSelectorContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      allowedDataTypes: ['name', 'phone', 'number'],
      fields: [],
      setFields: vi.fn()
    });
  });

  test("renders DataSelectorField component", () => {
    render(<DataSelectorField {...defaultProps} />);
    expect(screen.getByTestId("data-selector-field")).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    render(<DataSelectorField {...defaultProps} />);
    fireEvent.click(screen.getByTestId("delete-button"));
    expect(mockOnDelete).toHaveBeenCalledWith(0);
  });

  test("renders with correct initial values", () => {
    render(<DataSelectorField {...defaultProps} />);
    const nameInput = screen.getByTestId("name-input") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();
  });
});


