import { useEffect, useState } from "react";
import {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    restockVehicle,
} from "../services/vehicleService";

function AdminDashboard() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    // Editing mode state
    const [editingId, setEditingId] = useState(null);

    // Restock inputs state map (vehicleId -> quantity)
    const [restockQtys, setRestockQtys] = useState({});

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            const response = await getVehicles();
            setVehicles(response.data || []);
            setError(null);
        } catch (err) {
            setError("Failed to load vehicles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const resetForm = () => {
        setMake("");
        setModel("");
        setCategory("");
        setPrice("");
        setQuantity("");
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vehicleData = {
            make,
            model,
            category,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
        };

        try {
            if (editingId) {
                await updateVehicle(editingId, vehicleData);
            } else {
                await createVehicle(vehicleData);
            }
            resetForm();
            fetchVehicles();
        } catch (err) {
            setError("Failed to submit vehicle");
        }
    };

    const handleEditClick = (vehicle) => {
        setEditingId(vehicle.id);
        setMake(vehicle.make);
        setModel(vehicle.model);
        setCategory(vehicle.category);
        setPrice(vehicle.price.toString());
        setQuantity(vehicle.quantity.toString());
    };

    const handleDeleteClick = async (id) => {
        try {
            await deleteVehicle(id);
            fetchVehicles();
        } catch (err) {
            setError("Failed to delete vehicle");
        }
    };

    const handleRestockClick = async (id) => {
        const qty = parseInt(restockQtys[id], 10);
        if (isNaN(qty) || qty <= 0) return;
        try {
            await restockVehicle(id, qty);
            setRestockQtys((prev) => ({ ...prev, [id]: "" }));
            fetchVehicles();
        } catch (err) {
            setError("Failed to restock vehicle");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form column */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        {editingId ? "Edit Vehicle" : "Add New Vehicle"}
                    </h2>
                    {error && <div className="text-red-500 mb-4 text-sm font-semibold">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="vehicle-make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                            <input
                                id="vehicle-make"
                                type="text"
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="vehicle-model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                            <input
                                id="vehicle-model"
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="vehicle-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                id="vehicle-category"
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="vehicle-price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                                id="vehicle-price"
                                type="number"
                                step="any"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="vehicle-quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                                id="vehicle-quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors duration-200"
                            >
                                {editingId ? "Update Vehicle" : "Add Vehicle"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Inventory Table/List column */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Inventory Management</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Make</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {vehicles.map((vehicle) => (
                                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{vehicle.make}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500">{vehicle.model}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500">{vehicle.category}</td>
                                        <td className="px-4 py-4 text-sm font-semibold text-gray-900">${vehicle.price}</td>
                                        <td className="px-4 py-4 text-sm text-gray-900">{vehicle.quantity}</td>
                                        <td className="px-4 py-4 text-sm space-y-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEditClick(vehicle)}
                                                    className="text-blue-600 hover:text-blue-800 font-semibold text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(vehicle.id)}
                                                    className="text-red-600 hover:text-red-800 font-semibold text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <input
                                                    type="number"
                                                    placeholder="Qty"
                                                    value={restockQtys[vehicle.id] || ""}
                                                    onChange={(e) =>
                                                        setRestockQtys((prev) => ({
                                                            ...prev,
                                                            [vehicle.id]: e.target.value,
                                                        }))
                                                    }
                                                    className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                                <button
                                                    onClick={() => handleRestockClick(vehicle.id)}
                                                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-0.5 rounded font-semibold"
                                                >
                                                    Restock
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {vehicles.length === 0 && (
                            <p className="text-gray-500 text-center py-6">No vehicles found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
