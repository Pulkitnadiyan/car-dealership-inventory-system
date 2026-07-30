import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Register from "../../pages/Register";

vi.mock("../../services/authService", () => ({
    registerUser: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

import { registerUser } from "../../services/authService";

describe("Register Page", () => {
    it("should call register service and navigate to login on success", async () => {
        registerUser.mockResolvedValue({
            data: { success: true }
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        await userEvent.type(screen.getByLabelText(/username/i), "testuser");
        await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
        await userEvent.type(screen.getByLabelText(/password/i), "password123");
        await userEvent.click(screen.getByRole("button", { name: /register/i }));

        expect(registerUser).toHaveBeenCalledWith({
            username: "testuser",
            email: "test@example.com",
            password: "password123",
        });

        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
});
