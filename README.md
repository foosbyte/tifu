# TiFu

This app is intended as an unofficial replacement for tifu.info. Its primary goal is to scrape and parse HTML data from tifu.info, which is then displayed in a user-friendly front-end. While the main motive is to explore the capabilities of Remix.run, the end product should also serve as a functional application.

## Page Structure

1. **Tournament List (Home):** This page displays a list of all tournaments, which could be filterable and sortable by status (Upcoming, Active, Ended), date, and city. Each tournament should be represented as a card or list item, displaying key information such as name, date, city, status, and the number of registered teams. Clicking on a tournament navigates to the **Tournament Detail** page.
1. **Tournament Detail:** This page provides detailed information about a specific tournament, divided into several sections accessible via a bottom navigation bar:
   - **Live & Overview (bottom navigation item 1):** This section provides an overview of the tournament, including its name, date, location, and status. It also includes a live-updated list of active and upcoming matches, showing details like round number, teams involved, table number, and start/running time.
   - **Brackets (bottom navigation item 2):** This section presents the tournament bracket, showing the progression of the tournament.
   - **Matches (bottom navigation item 3):** This section lists all past matches of the tournament, sortable by round. Each match displays the result and the teams involved.
   - **Rankings & Pre-Registrations (bottom navigation item 4):** This section displays a leaderboard showing team rankings for active and past tournaments. For upcoming tournaments, it presents a list of pre-registered teams.
1. **Settings:** This page allows users to personalize their settings, such as dark/light theme, team highlights, selected city, and push notification preferences.
1. **About/Help (static pages):** This section serves as a placeholder for static pages that provide additional information about the app, tournaments, etc.

## Features

- Highlight one or more teams in the brackets and lists
  - Send push notifications when highlighted teams are called to a table
  - Multiple highlights can be enabled for users who wish to follow multiple teams. These highlights can be color-coded and users can choose to enable/disable push notifications for them.
- Configure a preferred city and display tournaments exclusive to that city

## Technical Architecture and Implementation Ideas

- The application will leverage Remix.run as the primary React.js framework, which will handle the server-side rendering, routing, and data loading.
- Material-ui (MUI) components will be used to give the application a "native app" feel.
- Best practices for Remix apps, such as using native platform features and progressive enhancement, will be followed.
- User preferences, such as highlighted teams and selected city, will be stored in the local storage to persist between sessions and the theme selection will be stored in a cookie.
- A service worker and app manifest will be used to enable app installation, background sync, push notifications, and caching of assets and API responses.
- Mock service worker (MSW) will be utilized for development and testing to avoid constant requests to tifu.info and to ensure reproducible test cases.
- The tournament brackets could be represented as binary trees.
- Redis will be used as a database for caching and temporary data storage.
- An intelligent caching strategy will be implemented to minimize redundant scrapes:
  - Data from past tournaments will only be scraped and written (with long expiration) when accessed by a user.
  - Results of rounds in a tournament will only be scraped until all matches in that round are finished.
  - Data for active and upcoming matches will be scraped periodically in the background to enable timely push notifications.
    - Measures should be taken to prevent indefinite scraping of tournaments that are not correctly exited:
      - Stop scraping active tournaments if no changes are detected after X minutes.
      - Cease scraping of active tournaments that are more than one or two days old.
- Cheerio will be used for web scraping and the scraping process will run in a main loop on the server.
- Users will receive data either from the service worker cache or redis using a stale-while-revalidate strategy to ensure that the number of users does not impact the scraping frequency.

## Terminology of Tournament Formats

Understanding these terms may assist us in designing the data structures.

- **Tournament:** A competition where multiple players or teams compete against each other in a series of matches to determine a winner.
- **Group Stage:** A preliminary stage in some tournaments where teams are divided into groups and play against each other. The results determine which teams advance to the next stage.
- **Match:** A single game played between two teams or players.
- **Event:** A tournament can consist of multiple events. Examples of events include: Doubles (open / women / men / mixed / DYP), singles (open / women / men), etc.
- **Format:** An event is played in a specific format. Examples for event formats are: Single elimination (one bracket where teams advance until they lose one match), double elimination (two brackets - a 'winners' or 'A' and a 'losers' or 'B' bracket, where teams advance until they lose two matches), Swiss system (teams play a round-robin format preliminary round which leads to a seeding for a single elimination playoff round).
- **Seeding:** An event is structured so higher ranked players/teams initially face lower ranked players/teams (based on local or international ranking systems), or are more likely to receive a BYE.
- **BYE:** A player or team automatically advances to the next round, usually due to an uneven number of teams in an event, or if the other team withdraws.
- **Bracket:** A visual representation of the tournament structure, displaying the matchups and progression of teams throughout the knockout stage.
