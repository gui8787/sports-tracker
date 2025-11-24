import Card from '@/components/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="header">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
        <span style={{ color: '#94a3b8' }}>{new Date().toLocaleDateString()}</span>
      </div>

      <div className="grid">
        {/* Vasco Card */}
        <Link href="/vasco">
          <Card title="Vasco da Gama" className="vasco-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>💢</span>
              <span className="badge badge-live">LIVE</span>
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2 - 1</div>
              <div style={{ color: '#94a3b8' }}>vs Flamengo</div>
              <div style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.5rem' }}>87' 2nd Half</div>
            </div>
          </Card>
        </Link>

        {/* Steelers Card */}
        <Link href="/steelers">
          <Card title="Pittsburgh Steelers">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>🏈</span>
              <span className="badge" style={{ background: '#334155' }}>Upcoming</span>
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>vs Ravens</div>
              <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Sunday, 1:00 PM</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Acrisure Stadium</div>
            </div>
          </Card>
        </Link>

        {/* F1 Card */}
        <Link href="/f1">
          <Card title="Formula 1">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>🏎️</span>
              <span className="badge" style={{ background: '#334155' }}>Qualifying</span>
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>Monaco GP</div>
              <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Tomorrow, 9:00 AM</div>
              <div style={{ fontSize: '0.875rem', color: '#e10600' }}>Circuit de Monaco</div>
            </div>
          </Card>
        </Link>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent News</h2>
        <div className="grid">
          <Card title="Vasco signs new striker">
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              The club announced the signing of the new star player for the upcoming season...
            </p>
          </Card>
          <Card title="Steelers defense ranking">
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              Pittsburgh's defense is currently ranked #1 in the league after week 10...
            </p>
          </Card>
          <Card title="Verstappen on pole">
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              Max Verstappen secures another pole position in a tight qualifying session...
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
