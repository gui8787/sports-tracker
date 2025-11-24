'use client';

import { useState } from 'react';
import Card from './Card';
import { ESPNEvent } from '@/lib/api';

interface LastMatchCardProps {
    matches: ESPNEvent[];
    title?: string;
}

function getStatusBadge(status: string) {
    const statusMap: Record<string, { label: string; color: string }> = {
        'STATUS_SCHEDULED': { label: 'UPCOMING', color: '#3b82f6' },
        'STATUS_IN_PROGRESS': { label: 'LIVE', color: '#ef4444' },
        'STATUS_FINAL': { label: 'FINAL', color: '#6b7280' },
    };
    return statusMap[status] || { label: 'TBD', color: '#94a3b8' };
}

// Helper to safely get score (handles object or string)
function getScore(competitor: any) {
    if (!competitor.score) return '';
    if (typeof competitor.score === 'object') {
        return competitor.score.value || competitor.score.displayValue || '';
    }
    return competitor.score;
}

export default function LastMatchCard({ matches, title = "Last Match" }: LastMatchCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const lastMatch = matches[0];

    if (!lastMatch) {
        return (
            <Card title={title}>
                <div style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8' }}>
                    No recent matches found
                </div>
            </Card>
        );
    }

    return (
        <>
            <div onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
                <Card title={title}>
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        {/* Status Badge */}
                        <div style={{ marginBottom: '1rem' }}>
                            <span className="badge" style={{ background: getStatusBadge(lastMatch.competitions[0]?.status?.type?.name).color }}>
                                {getStatusBadge(lastMatch.competitions[0]?.status?.type?.name).label}
                            </span>
                        </div>

                        {/* Team Logos & Scores */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                            {lastMatch.competitions[0]?.competitors?.map((comp) => (
                                <div key={comp.id} style={{ textAlign: 'center' }}>
                                    {comp.team.logo && (
                                        <img src={comp.team.logo} alt={comp.team.displayName} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                                    )}
                                    <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600' }}>
                                        {comp.team.displayName}
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                                        {getScore(comp)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {lastMatch.name}
                        </div>
                        <div style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
                            {new Date(lastMatch.date).toLocaleDateString()}
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#3b82f6', fontWeight: 'bold' }}>
                            CLICK TO SEE LAST 5 MATCHES
                        </div>
                    </div>
                </Card>
            </div>

            {/* Modal */}
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 50,
                    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem'
                }} onClick={() => setIsOpen(false)}>
                    <div style={{
                        backgroundColor: '#1e293b', borderRadius: '1rem', padding: '2rem',
                        maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Last 5 Matches</h2>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {matches.map((match) => (
                                <div key={match.id} style={{
                                    backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.5rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                }}>
                                    <div style={{ fontSize: '0.875rem', color: '#94a3b8', width: '80px' }}>
                                        {new Date(match.date).toLocaleDateString()}
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                                        {match.competitions[0].competitors.map((comp, i) => (
                                            <div key={comp.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexDirection: i === 0 ? 'row' : 'row-reverse' }}>
                                                <span style={{ fontWeight: 'bold' }}>{comp.team.abbreviation}</span>
                                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{getScore(comp)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ width: '60px', textAlign: 'right' }}>
                                        <span className="badge" style={{
                                            background: getStatusBadge(match.competitions[0].status.type.name).color,
                                            fontSize: '0.6rem', padding: '0.2rem 0.4rem'
                                        }}>
                                            {getStatusBadge(match.competitions[0].status.type.name).label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
