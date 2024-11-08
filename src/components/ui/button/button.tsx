import React from 'react'

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

function Button({ className, children, onClick, disabled }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${className} flex items-center justify-center w-full h-[48px] rounded-[10px] bg-black text-white disabled:bg-gray-500 disabled:opacity-20 disabled:cursor-not-allowed`}
        >
            {children}
        </button>
    )
}

export default Button