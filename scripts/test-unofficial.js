async function testUnofficialAPIs() {
    console.log('--- Testing Unofficial APIs ---');

    // 1. ESPN NFL (Steelers)
    console.log('\n1. Testing ESPN NFL API...');
    try {
        const res = await fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
        const data = await res.json();
        if (data.events && data.events.length > 0) {
            const event = data.events[0];
            console.log(`✅ SUCCESS: Found NFL data!`);
            console.log(`Sample Game: ${event.name}`);
            console.log(`Date: ${event.date}`);
            console.log(`Season: ${data.season.year}`);
        } else {
            console.log('❌ FAIL: No NFL events found (might be off-season, but API responded).');
            console.log(`Season: ${data.season?.year}`);
        }
    } catch (e) { console.error('❌ FAIL: ESPN NFL Error', e.message); }

    // 2. ESPN Soccer (Brasileirão - Vasco)
    console.log('\n2. Testing ESPN Soccer API (Brasileirão)...');
    try {
        // bra.1 is Brasileirão Serie A
        const res = await fetch('http://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/scoreboard');
        const data = await res.json();
        if (data.events) { // Might be empty if no games today/week
            console.log(`✅ SUCCESS: Found Soccer data!`);
            console.log(`Events found: ${data.events.length}`);
            if (data.events.length > 0) {
                console.log(`Sample Match: ${data.events[0].name}`);
                console.log(`Date: ${data.events[0].date}`);
            }
        } else {
            console.log('⚠️ NOTE: API worked but no live matches right now.');
        }
        console.log(`Season: ${data.season?.year}`);
    } catch (e) { console.error('❌ FAIL: ESPN Soccer Error', e.message); }

    // 3. Ergast F1 (Next Race)
    console.log('\n3. Testing Ergast F1 API...');
    try {
        const res = await fetch('http://api.jolpi.ca/ergast/f1/current/next.json'); // Using Jolpi mirror as Ergast original might be flaky/deprecated
        const data = await res.json();
        const race = data.MRData?.RaceTable?.Races?.[0];
        if (race) {
            console.log(`✅ SUCCESS: Found Next F1 Race!`);
            console.log(`Race: ${race.raceName}`);
            console.log(`Date: ${race.date}`);
            console.log(`Season: ${race.season}`);
        } else {
            console.log('❌ FAIL: No F1 race found.');
        }
    } catch (e) { console.error('❌ FAIL: Ergast F1 Error', e.message); }
}

testUnofficialAPIs();
