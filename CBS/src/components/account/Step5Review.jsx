import toast from "react-hot-toast";

const Step5Review = ({ formData, back, handleSubmit }) => {

    const handleFinalSubmit = () => {
        // basic safety check
        if (!formData.name || !formData.email) {
            toast.error("Missing required details");
            return;
        }

        handleSubmit();
    };

    return (
        <div>

            <h3 className="text-lg font-semibold mb-4">Review Details</h3>

            {/* Basic Info */}
            <div className="mb-4 border p-3 rounded bg-gray-50">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Account Type:</strong> {formData.accountType}</p>
            </div>

            {/* KYC */}
            <div className="mb-4 border p-3 rounded bg-gray-50">
                <p><strong>Aadhar:</strong> {formData.kyc.aadhar}</p>
                <p><strong>PAN:</strong> {formData.kyc.pan}</p>
            </div>

            {/* Nominee */}
            <div className="mb-4 border p-3 rounded bg-gray-50">
                <p><strong>Nominee Name:</strong> {formData.nominee.name}</p>
                <p><strong>Relation:</strong> {formData.nominee.relation}</p>
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
                    onClick={handleFinalSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                >
                    Confirm & Create
                </button>

            </div>

        </div>
    );
};

export default Step5Review;