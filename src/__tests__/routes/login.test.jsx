import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginView from "../../routes/public/security/login";
import axios from "axios";
import { API } from "../../constants";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
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

vi.mock("axios");
vi.mock("../../context/AuthProvider", () => ({ useAuth: () => ({ saveUserData: vi.fn(), }), }));
describe("LoginView Component", () => {
    beforeEach(() => {
        vi.mock("react-router-dom", async () => {
            const actual = await vi.importActual("react-router-dom");
            return { ...actual, useNavigate: () => vi.fn() };
        });
    });
    it("should render the login form", () => {
        render(
                <LoginView />
        );
        expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it("should display error message on failed login", async () => {
      axios.post.mockRejectedValue({ response: { status: 401 } });

      render(
            <LoginView />
      );

      fireEvent.change(screen.getAllByLabelText(/usuario/i)[0], { target: { value: "invalid_user" } });
      fireEvent.change(screen.getAllByLabelText(/contraseña/i)[0], { target: { value: "invalid_pass" } });

      fireEvent.click(screen.getAllByRole("button", { name: /iniciar sesión/i })[0]);

      expect(await screen.findByText(/usuario o contraseña incorrectos/i)).toBeInTheDocument();
    });

    it("should navigate to dashboard on successful login", async () => {
      const mockResponse = { data: { token: "mockToken" } };
      axios.post.mockResolvedValue(mockResponse);

      render(
            <LoginView />
      );

      fireEvent.change(screen.getAllByLabelText(/usuario/i)[0], { target: { value: "valid_user" } });
      fireEvent.change(screen.getAllByLabelText(/contraseña/i)[0], { target: { value: "valid_pass" } });

      fireEvent.click(screen.getAllByRole("button", { name: /iniciar sesión/i })[0]);

      expect(await screen.findByText(/¡inicio de sesión exitoso!/i)).toBeInTheDocument();
    });
});
