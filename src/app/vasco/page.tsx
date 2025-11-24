import TeamHeader from '@/components/TeamHeader';
import Card from '@/components/Card';
import LastMatchCard from '@/components/LastMatchCard';
import { getVascoNextMatch, getVascoRecentMatches } from '@/lib/api';

function getStatusBadge(status: string) {
    const statusMap: Record<string, { label: string; color: string }> = {
        'STATUS_SCHEDULED': { label: 'UPCOMING', color: '#3b82f6' },
        'STATUS_IN_PROGRESS': { label: 'LIVE', color: '#ef4444' },
        'STATUS_FINAL': { label: 'FINAL', color: '#6b7280' },
    };
    return statusMap[status] || { label: 'TBD', color: '#94a3b8' };
}

export default async function VascoPage() {
    const [nextMatch, recentMatches] = await Promise.all([
        getVascoNextMatch(),
        getVascoRecentMatches(),
    ]);

    return (
        <div>
            <TeamHeader
                title="Vasco da Gama"
                colors={{ primary: '#fff', secondary: '#000' }}
                logo="💢"
            />

            <div className="grid">
                <Card title="Next Match">
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                        {nextMatch ? (
                            <>
                                {/* Status Badge */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <span className="badge" style={{ background: getStatusBadge(nextMatch.competitions[0]?.status?.type?.name).color }}>
                                        {getStatusBadge(nextMatch.competitions[0]?.status?.type?.name).label}
                                    </span>
                                </div>

                                {/* Team Logos */}
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                                    {nextMatch.competitions[0]?.competitors?.map((comp) => (
                                        <div key={comp.id} style={{ textAlign: 'center' }}>
                                            {comp.team.logo && (
                                                <img src={comp.team.logo} alt={comp.team.displayName} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                                            )}
                                            <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '600' }}>
                                                {comp.team.displayName}
                                            </div>
                                            {comp.score && (
                                                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                                                    {comp.score}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                                    {nextMatch.name}
                                </div>
                                <div style={{ color: '#94a3b8' }}>Brasileirão Serie A</div>
                                <div style={{ marginTop: '1rem', fontSize: '1rem' }}>
                                    {new Date(nextMatch.date).toLocaleString()}
                                </div>
                                <div style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
                                    {nextMatch.competitions[0]?.venue?.fullName || 'TBD'}
                                </div>

                                {/* Broadcast Info */}
                                {nextMatch.competitions[0]?.broadcasts && nextMatch.competitions[0].broadcasts.length > 0 && (
                                    <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#1e293b', borderRadius: '0.5rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>WATCH ON</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                                            {nextMatch.competitions[0].broadcasts[0].names.join(', ')}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ color: '#94a3b8' }}>No upcoming matches found</div>
                        )}
                    </div>
                </Card>

                <LastMatchCard matches={recentMatches} />

                <Card title="Top Scorers">
                    <div style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center' }}>
                        Data not available in free tier
                    </div>
                </Card>
            </div>
        </div>
    );
}
