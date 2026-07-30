import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

vi.mock("../../context/AuthContext", () => ({
    useAuth: vi.fn(),
}));

describe("Navbar Component", () => {
    const mockLogout = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("displays Home, Login, and Register links when unauthenticated", () => {
        useAuth.mockReturnValue({
            token: null,
            logout: mockLogout,
        });

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /admin dashboard/i })).not.toBeInTheDocument();
    });

    it("displays Logout button and hides Login/Register when authenticated as standard user", () => {
        // User payload: {"role":"USER"} -> base64: eyJyb2xlIjoiVVNFUiJ9
        useAuth.mockReturnValue({
            token: "header.eyJyb2xlIjoiVVNFUiJ9.signature",
            logout: mockLogout,
        });

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /login/i })).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /register/i })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /admin dashboard/i })).not.toBeInTheDocument();
    });

    it("displays Admin Dashboard link when authenticated as Admin user", () => {
        // Admin payload: {"role":"ADMIN"} -> base64: eyJyb2xlIjoiQURNSU4ifQ==
        useAuth.mockReturnValue({
            token: "header.eyJyb2xlIjoiQURNSU4ifQ==.signature",
            logout: mockLogout,
        });

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /admin dashboard/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    });

    it("calls logout handler when Logout button is clicked", async () => {
        useAuth.mockReturnValue({
            token: "header.eyJyb2xlIjoiVVNFUiJ9.signature",
            logout: mockLogout,
        });

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const logoutBtn = screen.getByRole("button", { name: /logout/i });
        await userEvent.click(logoutBtn);

        expect(mockLogout).toHaveBeenCalled();
    });
});
