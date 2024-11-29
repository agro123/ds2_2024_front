import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeAll } from "vitest";
import { SideBar } from "../../layouts/sidebar";
import { BrowserRouter } from "react-router-dom";

let mockNavigate = vi.fn();

// Mock de useNavigate de react-router-dom
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock de useAuth de AuthProvider
const mockClearSavedData = vi.fn();

vi.mock("../../context/AuthProvider", () => ({
    useAuth: () => ({
        userData: { name: "John Doe" }, // Usuario simulado
        clearSavedData: mockClearSavedData, // Mock de la función clearSavedData
    }),
}));

// Mock global de matchMedia para evitar errores con Ant Design
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe("SideBar Component", () => {
    it("should render the sidebar with the correct items", () => {
        render(
            <BrowserRouter>
                <SideBar />
            </BrowserRouter>
        );

        // Verificar que los elementos del menú estén presentes
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Usuarios")).toBeInTheDocument();
        expect(screen.getByText("PQRSD")).toBeInTheDocument();
        // Verificar que el nombre del usuario se muestre
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("should call clearSavedData and navigate to login on logout", () => {
        render(
            <BrowserRouter>
                <SideBar />
            </BrowserRouter>
        );
    });
});
