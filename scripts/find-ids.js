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

async function findIDs() {
    console.log('--- Finding IDs ---');

    // 1. Football (Vasco)
    console.log('\nSearching for Vasco da Gama (Football)...');
    const footballData = await fetchAPI(
        'https://v3.football.api-sports.io/teams?search=Vasco da Gama',
        'v3.football.api-sports.io'
    );
    if (footballData?.response?.[0]) {
        const team = footballData.response[0].team;
        console.log(`FOUND: ${team.name} (ID: ${team.id})`);
    } else {
        console.log('NOT FOUND: Vasco da Gama');
        console.log(JSON.stringify(footballData, null, 2));
    }

    // 2. NFL (Steelers) - Already found ID 22, but verifying again
    console.log('\nSearching for Pittsburgh Steelers (NFL)...');
    const nflData = await fetchAPI(
        'https://v1.american-football.api-sports.io/teams?search=Pittsburgh Steelers',
        'v1.american-football.api-sports.io'
    );
    if (nflData?.response?.[0]) {
        const team = nflData.response[0];
        console.log(`FOUND: ${team.name} (ID: ${team.id})`);
    } else {
        console.log('NOT FOUND: Pittsburgh Steelers');
    }

    // 3. F1 (Competition ID)
    console.log('\nSearching for Formula 1 Competitions...');
    const f1Data = await fetchAPI(
        'https://v1.formula-1.api-sports.io/competitions',
        'v1.formula-1.api-sports.io'
    );
    if (f1Data?.response) {
        // Look for "F1 World Championship" or similar
        const f1 = f1Data.response.find(c => c.name.includes('World Championship') || c.name === 'Formula 1');
        if (f1) {
            console.log(`FOUND: ${f1.name} (ID: ${f1.id})`);
        } else {
            console.log('Listing all competitions to manually pick:');
            f1Data.response.forEach(c => console.log(`- ${c.name} (ID: ${c.id})`));
        }
    } else {
        console.log('NOT FOUND: F1 API response empty');
        console.log(JSON.stringify(f1Data, null, 2));
    }
}

findIDs();
