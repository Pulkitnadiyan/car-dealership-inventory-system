import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "../../pages/Login";

vi.mock("../../services/authService", () => ({
    loginUser: vi.fn(),
}));

import { loginUser } from "../../services/authService";

describe("Login Page", () => {

    it("should call login service with entered credentials", async () => {

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

});