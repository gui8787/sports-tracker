async function exploreESPN() {
    console.log('=== ESPN API Data Structure ===\n');

    // 1. NFL (Steelers)
    console.log('1. NFL SCOREBOARD DATA:');
    console.log('Endpoint: http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard\n');

    const nflRes = await fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
    const nflData = await nflRes.json();

    console.log('Top-level structure:');
    console.log('- leagues:', nflData.leagues?.length, 'leagues');
    console.log('- season:', nflData.season);
    console.log('- week:', nflData.week);
    console.log('- events:', nflData.events?.length, 'games\n');

    if (nflData.events?.[0]) {
        const game = nflData.events[0];
        console.log('Sample Game Structure:');
        console.log(JSON.stringify({
            id: game.id,
            name: game.name,
            shortName: game.shortName,
            date: game.date,
            status: game.status,
            competitions: game.competitions?.map(c => ({
                venue: c.venue,
                competitors: c.competitors?.map(comp => ({
                    team: { displayName: comp.team.displayName, abbreviation: comp.team.abbreviation },
                    homeAway: comp.homeAway,
                    score: comp.score
                })),
                odds: c.odds?.[0]
            }))
        }, null, 2));
    }

    console.log('\n\n2. SOCCER (Brasileirão) DATA:');
    console.log('Endpoint: http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard\n');

    const soccerRes = await fetch('http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard');
    const soccerData = await soccerRes.json();

    console.log('Top-level structure:');
    console.log('- leagues:', soccerData.leagues?.length, 'leagues');
    console.log('- season:', soccerData.season);
    console.log('- events:', soccerData.events?.length, 'matches\n');

    if (soccerData.events?.[0]) {
        const match = soccerData.events[0];
        console.log('Sample Match Structure:');
        console.log(JSON.stringify({
            id: match.id,
            name: match.name,
            shortName: match.shortName,
            date: match.date,
            status: match.status,
            competitions: match.competitions?.map(c => ({
                venue: c.venue,
                competitors: c.competitors?.map(comp => ({
                    team: { displayName: comp.team.displayName, abbreviation: comp.team.abbreviation },
                    homeAway: comp.homeAway,
                    score: comp.score
                }))
            }))
        }, null, 2));
    }

    console.log('\n\n=== AVAILABLE FIELDS ===');
    console.log('Each event/game includes:');
    console.log('✅ Game ID, Name, Short Name');
    console.log('✅ Date & Time (ISO format)');
    console.log('✅ Status (scheduled, in-progress, final)');
    console.log('✅ Venue (name, city, capacity)');
    console.log('✅ Teams (names, logos, abbreviations)');
    console.log('✅ Scores (live or final)');
    console.log('✅ Odds (betting lines)');
    console.log('✅ Broadcasts (TV channels)');
    console.log('✅ Weather (for some games)');
    console.log('✅ Season/Week info');
}

exploreESPN();
