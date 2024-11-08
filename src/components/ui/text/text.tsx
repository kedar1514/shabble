import React from 'react'

interface TextProps {
    children: React.ReactNode;
    className?: string;
}

function Text({ children, className }: TextProps) {
    return (
        <div className={`text-xl font-base font-lato ${className}`}>
            {children}
        </div>
    )
}

export default Text