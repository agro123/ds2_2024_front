import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, beforeAll } from "vitest";
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
    });

    /*it("should navigate to the correct route when clicking an item", () => {
        render(
            <BrowserRouter>
                <SideBar />
            </BrowserRouter>
        );

        // Simular clic en "Dashboard"
        fireEvent.click(screen.getAllByRole("link", {name: "Dashboard"})[0]);

        // Verificar que la navegación ocurrió a la ruta esperada
        expect(mockNavigate).toHaveBeenCalledWith("/admin/dashboard");

        // Simular clic en "Usuarios"
        fireEvent.click(screen.getAllByRole("link", {name:"Usuarios"})[0]);

        // Verificar que la navegación ocurrió a la ruta esperada
        expect(mockNavigate).toHaveBeenCalledWith("/admin/users");

        // Simular clic en "PQRSD"
        fireEvent.click(screen.getAllByRole("link",{name:"PQRSD"})[0]);

        // Verificar que la navegación ocurrió a la ruta esperada
        expect(mockNavigate).toHaveBeenCalledWith("/admin/pqrsd");
    });*/
});
