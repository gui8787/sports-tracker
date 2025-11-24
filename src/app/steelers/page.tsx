import TeamHeader from '@/components/TeamHeader';
import Card from '@/components/Card';

export default function SteelersPage() {
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
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>vs Baltimore Ravens</div>
                        <div style={{ color: '#94a3b8' }}>Week 11</div>
                        <div style={{ marginTop: '1rem', fontSize: '1.25rem' }}>Sunday, Nov 17</div>
                        <div style={{ fontSize: '1rem', color: '#ffb612' }}>1:00 PM EST</div>
                        <div style={{ marginTop: '0.5rem', color: '#94a3b8' }}>Acrisure Stadium</div>
                    </div>
                </Card>

                <Card title="Season Record">
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '1rem', fontSize: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#22c55e' }}>7</div>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Wins</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#ef4444' }}>2</div>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Losses</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#94a3b8' }}>0</div>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Ties</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: '#ffb612', fontWeight: 'bold' }}>
                        1st in AFC North
                    </div>
                </Card>

                <Card title="Team Leaders">
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Passing</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>R. Wilson</span>
                                <span style={{ fontWeight: 'bold' }}>1,250 yds</span>
                            </div>
                        </li>
                        <li style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Rushing</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>N. Harris</span>
                                <span style={{ fontWeight: 'bold' }}>650 yds</span>
                            </div>
                        </li>
                        <li>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Sacks</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>T. Watt</span>
                                <span style={{ fontWeight: 'bold' }}>9.5</span>
                            </div>
                        </li>
                    </ul>
                </Card>
            </div>
        </div>
    );
}
