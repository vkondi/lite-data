import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { DataSelectorContextProps, useDataSelectorContext } from "../../context/DataSelectorContext";

// Mock the context
vi.mock("../../context/DataSelectorContext");

const mockUseDataSelectorContext = useDataSelectorContext as Mock<typeof useDataSelectorContext>;

describe("Footer", () => {
  it("renders Generate button", () => {
    mockUseDataSelectorContext.mockReturnValue({ fields: [], setFields: vi.fn(), allowedDataTypes: [] });
    render(<Footer />);
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("disables Generate button when fields are invalid", () => {
    mockUseDataSelectorContext.mockReturnValue({
      fields: [{ dataType: "", name: "test" }],
      setFields: vi.fn(),
      allowedDataTypes: [],
    });
    render(<Footer />);
    expect(screen.getByText("Generate")).toBeDisabled();
  });

  it("enables Generate button when all fields are valid", () => {
    mockUseDataSelectorContext.mockReturnValue({
      fields: [{ dataType: "string", name: "test" }],
      setFields: vi.fn(),
      allowedDataTypes: [],
    });
    render(<Footer />);
    expect(screen.getByText("Generate")).not.toBeDisabled();
  });

  it("calls onGenerate when clicking Generate button", () => {
    const mockFields = [{ dataType: "string", name: "test" }];
    mockUseDataSelectorContext.mockReturnValue({ fields: mockFields, setFields: vi.fn(), allowedDataTypes: [] });

    render(<Footer />);
    fireEvent.click(screen.getByText("Generate"));
  });
});
