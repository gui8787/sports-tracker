# Sports Tracker - Project Documentation

## 1. Project Overview
**Sports Tracker** is a modern web application designed to track specific sports teams and events: **Vasco da Gama** (Soccer), **Pittsburgh Steelers** (NFL), and **Formula 1**. It provides real-time schedules, live scores, and historical results in a premium, dark-themed UI.

## 2. Architecture & Tech Stack
-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: CSS Modules / Global CSS (Custom Dark Theme)
-   **State Management**: React Server Components (RSC) for data fetching, Client Components for interactivity.

## 3. Data Strategy: The "Hybrid" Approach
We engineered a robust data layer by combining the best unofficial APIs available, avoiding expensive paid subscriptions while maintaining high data quality.

### A. ESPN (Unofficial) - The Heavy Lifter
Used for **Soccer** and **NFL**.
-   **Next Match**: Fetches the `scoreboard` endpoint to find upcoming games.
-   **Live Scores**: Provides real-time updates (status, score, clock) during games.
-   **Last Match / History**:
    -   *Challenge*: ESPN doesn't have a simple "last match" endpoint.
    -   *Solution*: We implemented smart search logic:
        -   **Soccer**: Search the last 30 days of the team's schedule.
        -   **NFL**: Check the current week; if no completed game, backtrack to the previous week.
    -   **Last 5 Matches**: Fetches the `teams/{id}/schedule` endpoint to build an interactive history modal.

### B. Ergast (via Jolpi) - The F1 Specialist
Used for **Formula 1**.
-   **Why not ESPN?**: ESPN's F1 data lacks specific circuit details and structured lap info.
-   **Solution**: Ergast provides a dedicated F1 API for the "Next Race" card, including circuit names and precise timings.

### C. Deprecated: TheSportsDB
We initially used TheSportsDB for historical data but migrated fully to ESPN to ensure data consistency (logos, team names) and reduce dependencies.

## 4. Key Features
### 🏠 Dashboard
-   At-a-glance view of the next event for all tracked teams.
-   Status badges (UPCOMING, LIVE, FINAL).
-   Live scores for active games.

### ⚽️ Vasco da Gama Page
-   **Next Match**: Date, time, venue, and broadcast info.
-   **Last Match**: Interactive card showing the result.
-   **History Modal**: Click "Last Match" to see the last 5 results.

### 🏈 Pittsburgh Steelers Page
-   **Next Game**: Includes **Betting Odds** (Spread, O/U) and broadcast networks.
-   **Last Game**: Interactive card with score and opponent.
-   **History Modal**: Full list of recent 5 games.

### 🏎️ Formula 1 Page
-   **Next Grand Prix**: Race name, circuit, and countdown (date/time).
-   **Constructor Standings**: Top 5 teams (Mock/Placeholder for now, ready for API integration).

## 5. Future Roadmap
-   [ ] **Mobile Optimization**: Refine responsiveness for small screens.
-   [ ] **User Authentication**: Allow users to save/follow different teams.
-   [ ] **Notifications**: Push alerts for game starts and goals.
-   [ ] **F1 Standings**: Connect Ergast API for real-time driver/constructor standings.
