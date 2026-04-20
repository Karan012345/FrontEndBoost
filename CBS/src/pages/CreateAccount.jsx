import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getData, setData } from "../utils/storage";

// Steps
import Step1Basic from "../components/account/Step1Basic";
import Step2AccountType from "../components/account/Step2AccountType";
import Step3KYC from "../components/account/Step3KYC";
import Step4Nominee from "../components/account/Step4Nominee";
import Step5Review from "../components/account/Step5Review";

const CreateAccount = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        accountType: "Savings",
        kyc: {
            aadhar: "",
            pan: "",
        },
        nominee: {
            name: "",
            relation: "",
        },
    });

    const next = () => setStep(prev => prev + 1);
    const back = () => setStep(prev => prev - 1);

    // 🔥 Final Submit
    const handleSubmit = () => {
        const user = getData("currentUser");

        if (!user) {
            toast.error("User not found");
            return;
        }

        let accounts = getData("accounts") || [];

        // ✅ check if already exists
        const already = accounts.find(a => a.userId === user.id);
        if (already) {
            toast.error("Account already exists");
            return;
        }

        const newAccount = {
            accountId: Date.now(),
            userId: user.id,
            type: formData.accountType,
            kyc: formData.kyc,
            nominee: formData.nominee,
        };

        // ✅ FIRST push
        accounts.push(newAccount);

        // ✅ THEN save
        setData("accounts", accounts);

        toast.success("Account created successfully");

        // 🔥 force refresh (important for your setup)
        setTimeout(() => {
            navigate("/dashboard");
            window.location.reload();
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">

                <h2 className="text-2xl font-bold mb-6 text-blue-900 text-center">
                    Create Bank Account
                </h2>

                {/* 🔥 Step Render */}
                {step === 1 && (
                    <Step1Basic formData={formData} setFormData={setFormData} next={next} />
                )}

                {step === 2 && (
                    <Step2AccountType formData={formData} setFormData={setFormData} next={next} back={back} />
                )}

                {step === 3 && (
                    <Step3KYC formData={formData} setFormData={setFormData} next={next} back={back} />
                )}

                {step === 4 && (
                    <Step4Nominee formData={formData} setFormData={setFormData} next={next} back={back} />
                )}

                {step === 5 && (
                    <Step5Review formData={formData} back={back} handleSubmit={handleSubmit} />
                )}

                {/* 🔥 Step Indicator */}
                <p className="text-center mt-4 text-sm text-gray-500">
                    Step {step} of 5
                </p>

            </div>
        </div>
    );
};

export default CreateAccount;