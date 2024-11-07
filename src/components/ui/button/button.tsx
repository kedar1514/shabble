import React from 'react'

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

function Button({ className, children, onClick, disabled }: ButtonProps) {
    return (
        <div >
            <button
                onClick={onClick}
                disabled={disabled}
                className={`flex items-center justify-center w-full h-[48px] rounded-[10px] bg-black text-white disabled:bg-gray-medium disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            >
                {children}
            </button>
        </div>
    )
}

export default Button