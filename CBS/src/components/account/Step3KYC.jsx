import { useState } from "react";
import toast from "react-hot-toast";

const Step3KYC = ({ formData, setFormData, next, back }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            kyc: {
                ...formData.kyc,
                [e.target.name]: e.target.value,
            },
        });
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.kyc.aadhar.trim()) {
            newErrors.aadhar = "Aadhar is required";
        } else if (formData.kyc.aadhar.length !== 12) {
            newErrors.aadhar = "Aadhar must be 12 digits";
        }

        if (!formData.kyc.pan.trim()) {
            newErrors.pan = "PAN is required";
        } else if (formData.kyc.pan.length !== 10) {
            newErrors.pan = "PAN must be 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (!validate()) {
            toast.error("Please enter valid KYC details");
            return;
        }
        next();
    };

    return (
        <div>

            <h3 className="text-lg font-semibold mb-4">KYC Details</h3>

            {/* Aadhar */}
            <div className="mb-3">
                <input
                    type="text"
                    name="aadhar"
                    placeholder="Aadhar Number"
                    value={formData.kyc.aadhar}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.aadhar && (
                    <p className="text-red-500 text-sm">{errors.aadhar}</p>
                )}
            </div>

            {/* PAN */}
            <div className="mb-3">
                <input
                    type="text"
                    name="pan"
                    placeholder="PAN Number"
                    value={formData.kyc.pan}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.pan && (
                    <p className="text-red-500 text-sm">{errors.pan}</p>
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

export default Step3KYC;