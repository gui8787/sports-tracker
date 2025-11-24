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

async function verifySchedule() {
    console.log('--- Verifying Schedules ---');

    // 1. Vasco Next Match
    console.log('\nFetching Vasco Next Match...');
    const vascoData = await fetchAPI(
        'https://v3.football.api-sports.io/fixtures?team=133&next=1',
        'v3.football.api-sports.io'
    );
    if (vascoData?.response?.[0]) {
        const fixture = vascoData.response[0];
        console.log(`FOUND Vasco Match: ${fixture.teams.home.name} vs ${fixture.teams.away.name}`);
        console.log(`Date: ${fixture.fixture.date}`);
    } else {
        console.log('NOT FOUND: Vasco Next Match');
        console.log(JSON.stringify(vascoData, null, 2));
    }

    // 2. Steelers Next Game
    console.log('\nFetching Steelers Next Game...');
    const steelersData = await fetchAPI(
        'https://v1.american-football.api-sports.io/games?team=22&next=1',
        'v1.american-football.api-sports.io'
    );
    if (steelersData?.response?.[0]) {
        const game = steelersData.response[0];
        console.log(`FOUND Steelers Game: ${game.teams.home.name} vs ${game.teams.away.name}`);
        console.log(`Date: ${game.game.date.date}`);
    } else {
        console.log('NOT FOUND: Steelers Next Game');
        console.log(JSON.stringify(steelersData, null, 2));
    }
}

verifySchedule();
