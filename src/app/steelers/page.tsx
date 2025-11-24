import TeamHeader from '@/components/TeamHeader';
import Card from '@/components/Card';
import LastMatchCard from '@/components/LastMatchCard';
import { getSteelersNextMatch, getSteelersRecentMatches } from '@/lib/api';

export default async function SteelersPage() {
    const [nextGame, recentMatches] = await Promise.all([
        getSteelersNextMatch(),
        getSteelersRecentMatches(),
    ]);

    function getStatusBadge(status: string) {
        const statusMap: Record<string, { label: string; color: string }> = {
            'STATUS_SCHEDULED': { label: 'UPCOMING', color: '#3b82f6' },
            'STATUS_IN_PROGRESS': { label: 'LIVE', color: '#ef4444' },
            'STATUS_FINAL': { label: 'FINAL', color: '#6b7280' },
        };
        return statusMap[status] || { label: 'TBD', color: '#94a3b8' };
    }

    return (
        <div>
            <TeamHeader
                title="Pittsburgh Steelers"
                colors={{ primary: '#ffb612', secondary: '#101820' }}
                logo="🏈"
            />

            <div className="grid">
                <Card title="Next Game">
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        {nextGame ? (
                            <>
                                {/* Status Badge */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <span className="badge" style={{ background: getStatusBadge(nextGame.competitions[0]?.status?.type?.name).color }}>
                                        {getStatusBadge(nextGame.competitions[0]?.status?.type?.name).label}
                                    </span>
                                </div>

                                {/* Team Logos */}
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
                                    {nextGame.competitions[0]?.competitors?.map((comp) => (
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

                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                    {nextGame.name}
                                </div>
                                <div style={{ color: '#94a3b8' }}>NFL</div>
                                <div style={{ marginTop: '1rem', fontSize: '1.25rem' }}>
                                    {new Date(nextGame.date).toLocaleDateString()}
                                </div>
                                <div style={{ fontSize: '1rem', color: '#ffb612' }}>
                                    {new Date(nextGame.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
                                    {nextGame.competitions[0]?.venue?.fullName || 'TBD'}
                                </div>

                                {/* Broadcast Info */}
                                {nextGame.competitions[0]?.broadcasts && nextGame.competitions[0].broadcasts.length > 0 && (
                                    <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#1e293b', borderRadius: '0.5rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>WATCH ON</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                                            {nextGame.competitions[0].broadcasts[0].names.join(', ')}
                                        </div>
                                    </div>
                                )}

                                {/* Betting Odds */}
                                {nextGame.competitions[0]?.odds && nextGame.competitions[0].odds.length > 0 && (
                                    <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#1e293b', borderRadius: '0.5rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>BETTING LINE</div>
                                        <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                                            {nextGame.competitions[0].odds[0].details}
                                        </div>
                                        {nextGame.competitions[0].odds[0].overUnder && (
                                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                                O/U: {nextGame.competitions[0].odds[0].overUnder}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ color: '#94a3b8' }}>No upcoming games found</div>
                        )}
                    </div>
                </Card>

                <LastMatchCard matches={recentMatches} title="Last Game Result" />

                <Card title="Team Leaders">
                    <div style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center' }}>
                        Data not available in free tier
                    </div>
                </Card>
            </div>
        </div>
    );
}
