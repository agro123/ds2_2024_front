import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {CustomFooter} from "../../layouts/footer";  // Asegúrate de que la ruta sea correcta

describe("CustomFooter Component", () => {
  it("should render the footer with the correct text", () => {
    render(<CustomFooter />);
    const currentYear = new Date().getFullYear();
    const footerText = `Ant Design ©${currentYear} Created by Ant UED`;
    expect(screen.getByText(footerText)).toBeInTheDocument();
  });
});
