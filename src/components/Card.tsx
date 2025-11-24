import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
    return (
        <div className={`card ${className}`}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#cbd5e1' }}>{title}</h3>
            {children}
        </div>
    );
}
