import { useState } from "react";
import toast from "react-hot-toast";

const Step4Nominee = ({ formData, setFormData, next, back }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            nominee: {
                ...formData.nominee,
                [e.target.name]: e.target.value,
            },
        });
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.nominee.name.trim()) {
            newErrors.name = "Nominee name is required";
        }

        if (!formData.nominee.relation.trim()) {
            newErrors.relation = "Relation is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validate()) {
            toast.error("Please fill nominee details");
            return;
        }
        next();
    };

    return (
        <div>

            <h3 className="text-lg font-semibold mb-4">Nominee Details</h3>

            {/* Nominee Name */}
            <div className="mb-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Nominee Name"
                    value={formData.nominee.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}
            </div>

            {/* Relation */}
            <div className="mb-3">
                <input
                    type="text"
                    name="relation"
                    placeholder="Relation (e.g. Father, Wife)"
                    value={formData.nominee.relation}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.relation && (
                    <p className="text-red-500 text-sm">{errors.relation}</p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">

                <button
                    onClick={back}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                    Back
                </button>

                <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default Step4Nominee;