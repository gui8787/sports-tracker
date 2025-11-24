import Card from '@/components/Card';
import Link from 'next/link';
import { getVascoNextMatch, getSteelersNextMatch, getF1NextRace } from '@/lib/api';

function getStatusBadge(status: string) {
  const statusMap: Record<string, { label: string; color: string }> = {
    'STATUS_SCHEDULED': { label: 'UPCOMING', color: '#3b82f6' },
    'STATUS_IN_PROGRESS': { label: 'LIVE', color: '#ef4444' },
    'STATUS_FINAL': { label: 'FINAL', color: '#6b7280' },
  };
  return statusMap[status] || { label: 'TBD', color: '#94a3b8' };
}

export default async function Home() {
  // Fetch data in parallel
  const [vascoNext, steelersNext, f1Next] = await Promise.all([
    getVascoNextMatch(),
    getSteelersNextMatch(),
    getF1NextRace(),
  ]);

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
              {vascoNext && (
                <span className="badge" style={{ background: getStatusBadge(vascoNext.competitions[0]?.status?.type?.name).color }}>
                  {getStatusBadge(vascoNext.competitions[0]?.status?.type?.name).label}
                </span>
              )}
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              {vascoNext ? (
                <>
                  {/* Team Logos */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    {vascoNext.competitions[0]?.competitors?.map((comp) => (
                      <div key={comp.id} style={{ textAlign: 'center' }}>
                        {comp.team.logo && (
                          <img src={comp.team.logo} alt={comp.team.displayName} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                        )}
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: '600' }}>
                          {comp.team.abbreviation}
                        </div>
                        {comp.score && (
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem' }}>
                            {comp.score}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {vascoNext.name}
                  </div>
                  <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
                    {new Date(vascoNext.date).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    {vascoNext.competitions[0]?.venue?.fullName || 'TBD'}
                  </div>
                </>
              ) : (
                <div style={{ color: '#94a3b8' }}>No upcoming matches found</div>
              )}
            </div>
          </Card>
        </Link>

        {/* Steelers Card */}
        <Link href="/steelers">
          <Card title="Pittsburgh Steelers">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>🏈</span>
              {steelersNext && (
                <span className="badge" style={{ background: getStatusBadge(steelersNext.competitions[0]?.status?.type?.name).color }}>
                  {getStatusBadge(steelersNext.competitions[0]?.status?.type?.name).label}
                </span>
              )}
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              {steelersNext ? (
                <>
                  {/* Team Logos */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    {steelersNext.competitions[0]?.competitors?.map((comp) => (
                      <div key={comp.id} style={{ textAlign: 'center' }}>
                        {comp.team.logo && (
                          <img src={comp.team.logo} alt={comp.team.displayName} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                        )}
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: '600' }}>
                          {comp.team.abbreviation}
                        </div>
                        {comp.score && (
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem' }}>
                            {comp.score}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                    {steelersNext.name}
                  </div>
                  <div style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
                    {new Date(steelersNext.date).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    {steelersNext.competitions[0]?.venue?.fullName || 'TBD'}
                  </div>
                </>
              ) : (
                <div style={{ color: '#94a3b8' }}>No upcoming games found</div>
              )}
            </div>
          </Card>
        </Link>

        {/* F1 Card */}
        <Link href="/f1">
          <Card title="Formula 1">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>🏎️</span>
              <span className="badge" style={{ background: '#334155' }}>Next Race</span>
            </div>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              {f1Next ? (
                <>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>{f1Next.raceName}</div>
                  <div style={{ color: '#e10600', fontWeight: 'bold' }}>{f1Next.Circuit.circuitName}</div>
                  <div style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
                    {f1Next.date} {f1Next.time ? `@ ${f1Next.time.substring(0, 5)}` : ''}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8' }}>Schedule not available</div>
                </div>
              )}
            </div>
          </Card>
        </Link>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent News</h2>
        <div className="grid">
          <Card title="Data Source Update">
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              We are now using <strong>ESPN</strong> and <strong>Ergast</strong> APIs to bring you the latest 2025 schedule data!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
