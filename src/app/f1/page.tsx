import TeamHeader from '@/components/TeamHeader';
import Card from '@/components/Card';
import { getF1NextRace } from '@/lib/api';

export default async function F1Page() {
    const nextRace = await getF1NextRace();

    return (
        <div>
            <TeamHeader
                title="Formula 1"
                colors={{ primary: '#e10600', secondary: '#1f1f27' }}
                logo="🏎️"
            />

            <div className="grid">
                <Card title="Next Grand Prix">
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        {nextRace ? (
                            <>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{nextRace.raceName}</div>
                                <div style={{ color: '#e10600', fontWeight: 'bold' }}>{nextRace.Circuit.circuitName}</div>
                                <div style={{ marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#e10600' }}>
                                        <span>Race</span>
                                        <span>{nextRace.date} {nextRace.time ? `@ ${nextRace.time.substring(0, 5)}` : ''}</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1rem', color: '#94a3b8' }}>
                                    {nextRace.Circuit.Location.locality}, {nextRace.Circuit.Location.country}
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#94a3b8' }}>Schedule not available</div>
                            </div>
                        )}
                    </div>
                </Card>

                <Card title="Driver Standings">
                    <div style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center' }}>
                        Data not available in free tier
                    </div>
                </Card>

                <Card title="Constructor Standings">
                    <div style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center' }}>
                        Data not available in free tier
                    </div>
                </Card>
            </div>
        </div>
    );
}
