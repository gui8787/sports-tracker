import TeamHeader from '@/components/TeamHeader';
import Card from '@/components/Card';

export default function F1Page() {
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
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Monaco Grand Prix</div>
                        <div style={{ color: '#e10600', fontWeight: 'bold' }}>Round 8</div>
                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: '#94a3b8' }}>FP1</span>
                                <span>Fri, 08:30</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: '#94a3b8' }}>Quali</span>
                                <span>Sat, 11:00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#e10600' }}>
                                <span>Race</span>
                                <span>Sun, 10:00</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Driver Standings">
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #334155' }}>
                            <span style={{ width: '2rem', fontWeight: 'bold', color: '#94a3b8' }}>1</span>
                            <span style={{ flex: 1 }}>Max Verstappen</span>
                            <span style={{ fontWeight: 'bold' }}>136 PTS</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #334155' }}>
                            <span style={{ width: '2rem', fontWeight: 'bold', color: '#94a3b8' }}>2</span>
                            <span style={{ flex: 1 }}>Sergio Perez</span>
                            <span style={{ fontWeight: 'bold' }}>103 PTS</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #334155' }}>
                            <span style={{ width: '2rem', fontWeight: 'bold', color: '#94a3b8' }}>3</span>
                            <span style={{ flex: 1 }}>Charles Leclerc</span>
                            <span style={{ fontWeight: 'bold' }}>98 PTS</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 0' }}>
                            <span style={{ width: '2rem', fontWeight: 'bold', color: '#94a3b8' }}>4</span>
                            <span style={{ flex: 1 }}>Lando Norris</span>
                            <span style={{ fontWeight: 'bold' }}>83 PTS</span>
                        </li>
                    </ul>
                </Card>

                <Card title="Constructor Standings">
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #334155' }}>
                            <span>Red Bull Racing</span>
                            <span style={{ fontWeight: 'bold' }}>239</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #334155' }}>
                            <span>Ferrari</span>
                            <span style={{ fontWeight: 'bold' }}>187</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0' }}>
                            <span>McLaren</span>
                            <span style={{ fontWeight: 'bold' }}>124</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}
