import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProtectedRoute from "../../components/ProtectedRoute";

vi.mock("../../context/AuthContext", () => ({
    useAuth: vi.fn()
}));

import { useAuth } from "../../context/AuthContext";

describe("ProtectedRoute", () => {

    it("should render children when user is authenticated", () => {

        useAuth.mockReturnValue({
            token: "jwt-token"
        });

        render(
            <MemoryRouter>
                <ProtectedRoute>
                    <h1>Dashboard</h1>
                </ProtectedRoute>
            </MemoryRouter>
        );

        expect(
            screen.getByText("Dashboard")
        ).toBeInTheDocument();

    });

});