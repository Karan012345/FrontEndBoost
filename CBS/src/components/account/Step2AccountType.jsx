import toast from "react-hot-toast";

const Step2AccountType = ({ formData, setFormData, next, back }) => {

    const handleSelect = (type) => {
        setFormData({
            ...formData,
            accountType: type,
        });
    };

    const handleNext = () => {
        if (!formData.accountType) {
            toast.error("Please select account type");
            return;
        }

        next();
    };

    return (
        <div>

            <h3 className="text-lg font-semibold mb-4">Select Account Type</h3>

            {/* Options */}
            <div className="flex gap-4">

                <div
                    onClick={() => handleSelect("Savings")}
                    className={`flex-1 p-4 border rounded cursor-pointer text-center 
                        ${formData.accountType === "Savings" ? "bg-blue-100 border-blue-500" : ""}
                    `}
                >
                    <p className="font-semibold">Savings</p>
                    <p className="text-sm text-gray-500">For personal use</p>
                </div>

                <div
                    onClick={() => handleSelect("Current")}
                    className={`flex-1 p-4 border rounded cursor-pointer text-center 
                        ${formData.accountType === "Current" ? "bg-blue-100 border-blue-500" : ""}
                    `}
                >
                    <p className="font-semibold">Current</p>
                    <p className="text-sm text-gray-500">For business use</p>
                </div>

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

export default Step2AccountType;