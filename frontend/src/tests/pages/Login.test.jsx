import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "../../pages/Login";

vi.mock("../../services/authService", () => ({
    loginUser: vi.fn(),
}));
import { MemoryRouter } from "react-router-dom";


const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

import { loginUser } from "../../services/authService";

describe("Login Page", () => {

    it("should call login service with entered credentials", async () => {
        loginUser.mockResolvedValue({
            data: {
                token: "dummy-token"
            }
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await userEvent.type(
            screen.getByLabelText(/email/i),
            "pulkit@example.com"
        );

        await userEvent.type(
            screen.getByLabelText(/password/i),
            "password123"
        );

        await userEvent.click(
            screen.getByRole("button", { name: /login/i })
        );

        expect(loginUser).toHaveBeenCalledWith({
            email: "pulkit@example.com",
            password: "password123",
        });

    });

    it("should store token after successful login", async () => {

        loginUser.mockResolvedValue({
            data: {
                token: "jwt-token"
            }
        });

        Storage.prototype.setItem = vi.fn();

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await userEvent.type(
            screen.getByLabelText(/email/i),
            "pulkit@example.com"
        );

        await userEvent.type(
            screen.getByLabelText(/password/i),
            "password123"
        );

        await userEvent.click(
            screen.getByRole("button", { name: /login/i })
        );

        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token",
            "jwt-token"
        );

    });

    it("should navigate to home after successful login", async () => {

        loginUser.mockResolvedValue({
            data: {
                token: "jwt-token"
            }
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        await userEvent.type(
            screen.getByLabelText(/email/i),
            "pulkit@example.com"
        );

        await userEvent.type(
            screen.getByLabelText(/password/i),
            "password123"
        );

        await userEvent.click(
            screen.getByRole("button", {
                name: /login/i
            })
        );

        expect(mockNavigate).toHaveBeenCalledWith("/");

    });
});