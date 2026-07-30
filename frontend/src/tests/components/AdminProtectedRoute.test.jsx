import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import AdminProtectedRoute from "../../components/AdminProtectedRoute";
import { useAuth } from "../../context/AuthContext";

vi.mock("../../context/AuthContext", () => ({
    useAuth: vi.fn(),
}));

describe("AdminProtectedRoute", () => {
    it("should render children when user is authenticated as admin", () => {
        // Admin payload: {"role":"ADMIN"} -> base64: eyJyb2xlIjoiQURNSU4ifQ==
        useAuth.mockReturnValue({
            token: "header.eyJyb2xlIjoiQURNSU4ifQ==.signature",
        });

        render(
            <MemoryRouter>
                <AdminProtectedRoute>
                    <h1>Admin Panel</h1>
                </AdminProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    });

    it("should redirect when user is not logged in", () => {
        useAuth.mockReturnValue({
            token: null,
        });

        render(
            <MemoryRouter>
                <AdminProtectedRoute>
                    <h1>Admin Panel</h1>
                </AdminProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.queryByText("Admin Panel")).not.toBeInTheDocument();
    });

    it("should redirect when user is logged in but not an admin", () => {
        // User payload: {"role":"USER"} -> base64: eyJyb2xlIjoiVVNFUiJ9
        useAuth.mockReturnValue({
            token: "header.eyJyb2xlIjoiVVNFUiJ9.signature",
        });

        render(
            <MemoryRouter>
                <AdminProtectedRoute>
                    <h1>Admin Panel</h1>
                </AdminProtectedRoute>
            </MemoryRouter>
        );

        expect(screen.queryByText("Admin Panel")).not.toBeInTheDocument();
    });
});
