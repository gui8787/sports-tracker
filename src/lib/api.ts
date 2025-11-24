// --- Types ---

// ESPN Event (Shared for Next & Last Match)
export interface ESPNEvent {
    id: string;
    name: string;
    shortName: string;
    date: string;
    competitions: {
        id: string;
        venue?: {
            fullName: string;
            address?: { city: string; country?: string }
        };
        competitors: {
            id: string;
            team: {
                id: string;
                displayName: string;
                abbreviation: string;
                logo?: string;
            };
            homeAway: 'home' | 'away';
            score?: string;
            records?: { summary: string }[];
        }[];
        status: {
            type: {
                id: string;
                name: string; // 'STATUS_SCHEDULED', 'STATUS_IN_PROGRESS', 'STATUS_FINAL'
                state: string; // 'pre', 'in', 'post'
                completed: boolean;
                description: string;
                detail: string;
                shortDetail: string;
            };
        };
        broadcasts?: {
            market: string;
            names: string[];
        }[];
        odds?: {
            details: string;
            overUnder: number;
        }[];
    }[];
    status: { type: { name: string; detail: string } };
    links?: { href: string; text: string }[];
}

// Ergast F1 Race (for Next Race)
export interface F1Race {
    season: string;
    round: string;
    raceName: string;
    Circuit: { circuitName: string; Location: { locality: string; country: string } };
    date: string;
    time: string;
}

// --- Helper Functions ---

// 1. ESPN Fetcher
async function fetchESPN(sport: string, league: string, params: string = '') {
    try {
        const url = `http://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard${params ? `?${params}` : ''}`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        return await res.json();
    } catch (error) {
        console.error('ESPN Error:', error);
        return null;
    }
}

// 2. Vasco (Soccer)
export async function getVascoNextMatch() {
    const data = await fetchESPN('soccer', 'bra.1');
    if (!data?.events) return null;
    return data.events.find((e: any) => e.name.includes('Vasco') || e.shortName.includes('VAS')) as ESPNEvent | undefined;
}

export async function getVascoLastMatch() {
    // Strategy: Fetch last 30 days to find completed games
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const formatDate = (d: Date) => d.toISOString().split('T')[0].replace(/-/g, '');
    const dateRange = `dates=${formatDate(thirtyDaysAgo)}-${formatDate(today)}`;

    const data = await fetchESPN('soccer', 'bra.1', dateRange);
    if (!data?.events) return null;

    // Filter for Vasco and Completed games
    const vascoGames = data.events.filter((e: any) =>
        (e.name.includes('Vasco') || e.shortName.includes('VAS')) &&
        e.status.type.completed
    );

    if (!vascoGames.length) return null;

    // Sort by date descending (newest first)
    vascoGames.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return vascoGames[0] as ESPNEvent;
}

export async function getVascoRecentMatches() {
    // ID 3454 is Vasco da Gama
    const url = 'http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/teams/3454/schedule';
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        const data = await res.json();
        if (!data?.events) return [];

        const completed = data.events.filter((e: any) => e.competitions[0].status.type.completed);
        // Sort by date descending (newest first) and take 5
        return completed.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5) as ESPNEvent[];
    } catch (error) {
        console.error('Vasco Schedule Error:', error);
        return [];
    }
}

// 3. Steelers (NFL)
export async function getSteelersNextMatch() {
    const data = await fetchESPN('football', 'nfl');
    if (!data?.events) return null;
    return data.events.find((e: any) => e.name.includes('Steelers') || e.shortName.includes('PIT')) as ESPNEvent | undefined;
}

export async function getSteelersLastMatch() {
    // Strategy: Check current week, if no completed game, check previous week

    // 1. Fetch current scoreboard
    const currentData = await fetchESPN('football', 'nfl');
    if (!currentData) return null;

    // Check for completed game in current week
    let lastGame = currentData.events?.find((e: any) =>
        (e.name.includes('Steelers') || e.shortName.includes('PIT')) &&
        e.status.type.completed
    );

    if (lastGame) return lastGame as ESPNEvent;

    // 2. If not found, backtrack to previous week
    const currentWeek = currentData.week?.number;
    const currentType = currentData.season?.type;

    if (currentWeek > 1) {
        const prevData = await fetchESPN('football', 'nfl', `week=${currentWeek - 1}&seasontype=${currentType}`);
        lastGame = prevData?.events?.find((e: any) =>
            (e.name.includes('Steelers') || e.shortName.includes('PIT')) &&
            e.status.type.completed
        );
    }

    return lastGame as ESPNEvent | undefined;
}

export async function getSteelersRecentMatches() {
    // ID 23 is Pittsburgh Steelers
    const url = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/23/schedule';
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        const data = await res.json();
        if (!data?.events) return [];

        const completed = data.events.filter((e: any) => e.competitions[0].status.type.completed);
        // Sort by date descending (newest first) and take 5
        return completed.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5) as ESPNEvent[];
    } catch (error) {
        console.error('Steelers Schedule Error:', error);
        return [];
    }
}

// 4. Ergast (F1 Next Race)
export async function getF1NextRace() {
    try {
        const res = await fetch('http://api.jolpi.ca/ergast/f1/current/next.json', { next: { revalidate: 86400 } });
        const data = await res.json();
        return data.MRData?.RaceTable?.Races?.[0] as F1Race | undefined;
    } catch (error) {
        console.error('Ergast Error:', error);
        return null;
    }
}
