async function testESPNHistory() {
    console.log('=== Testing ESPN Historical Data ===\n');

    // 1. NFL (Steelers) - Try to get past results
    // The scoreboard endpoint defaults to the current week.
    // To get past games, we usually need to know the specific dates or week.
    // Let's see what the default scoreboard gives us for a completed week (if we were in one)
    // or try to fetch a specific past date if possible.

    // Strategy: Try to fetch the scoreboard for a known past date (e.g., Nov 17 2024 - Week 11)
    // Note: Since we are in 2025 in this simulation, let's try a date relative to "now" (Nov 24, 2025).
    // Let's try to fetch the previous week.

    const today = new Date('2025-11-24');
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const dateStr = lastWeek.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD

    console.log(`1. NFL: Fetching scoreboard for ${dateStr} (Last Week)...`);
    const nflUrl = `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${dateStr}`;

    try {
        const nflRes = await fetch(nflUrl);
        const nflData = await nflRes.json();

        // Filter for Steelers
        const steelersGame = nflData.events?.find(e =>
            e.name.includes('Steelers') || e.shortName.includes('PIT')
        );

        if (steelersGame) {
            console.log('✅ Found Steelers Game:');
            console.log(`   ${steelersGame.name} (${steelersGame.date})`);
            console.log(`   Status: ${steelersGame.status.type.name}`);
            console.log(`   Score: ${steelersGame.competitions[0].competitors[0].score} - ${steelersGame.competitions[0].competitors[1].score}`);
        } else {
            console.log('❌ No Steelers game found for this date.');
            console.log('   (This highlights the difficulty: we need to know exactly WHEN they played)');
        }
    } catch (e) {
        console.error('Error fetching NFL:', e.message);
    }

    console.log('\n-----------------------------------\n');

    // 2. Soccer (Vasco) - Try to get past results
    // Soccer schedules are more irregular.
    // Let's try to fetch a range of dates? ESPN supports 'dates=YYYYMMDD-YYYYMMDD' sometimes.

    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14);
    const dateRange = `${twoWeeksAgo.toISOString().split('T')[0].replace(/-/g, '')}-${today.toISOString().split('T')[0].replace(/-/g, '')}`;

    console.log(`2. Soccer: Fetching scoreboard for range ${dateRange}...`);
    const soccerUrl = `http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?dates=${dateRange}`;

    try {
        const soccerRes = await fetch(soccerUrl);
        const soccerData = await soccerRes.json();

        // Filter for Vasco
        const vascoGames = soccerData.events?.filter(e =>
            e.name.includes('Vasco') || e.shortName.includes('VAS')
        );

        if (vascoGames && vascoGames.length > 0) {
            console.log(`✅ Found ${vascoGames.length} Vasco Games:`);
            vascoGames.forEach(g => {
                console.log(`   ${g.name} (${g.date})`);
                console.log(`   Status: ${g.status.type.name}`);
                const score = g.competitions[0].competitors.map(c => c.score).join('-');
                console.log(`   Score: ${score}`);
            });
        } else {
            console.log('❌ No Vasco games found in this range.');
        }
    } catch (e) {
        console.error('Error fetching Soccer:', e.message);
    }
}

testESPNHistory();
