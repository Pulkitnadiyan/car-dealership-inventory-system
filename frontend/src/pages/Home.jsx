import { useEffect, useState } from "react";
import { getVehicles, searchVehicles } from "../services/vehicleService";

function Home() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [makeQuery, setMakeQuery] = useState("");
    const [modelQuery, setModelQuery] = useState("");
    const [categoryQuery, setCategoryQuery] = useState("");

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
            setVehicles(response.data || []);
            setError(null);
        } catch (err) {
            setError("Failed to load vehicles");
        } finally {
            setLoading(false);
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
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 flex flex-col md:flex-row md:items-end gap-4">
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors duration-200"
                    >
                        Search
                    </button>
                </form>

                {/* Listing grid */}
                {vehicles.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No vehicles match your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;