import { useEffect, useState } from "react";
import { getVehicles, searchVehicles, purchaseVehicle } from "../services/vehicleService";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { token } = useAuth();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [makeQuery, setMakeQuery] = useState("");
    const [modelQuery, setModelQuery] = useState("");
    const [categoryQuery, setCategoryQuery] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const fetchInitialVehicles = async () => {
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
        fetchInitialVehicles();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await searchVehicles({
                make: makeQuery,
                model: modelQuery,
                category: categoryQuery,
            });
            let results = response.data || [];

            if (minPrice) {
                results = results.filter((v) => v.price >= parseFloat(minPrice));
            }
            if (maxPrice) {
                results = results.filter((v) => v.price <= parseFloat(maxPrice));
            }

            setVehicles(results);
            setError(null);
        } catch (err) {
            setError("Failed to load vehicles");
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (id) => {
        try {
            const response = await purchaseVehicle(id);
            const updatedVehicle = response.data;
            setVehicles((prev) =>
                prev.map((v) => (v.id === id ? updatedVehicle : v))
            );
        } catch (err) {
            // Silence or handle locally
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl font-semibold text-gray-600 animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-red-500 text-xl font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Vehicle Inventory
                </h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label htmlFor="search-make" className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                            <input
                                id="search-make"
                                type="text"
                                placeholder="Search by Make"
                                value={makeQuery}
                                onChange={(e) => setMakeQuery(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-model" className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                            <input
                                id="search-model"
                                type="text"
                                placeholder="Search by Model"
                                value={modelQuery}
                                onChange={(e) => setModelQuery(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input
                                id="search-category"
                                type="text"
                                placeholder="Search by Category"
                                value={categoryQuery}
                                onChange={(e) => setCategoryQuery(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-min-price" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                            <input
                                id="search-min-price"
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-max-price" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                            <input
                                id="search-max-price"
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors duration-200"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Listing grid */}
                {vehicles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No vehicles match your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                                <div className="p-6 flex-1">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {vehicle.make} {vehicle.model}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-4">Category: {vehicle.category}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-extrabold text-blue-600">${vehicle.price}</span>
                                        <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                                            vehicle.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}>
                                            In Stock: {vehicle.quantity}
                                        </span>
                                    </div>
                                </div>
                                {token && (
                                    <div className="px-6 pb-6">
                                        <button
                                            onClick={() => handlePurchase(vehicle.id)}
                                            disabled={vehicle.quantity <= 0}
                                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg text-sm transition-colors duration-200"
                                        >
                                            Purchase
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;