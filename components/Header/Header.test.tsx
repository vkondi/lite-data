import { render } from "../../utils/test-utils";
import { screen } from "@testing-library/dom";
import Header from "./Header";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Header component", () => {
    it("renders the title 'Lite Data'", () => {
        render(<Header />);
        const titleElement = screen.getByText(/Lite Data/i);
        expect(titleElement).toBeInTheDocument();
    });

    it("has a header element with the correct class", () => {
        render(<Header />);
        const headerElement = screen.getByRole("banner");
        expect(headerElement).toHaveClass("MuiAppBar-root");
    });

    it("renders the header content div", () => {
        render(<Header />);
        const contentDiv = screen.getByRole("heading", { level: 1 });
        expect(contentDiv).toHaveClass("MuiTypography-h4");
    });
});