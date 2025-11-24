// const { getNextEvents, getLastEvents, getLeagueNextEvents, TEAMS, LEAGUES } = require('../src/lib/api');

// Standalone script to verify API
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

const TEAMS = { VASCO: '134282', STEELERS: '134925' };
const LEAGUES = { F1: '4370' };

async function fetchFromAPI(endpoint) {
    try {
        const res = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error.message);
        return {};
    }
}

async function test() {
    console.log('--- Testing Vasco API ---');
    const vascoNext = await fetchFromAPI(`eventsnext.php?id=${TEAMS.VASCO}`);
    console.log('Next Match:', vascoNext.events ? vascoNext.events[0].strEvent : 'None');

    const vascoLast = await fetchFromAPI(`eventslast.php?id=${TEAMS.VASCO}`);
    console.log('Last Match:', vascoLast.results ? vascoLast.results[0].strEvent : 'None');

    console.log('\n--- Testing Steelers API ---');
    const steelersNext = await fetchFromAPI(`eventsnext.php?id=${TEAMS.STEELERS}`);
    console.log('Next Game:', steelersNext.events ? steelersNext.events[0].strEvent : 'None');

    console.log('\n--- Testing F1 API ---');
    const f1Next = await fetchFromAPI(`eventsnextleague.php?id=${LEAGUES.F1}`);
    console.log('Next Race:', f1Next.events ? f1Next.events[0].strEvent : 'None');
}


test();
