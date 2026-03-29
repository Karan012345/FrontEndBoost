import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createQuote, updateQuote, getQuoteById } from "../services/quoteService";
import Navbar from "../components/Navbar";

function QuoteFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        vehicleNumber: "",
        vehicleType: "",
        city: "",
        insuranceType: "",
        vehicleAge: "",
        premium: 0
    });

    const calculatePremium = () => {
        let base = 3000;

        if (formData.vehicleType === "car") base += 2000;
        if (formData.vehicleType === "bike") base += 1000;

        if (formData.insuranceType === "comprehensive") base += 3000;
        if (formData.insuranceType === "third-party") base += 1500;

        const age = Number(formData.vehicleAge);
        if (age > 5) base += 2000;
        else if (age > 2) base += 1000;

        return base;
    };

    // 🔥 EDIT MODE LOAD
    useEffect(() => {
        if (id) {
            loadQuote();
        }
    }, [id]);

    const loadQuote = async () => {
        try {
            const data = await getQuoteById(id);
            setFormData(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load data");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!formData.fullName || !formData.email || !formData.vehicleNumber) {
            toast.error("All fields are required");
            return;
        }

        if (!formData.email.includes("@")) {
            toast.error("Invalid email");
            return;
        }

        if (!formData.vehicleType) {
            toast.error("Select vehicle type");
            return;
        }

        try {
            const premiumValue = calculatePremium();

            const payload = {
                ...formData,
                vehicleAge: Number(formData.vehicleAge),
                premium: premiumValue
            };

            if (id) {
                await updateQuote(id, payload);
                alert("Quote updated successfully");
            } else {
                await createQuote(payload);
                alert("Quote created successfully");
            }

            navigate("/quotes");
        } catch (error) {
            console.error(error);
            alert("Operation failed");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="bg-white p-8 rounded-xl w-full max-w-xl">

                    <h2 className="text-2xl font-bold mb-6">
                        {id ? "Edit Quote" : "Create Quote"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input name="fullName" placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" />

                        <input name="email" placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" />

                        <input name="vehicleNumber" placeholder="Vehicle Number"
                            value={formData.vehicleNumber}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" />

                        <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="">Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                        </select>

                        <input name="city" placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" />

                        <select name="insuranceType" value={formData.insuranceType} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="">Insurance Type</option>
                            <option value="comprehensive">Comprehensive</option>
                            <option value="third-party">Third Party</option>
                        </select>

                        <input type="number" name="vehicleAge" placeholder="Vehicle Age"
                            value={formData.vehicleAge}
                            onChange={handleChange}
                            className="w-full border p-2 rounded" />

                        <button className="w-full bg-blue-600 text-white py-2 rounded">
                            {id ? "Update Quote" : "Generate Quote"}
                        </button>

                    </form>
                </div>
            </div>

        </>
    );
}

export default QuoteFormPage;