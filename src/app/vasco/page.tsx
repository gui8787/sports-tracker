import TeamHeader from '@/components/TeamHeader';
import Card from '@/components/Card';

export default function VascoPage() {
    return (
        <div>
            <TeamHeader
                title="Vasco da Gama"
                colors={{ primary: '#fff', secondary: '#000' }}
                logo="💢"
            />

            <div className="grid">
                <Card title="Current Match">
                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>2 - 1</div>
                        <div style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '1rem' }}>LIVE • 87'</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem' }}>
                            <span>Vasco</span>
                            <span>Flamengo</span>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                            ⚽ Payet (12')<br />
                            ⚽ Vegetti (45')
                        </div>
                    </div>
                </Card>

                <Card title="Next Match">
                    <div style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>vs Palmeiras</div>
                        <div style={{ color: '#94a3b8' }}>Brasileirão Série A</div>
                        <div style={{ marginTop: '0.5rem' }}>Sunday, 16:00</div>
                        <div style={{ marginTop: '0.5rem', color: '#94a3b8' }}>Allianz Parque</div>
                    </div>
                </Card>

                <Card title="Top Scorers">
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
                            <span>Vegetti</span>
                            <span style={{ fontWeight: 'bold' }}>12 ⚽</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
                            <span>Payet</span>
                            <span style={{ fontWeight: 'bold' }}>8 ⚽</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                            <span>Piton</span>
                            <span style={{ fontWeight: 'bold' }}>4 ⚽</span>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}
