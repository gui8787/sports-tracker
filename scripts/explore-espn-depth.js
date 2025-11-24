async function exploreESPNF1andSoccer() {
    console.log('=== Exploring ESPN Data Depth ===\n');

    // 1. Formula 1
    // Endpoint: http://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard
    console.log('🏎️  Testing ESPN F1 Data...');
    try {
        const f1Res = await fetch('http://site.api.espn.com/apis/site/v2/sports/racing/f1/scoreboard');
        const f1Data = await f1Res.json();

        if (f1Data.events && f1Data.events.length > 0) {
            const race = f1Data.events[0];
            console.log('✅ Found F1 Event:');
            console.log(`   Name: ${race.name}`);
            console.log(`   Date: ${race.date}`);
            console.log(`   Circuit: ${race.competitions[0].venue?.fullName}`);
            console.log(`   Status: ${race.status.type.name}`);
        } else {
            console.log('❌ No F1 events found in scoreboard (might be off-season or empty week).');
        }
    } catch (e) {
        console.error('Error fetching F1:', e.message);
    }

    console.log('\n-----------------------------------\n');

    // 2. Brazilian Soccer (Brasileirão) - Standings?
    // Scoreboard is good, we know that. Let's try to find standings.
    // Usually endpoints are like: .../sports/soccer/bra.1/standings (but this is often hidden/different)
    // Let's stick to what we know: Scoreboard richness.

    console.log('⚽️ Testing ESPN Brazilian Soccer (Brasileirão)...');
    try {
        const soccerRes = await fetch('http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard');
        const soccerData = await soccerRes.json();

        if (soccerData.events && soccerData.events.length > 0) {
            console.log(`✅ Found ${soccerData.events.length} Matches.`);
            const match = soccerData.events[0];
            console.log('   Sample Match Details:');
            console.log(`   - Name: ${match.name}`);
            console.log(`   - Venue: ${match.competitions[0].venue?.fullName}`);
            console.log(`   - Broadcasts: ${match.competitions[0].broadcasts?.map(b => b.names.join(', ')).join(' | ') || 'None'}`);

            // Check for detailed stats or standings links in the response
            if (match.links) {
                console.log(`   - Has ${match.links.length} external links (Gamecast, Box Score, etc.)`);
            }
        } else {
            console.log('❌ No matches found (might be off-season).');
        }
    } catch (e) {
        console.error('Error fetching Soccer:', e.message);
    }
}

exploreESPNF1andSoccer();
