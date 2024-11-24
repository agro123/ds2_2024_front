import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CustomHeader } from "../../layouts/header";
import { theme } from "antd";

vi.mock("antd", () => {
  const originalModule = vi.importActual("antd");
  return {
    ...originalModule,
    theme: {
      useToken: () => ({
        token: {
          colorBgContainer: "#ffffff", // Simula el valor del tema
        },
      }),
    },
  };
});

describe("CustomHeader Component", () => {
  it("should render the header with the correct background color", () => {
    render(<CustomHeader />);
    
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveStyle("background: #ffffff");
  });
});
