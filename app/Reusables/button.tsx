
import React, { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button className={`px-4 py-2 mt-4 mr-2 rounded ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}
