async function testESPNSchedule() {
    console.log('=== Testing ESPN Team Schedule Endpoint ===\n');

    // 1. NFL (Steelers)
    // ID: 23 (Pittsburgh Steelers)
    console.log('🏈 NFL: Fetching Steelers Schedule...');
    const nflUrl = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/23/schedule';

    try {
        const nflRes = await fetch(nflUrl);
        const nflData = await nflRes.json();

        if (nflData.events && nflData.events.length > 0) {
            console.log(`✅ Found ${nflData.events.length} events in schedule.`);

            // Filter for completed games
            const completed = nflData.events.filter(e => e.competitions[0].status.type.completed);
            console.log(`   ${completed.length} are completed.`);

            // Show last 3
            const last3 = completed.slice(-3).reverse();
            last3.forEach(e => {
                const c = e.competitions[0];
                const score = c.competitors.map(comp => `${comp.team.abbreviation} ${comp.score?.value || comp.score}`).join(' - ');
                console.log(`   ${e.date} | ${e.name} | ${score}`);
            });
        } else {
            console.log('❌ No events found in schedule.');
        }
    } catch (e) {
        console.error('   NFL Error:', e.message);
    }

    console.log('\n-----------------------------------\n');

    // 2. Soccer (Vasco)
    // ID: 3454 (Vasco da Gama) - Need to confirm ID
    // Let's try to find ID from previous responses or guess. 
    // Actually, let's use the scoreboard to find the ID if we don't have it.
    // But for this test, I'll try a common ID or search.
    // Wait, I don't have the Vasco ESPN ID handy in my code (I filtered by name).
    // Let's first fetch a scoreboard to get the ID.

    console.log('⚽️ Soccer: Getting Vasco ID...');
    let vascoId = '3454'; // Guess/Placeholder
    try {
        const sbRes = await fetch('http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard');
        const sbData = await sbRes.json();
        const vascoEvent = sbData.events?.find(e => e.name.includes('Vasco'));
        if (vascoEvent) {
            const vascoTeam = vascoEvent.competitions[0].competitors.find(c => c.team.displayName.includes('Vasco')).team;
            vascoId = vascoTeam.id;
            console.log(`   Found Vasco ID: ${vascoId}`);
        } else {
            console.log('   Could not find Vasco in current scoreboard, using default/guess.');
        }

        console.log(`   Fetching Vasco Schedule (ID: ${vascoId})...`);
        const soccerUrl = `http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/teams/${vascoId}/schedule`;
        const sRes = await fetch(soccerUrl);
        const sData = await sRes.json();

        if (sData.events) {
            const completed = sData.events.filter(e => e.competitions[0].status.type.completed);
            console.log(`✅ Found ${completed.length} completed matches.`);
            const last3 = completed.slice(-3).reverse();
            last3.forEach(e => {
                const c = e.competitions[0];
                const score = c.competitors.map(comp => `${comp.team.abbreviation} ${comp.score?.value || comp.score}`).join(' - ');
                console.log(`   ${e.date} | ${e.name} | ${score}`);
            });
        }

    } catch (e) {
        console.error('   Soccer Error:', e.message);
    }
}

testESPNSchedule();
