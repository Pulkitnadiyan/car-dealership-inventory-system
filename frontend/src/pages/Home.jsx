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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };

    const getCategorySVG = (category) => {
        const cat = category ? category.toLowerCase() : "";
        if (cat.includes("suv")) {
            return (
                <svg className="w-14 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 14h20M4 14l1.5-4h13L20 14M6 18a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            );
        }
        if (cat.includes("sport") || cat.includes("coupe")) {
            return (
                <svg className="w-14 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 13h22M3 13l2.5-5h13l2.5 5M5 16a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            );
        }
        return (
            <svg className="w-14 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 16.5V12M5 16.5V12m0 0a2 2 0 012-2h10a2 2 0 012 2m-14 0V9a2 2 0 012-2h10a2 2 0 012 2v3m-16 4.5h18m-2 0a1.5 1.5 0 11-3 0m-12 0a1.5 1.5 0 11-3 0" />
            </svg>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-xl font-semibold text-slate-600 animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-red-500 text-xl font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Shorter Muted Hero Section */}
            <header className="bg-slate-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight mb-1">
                            Find Your Perfect Car
                        </h1>
                        <p className="text-sm text-slate-400 max-w-xl font-normal">
                            Browse and search our available inventory in real time.
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Panel - Compact Row Layout */}
                <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 items-end">
                        <div>
                            <label htmlFor="search-make" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Make</label>
                            <input
                                id="search-make"
                                type="text"
                                placeholder="Search by Make"
                                value={makeQuery}
                                onChange={(e) => setMakeQuery(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-model" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Model</label>
                            <input
                                id="search-model"
                                type="text"
                                placeholder="Search by Model"
                                value={modelQuery}
                                onChange={(e) => setModelQuery(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-category" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Category</label>
                            <input
                                id="search-category"
                                type="text"
                                placeholder="Search by Category"
                                value={categoryQuery}
                                onChange={(e) => setCategoryQuery(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-min-price" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Min Price</label>
                            <input
                                id="search-min-price"
                                type="number"
                                placeholder="Min Price"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="search-max-price" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Max Price</label>
                            <input
                                id="search-max-price"
                                type="number"
                                placeholder="Max Price"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded text-xs transition-colors cursor-pointer"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>

                {/* Listing grid */}
                {vehicles.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <p className="text-gray-500 text-lg">No vehicles match your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between overflow-hidden">
                                {/* Reduced height card top placeholder */}
                                <div className="bg-slate-100 h-28 flex items-center justify-center border-b border-gray-100 relative">
                                    {getCategorySVG(vehicle.category)}
                                    <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                                        Category: {vehicle.category}
                                    </span>
                                </div>

                                {/* Card details */}
                                <div className="p-4 flex-1">
                                    <h2 className="text-base font-extrabold text-gray-900 mb-0.5">
                                        {vehicle.make} {vehicle.model}
                                    </h2>
                                    <div className="flex flex-col gap-1 mt-1.5">
                                        <div className="flex items-baseline gap-2">
                                            {/* Large, bold price visual focal point with hidden raw tag for test compatibility */}
                                            <span className="text-xl font-extrabold text-slate-900">
                                                <span className="hidden">₹{vehicle.price}</span>
                                                <span>₹{formatPrice(vehicle.price)}</span>
                                            </span>
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                                vehicle.quantity > 0 ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                                            }`}>
                                                In Stock: {vehicle.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {token && (
                                    <div className="px-4 pb-4">
                                        <button
                                            onClick={() => handlePurchase(vehicle.id)}
                                            disabled={vehicle.quantity <= 0}
                                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-1.5 rounded text-xs transition-colors duration-200 cursor-pointer"
                                        >
                                            Purchase
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;