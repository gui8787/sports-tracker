const API_KEY = '809ed88ccbd150fbe2266b965c4adf3d';

async function fetchAPI(url, host) {
    try {
        const res = await fetch(url, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': host
            }
        });
        if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error.message);
        return null;
    }
}

async function verifyF1() {
    console.log('--- Verifying F1 Races ---');

    // Try fetching next race for 2025 season
    console.log('\nFetching next race for 2025 season...');
    const data = await fetchAPI(
        'https://v1.formula-1.api-sports.io/races?season=2025&next=1&type=race',
        'v1.formula-1.api-sports.io'
    );

    if (data?.response?.[0]) {
        const race = data.response[0];
        console.log(`FOUND Next Race: ${race.competition.name} @ ${race.circuit.name}`);
        console.log(`Date: ${race.date}`);
    } else {
        console.log('NOT FOUND: Next Race');
        console.log(JSON.stringify(data, null, 2));
    }
}

verifyF1();
