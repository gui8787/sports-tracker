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

async function verifySeason() {
    console.log('--- Verifying Season Schedule ---');

    // 1. Vasco (Football) - Season 2025
    console.log('\nFetching Vasco Fixtures (Season 2025)...');
    const vascoData = await fetchAPI(
        'https://v3.football.api-sports.io/fixtures?team=133&season=2025',
        'v3.football.api-sports.io'
    );
    if (vascoData?.response?.length > 0) {
        const futureMatches = vascoData.response.filter(f => new Date(f.fixture.date) > new Date());
        console.log(`FOUND ${vascoData.response.length} matches.`);
        console.log(`Future matches: ${futureMatches.length}`);
        if (futureMatches.length > 0) {
            console.log(`Next Match: ${futureMatches[0].teams.home.name} vs ${futureMatches[0].teams.away.name} on ${futureMatches[0].fixture.date}`);
        }
    } else {
        console.log('NOT FOUND: Vasco Fixtures');
        console.log(JSON.stringify(vascoData, null, 2));
    }

    // 2. Steelers (NFL) - Season 2025
    console.log('\nFetching Steelers Games (Season 2025)...');
    const steelersData = await fetchAPI(
        'https://v1.american-football.api-sports.io/games?team=22&season=2025',
        'v1.american-football.api-sports.io'
    );
    if (steelersData?.response?.length > 0) {
        const futureGames = steelersData.response.filter(g => new Date(g.game.date.date) > new Date());
        console.log(`FOUND ${steelersData.response.length} games.`);
        console.log(`Future games: ${futureGames.length}`);
        if (futureGames.length > 0) {
            console.log(`Next Game: ${futureGames[0].teams.home.name} vs ${futureGames[0].teams.away.name} on ${futureGames[0].game.date.date}`);
        }
    } else {
        console.log('NOT FOUND: Steelers Games');
        console.log(JSON.stringify(steelersData, null, 2));
    }
}

verifySeason();
