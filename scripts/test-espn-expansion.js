async function testESPNExpansion() {
    console.log('=== Testing ESPN Expanded Search Strategies ===\n');

    const TODAY = new Date('2025-11-24'); // Simulating "Now"

    // --- 1. SOCCER STRATEGY: Date Range Window ---
    // Fetch the last 30 days.
    console.log('⚽️ SOCCER: Testing 30-Day Window Strategy...');

    const thirtyDaysAgo = new Date(TODAY);
    thirtyDaysAgo.setDate(TODAY.getDate() - 30);

    const formatDate = (d) => d.toISOString().split('T')[0].replace(/-/g, '');
    const dateRange = `${formatDate(thirtyDaysAgo)}-${formatDate(TODAY)}`;

    const soccerUrl = `http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard?dates=${dateRange}`;
    console.log(`   Fetching range: ${dateRange}`);

    try {
        const sRes = await fetch(soccerUrl);
        const sData = await sRes.json();

        // Filter for Vasco and Completed games
        const vascoGames = sData.events?.filter(e =>
            (e.name.includes('Vasco') || e.shortName.includes('VAS')) &&
            e.status.type.completed
        );

        if (vascoGames && vascoGames.length > 0) {
            // Sort by date descending (newest first)
            vascoGames.sort((a, b) => new Date(b.date) - new Date(a.date));
            const lastMatch = vascoGames[0];

            console.log('✅ SUCCESS: Found Last Match!');
            console.log(`   Match: ${lastMatch.name}`);
            console.log(`   Date: ${lastMatch.date}`);
            console.log(`   Score: ${lastMatch.competitions[0].competitors[0].score}-${lastMatch.competitions[0].competitors[1].score}`);
        } else {
            console.log('❌ FAILED: No completed Vasco games found in last 30 days.');
        }
    } catch (e) {
        console.error('   Soccer Error:', e.message);
    }

    console.log('\n-----------------------------------\n');

    // --- 2. NFL STRATEGY: Week Backtracking ---
    // 1. Fetch current scoreboard to get current Season/Week.
    // 2. If no completed game for team, fetch Week - 1.
    console.log('🏈 NFL: Testing Week Backtracking Strategy...');

    try {
        // Step A: Get Current Context
        const currentRes = await fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
        const currentData = await currentRes.json();

        const currentSeason = currentData.season.year;
        const currentWeek = currentData.week.number;
        const currentType = currentData.season.type; // 1=Pre, 2=Reg, 3=Post

        console.log(`   Current Context: Season ${currentSeason}, Week ${currentWeek}, Type ${currentType}`);

        // Check if Steelers played/finished this week
        let lastGame = currentData.events?.find(e =>
            (e.name.includes('Steelers') || e.shortName.includes('PIT')) &&
            e.status.type.completed
        );

        if (lastGame) {
            console.log('✅ Found completed game in CURRENT week.');
        } else {
            console.log('   No completed game in current week. Backtracking to Week ' + (currentWeek - 1) + '...');

            // Step B: Fetch Previous Week
            // Note: This simple logic assumes we are in Regular Season (type 2). 
            // Handling transitions (Reg -> Post) is harder, but let's test the happy path.
            const prevWeekUrl = `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=${currentWeek - 1}&seasontype=${currentType}`;
            const prevRes = await fetch(prevWeekUrl);
            const prevData = await prevRes.json();

            lastGame = prevData.events?.find(e =>
                (e.name.includes('Steelers') || e.shortName.includes('PIT')) &&
                e.status.type.completed
            );
        }

        if (lastGame) {
            console.log('✅ SUCCESS: Found Last Game!');
            console.log(`   Game: ${lastGame.name}`);
            console.log(`   Date: ${lastGame.date}`);
            console.log(`   Score: ${lastGame.competitions[0].competitors[0].score}-${lastGame.competitions[0].competitors[1].score}`);
        } else {
            console.log('❌ FAILED: No completed Steelers game found in previous week either.');
        }

    } catch (e) {
        console.error('   NFL Error:', e.message);
    }
}

testESPNExpansion();
