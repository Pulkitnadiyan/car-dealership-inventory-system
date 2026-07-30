import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminDashboard from "../../pages/AdminDashboard";
import {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    restockVehicle,
} from "../../services/vehicleService";

vi.mock("../../services/vehicleService", () => ({
    getVehicles: vi.fn(),
    createVehicle: vi.fn(),
    updateVehicle: vi.fn(),
    deleteVehicle: vi.fn(),
    restockVehicle: vi.fn(),
}));

vi.mock("../../context/AuthContext", () => ({
    useAuth: vi.fn(() => ({
        token: "admin-token",
        logout: vi.fn(),
    })),
}));

describe("Admin Dashboard Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("displays list of vehicles in admin view", async () => {
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
                <AdminDashboard />
            </MemoryRouter>
        );

        expect(await screen.findByText("Toyota")).toBeInTheDocument();
        expect(screen.getByText("Corolla")).toBeInTheDocument();
        expect(screen.getByText("Sedan")).toBeInTheDocument();
        expect(screen.getByText("$20000")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("allows admin to add a new vehicle", async () => {
        getVehicles.mockResolvedValue({ data: [] });
        createVehicle.mockResolvedValue({ success: true });

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );

        // Wait for loading to finish and form to appear
        await screen.findByRole("heading", { name: /add new vehicle/i });

        // Fill Add Vehicle form
        await userEvent.type(screen.getByLabelText(/make/i), "Honda");
        await userEvent.type(screen.getByLabelText(/model/i), "Civic");
        await userEvent.type(screen.getByLabelText(/category/i), "Sedan");
        await userEvent.type(screen.getByLabelText(/price/i), "22000");
        await userEvent.type(screen.getByLabelText(/quantity/i), "10");

        // Submit form
        await userEvent.click(screen.getByRole("button", { name: /add vehicle/i }));

        expect(createVehicle).toHaveBeenCalledWith({
            make: "Honda",
            model: "Civic",
            category: "Sedan",
            price: 22000,
            quantity: 10,
        });
    });

    it("allows admin to delete a vehicle", async () => {
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
        deleteVehicle.mockResolvedValue({ success: true });

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );

        await screen.findByText("Toyota");
        await userEvent.click(screen.getByRole("button", { name: /delete/i }));

        expect(deleteVehicle).toHaveBeenCalledWith(1);
    });

    it("allows admin to edit a vehicle", async () => {
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
        updateVehicle.mockResolvedValue({ success: true });

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );

        await screen.findByText("Toyota");
        await userEvent.click(screen.getByRole("button", { name: /edit/i }));

        // Check if form fields are populated for editing
        const makeInput = screen.getByLabelText(/make/i);
        expect(makeInput.value).toBe("Toyota");

        // Edit price
        const priceInput = screen.getByLabelText(/price/i);
        await userEvent.clear(priceInput);
        await userEvent.type(priceInput, "21000");

        await userEvent.click(screen.getByRole("button", { name: /update vehicle/i }));

        expect(updateVehicle).toHaveBeenCalledWith(1, {
            make: "Toyota",
            model: "Corolla",
            category: "Sedan",
            price: 21000,
            quantity: 5,
        });
    });

    it("allows admin to restock a vehicle", async () => {
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
        restockVehicle.mockResolvedValue({ success: true });

        render(
            <MemoryRouter>
                <AdminDashboard />
            </MemoryRouter>
        );

        await screen.findByText("Toyota");
        const restockInput = screen.getByPlaceholderText(/qty/i);
        await userEvent.type(restockInput, "5");
        await userEvent.click(screen.getByRole("button", { name: /restock/i }));

        expect(restockVehicle).toHaveBeenCalledWith(1, 5);
    });
});
