import React from 'react';

interface TeamHeaderProps {
    title: string;
    colors: {
        primary: string;
        secondary: string;
    };
    logo?: string; // Optional emoji or image URL
}

export default function TeamHeader({ title, colors, logo }: TeamHeaderProps) {
    return (
        <div
            style={{
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                padding: '3rem 2rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
        >
            {logo && <div style={{ fontSize: '4rem' }}>{logo}</div>}
            <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>{title}</h1>
                <p style={{ opacity: 0.9, fontSize: '1.125rem' }}>Official Tracker</p>
            </div>
        </div>
    );
}
