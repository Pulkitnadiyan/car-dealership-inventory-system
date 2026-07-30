import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "../../pages/Home";
import { getVehicles, searchVehicles, purchaseVehicle } from "../../services/vehicleService";
import { useAuth } from "../../context/AuthContext";

vi.mock("../../services/vehicleService", () => ({
    getVehicles: vi.fn(),
    searchVehicles: vi.fn(),
    purchaseVehicle: vi.fn(),
}));

vi.mock("../../context/AuthContext", () => ({
    useAuth: vi.fn(),
}));

describe("Home Page - Vehicle Listing & Search", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Default unauthenticated
        useAuth.mockReturnValue({
            token: null,
            logout: vi.fn(),
        });
    });

    it("displays loading state while fetching vehicles", async () => {
        getVehicles.mockReturnValue(new Promise(() => {})); // never resolves to show loading

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("displays error message if vehicle fetch fails", async () => {
        getVehicles.mockRejectedValue(new Error("Failed to fetch vehicles"));

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/failed to load vehicles/i)).toBeInTheDocument();
        });
    });

    it("displays list of vehicles successfully", async () => {
        const dummyVehicles = [
            {
                id: 1,
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 5,
            },
            {
                id: 2,
                make: "Ford",
                model: "Mustang",
                category: "Sports",
                price: 45000,
                quantity: 2,
            },
        ];

        getVehicles.mockResolvedValue({ data: dummyVehicles });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
            expect(screen.getByText("Category: Sedan")).toBeInTheDocument();
            expect(screen.getByText("$20000")).toBeInTheDocument();
            expect(screen.getByText("In Stock: 5")).toBeInTheDocument();

            expect(screen.getByText("Ford Mustang")).toBeInTheDocument();
            expect(screen.getByText("Category: Sports")).toBeInTheDocument();
            expect(screen.getByText("$45000")).toBeInTheDocument();
            expect(screen.getByText("In Stock: 2")).toBeInTheDocument();
        });
    });

    it("should call searchVehicles service and render filtered results when user searches", async () => {
        const dummyVehicles = [
            {
                id: 1,
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 5,
            },
        ];
        const searchResults = [
            {
                id: 1,
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 5,
            },
        ];

        getVehicles.mockResolvedValue({ data: dummyVehicles });
        searchVehicles.mockResolvedValue({ data: searchResults });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Wait for initial load
        await screen.findByText("Toyota Corolla");

        // Type search criteria
        await userEvent.type(screen.getByPlaceholderText(/search by make/i), "Toyota");
        await userEvent.type(screen.getByPlaceholderText(/search by model/i), "Corolla");
        await userEvent.type(screen.getByPlaceholderText(/search by category/i), "Sedan");

        // Click search button
        await userEvent.click(screen.getByRole("button", { name: /search/i }));

        expect(searchVehicles).toHaveBeenCalledWith({
            make: "Toyota",
            model: "Corolla",
            category: "Sedan",
        });

        await waitFor(() => {
            expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
        });
    });

    it("does not render Purchase button when user is unauthenticated", async () => {
        const dummyVehicles = [
            {
                id: 1,
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 5,
            },
        ];
        getVehicles.mockResolvedValue({ data: dummyVehicles });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await screen.findByText("Toyota Corolla");
        expect(screen.queryByRole("button", { name: /purchase/i })).not.toBeInTheDocument();
    });

    it("renders Purchase button and updates stock on click when user is authenticated", async () => {
        // Authenticate user
        useAuth.mockReturnValue({
            token: "valid-jwt-token",
            logout: vi.fn(),
        });

        const dummyVehicles = [
            {
                id: 1,
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 5,
            },
        ];
        getVehicles.mockResolvedValue({ data: dummyVehicles });
        purchaseVehicle.mockResolvedValue({
            data: {
                id: 1,
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 4, // updated quantity
            }
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await screen.findByText("Toyota Corolla");
        const purchaseBtn = screen.getByRole("button", { name: /purchase/i });
        expect(purchaseBtn).toBeInTheDocument();

        await userEvent.click(purchaseBtn);

        expect(purchaseVehicle).toHaveBeenCalledWith(1);
        await waitFor(() => {
            expect(screen.getByText("In Stock: 4")).toBeInTheDocument();
        });
    });

    it("should filter results by min and max price range", async () => {
        const dummyVehicles = [
            {
                id: 1,
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 20000,
                quantity: 5,
            },
            {
                id: 2,
                make: "Ford",
                model: "Mustang",
                category: "Sports",
                price: 45000,
                quantity: 2,
            },
            {
                id: 3,
                make: "BMW",
                model: "M3",
                category: "Sports",
                price: 70000,
                quantity: 1,
            },
        ];

        getVehicles.mockResolvedValue({ data: dummyVehicles });
        searchVehicles.mockResolvedValue({ data: dummyVehicles });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        await screen.findByText("Toyota Corolla");
        await screen.findByText("Ford Mustang");
        await screen.findByText("BMW M3");

        // Input min and max price
        await userEvent.type(screen.getByPlaceholderText(/min price/i), "30000");
        await userEvent.type(screen.getByPlaceholderText(/max price/i), "60000");

        // Submit search
        await userEvent.click(screen.getByRole("button", { name: /search/i }));

        await waitFor(() => {
            expect(screen.getByText("Ford Mustang")).toBeInTheDocument();
            expect(screen.queryByText("Toyota Corolla")).not.toBeInTheDocument();
            expect(screen.queryByText("BMW M3")).not.toBeInTheDocument();
        });
    });
});

