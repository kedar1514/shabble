import React from 'react'

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
}

function Button({ className, children }: ButtonProps) {
    return (
        <div >
            <button className={`flex items-center justify-center w-full h-[48px] rounded-[10px] bg-black text-white ${className}`}>
                {children}
            </button>
        </div>
    )
}

export default Button