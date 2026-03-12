import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    className = "",
    ...props
}) {

    return (
        <button
            type={type}
            className={`!${bgColor} text-black px-4 py-2 rounded-lg font-medium ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}