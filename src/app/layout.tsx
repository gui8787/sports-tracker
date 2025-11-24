import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sports Tracker',
  description: 'Track Vasco, Steelers, and F1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ borderBottom: '1px solid var(--card-border)', padding: '1rem 0', background: 'var(--card-bg)' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏆 <span style={{ background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SportsTracker</span>
            </Link>
            <div>
              <Link href="/vasco" className="nav-link">Vasco</Link>
              <Link href="/steelers" className="nav-link">Steelers</Link>
              <Link href="/f1" className="nav-link">F1</Link>
            </div>
          </div>
        </nav>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
