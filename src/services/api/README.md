# SportsHub API Service Layer Architecture

This directory is prepared for future backend/REST API integration when endpoints are provided.

## Current State (Stage 1)
- Data is loaded statically from strongly-typed mock files in `@/data/*`.
- Components consume data via props, keeping UI components decoupled from data-fetching logic.

## Future Architecture (Stage 2)
When the teacher/backend API is provided:
1. Define environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.example.com/v1
   ```
2. Create dedicated service modules in this directory:
   - `sportsService.ts`: `getSports()`, `getSportBySlug(slug)`
   - `matchesService.ts`: `getFeaturedMatches()`, `getMatchesByStatus(status)`, `getMatchDetails(id)`
   - `newsService.ts`: `getLatestNews()`, `getArticleBySlug(slug)`
   - `competitionsService.ts`: `getCompetitions()`, `getCompetitionById(id)`

3. Replace static data imports in Server Components (`app/page.tsx`, etc.) with calls to the service functions:
   ```typescript
   // Example future Server Component usage:
   const matches = await matchesService.getFeaturedMatches();
   ```

4. Since UI components (`SportCard`, `MatchCard`, `NewsCard`, etc.) rely solely on the TypeScript contracts defined in `@/types/*`, zero changes to the UI components will be required!

