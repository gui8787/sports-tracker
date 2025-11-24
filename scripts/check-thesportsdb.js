async function checkVasco() {
    const TEAM_ID = '134282'; // Vasco ID on TheSportsDB
    const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

    console.log('--- Checking TheSportsDB for Vasco da Gama ---');

    // 1. Team Details
    console.log('\n1. Fetching Team Details...');
    try {
        const res = await fetch(`${BASE_URL}/lookupteam.php?id=${TEAM_ID}`);
        const data = await res.json();
        if (data.teams) {
            const team = data.teams[0];
            console.log(`Name: ${team.strTeam}`);
            console.log(`Stadium: ${team.strStadium} (Capacity: ${team.intStadiumCapacity})`);
            console.log(`Location: ${team.strLocation}`);
            console.log(`Website: ${team.strWebsite}`);
            console.log(`Social: ${team.strFacebook}, ${team.strTwitter}, ${team.strInstagram}`);
            console.log(`Jersey: ${team.strTeamJersey}`);
            console.log(`Logo: ${team.strTeamBadge}`);
            console.log(`Description: ${team.strDescriptionEN ? team.strDescriptionEN.substring(0, 100) + '...' : 'N/A'}`);
        } else {
            console.log('No team details found.');
        }
    } catch (e) { console.error(e.message); }

    // 2. Last Events
    console.log('\n2. Fetching Last 5 Events...');
    try {
        const res = await fetch(`${BASE_URL}/eventslast.php?id=${TEAM_ID}`);
        const data = await res.json();
        if (data.results) {
            data.results.forEach(e => {
                console.log(`- ${e.dateEvent}: ${e.strHomeTeam} ${e.intHomeScore} - ${e.intAwayScore} ${e.strAwayTeam} (${e.strLeague})`);
            });
        } else {
            console.log('No last events found.');
        }
    } catch (e) { console.error(e.message); }

    // 3. Next Events
    console.log('\n3. Fetching Next 5 Events...');
    try {
        const res = await fetch(`${BASE_URL}/eventsnext.php?id=${TEAM_ID}`);
        const data = await res.json();
        if (data.events) {
            data.events.forEach(e => {
                console.log(`- ${e.dateEvent}: ${e.strEvent} (${e.strLeague})`);
            });
        } else {
            console.log('No next events found (or null).');
        }
    } catch (e) { console.error(e.message); }
}

checkVasco();
