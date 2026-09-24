# 📡 SportsHub — API & Data Fetching Guide (Study & Defense Reference)

This documentation is designed specifically to help you understand, explain, and defend everything related to **API integration, data fetching, and TypeScript types** in this Next.js project.

---

## 📌 1. API Overview & Endpoints

- **Backend Base URL**:  
  `https://sport-api.eunglyzhia.com/api/v1`
- **Environment Variable** (in `.env.local`):  
  `NEXT_PUBLIC_API_URL=https://sport-api.eunglyzhia.com/api/v1`

### Available Endpoints

| HTTP Method | Endpoint | Description | Return Type |
|---|---|---|---|
| `GET` | `/sports` | Get list of all sports | `Sport[]` |
| `GET` | `/sports/{uuid}` | Get details of a single sport | `Sport` |
| `GET` | `/events` | Get list of all sports events & matches | `Event[]` |
| `GET` | `/events/{uuid}` | Get details of a single event | `Event` |
| `GET` | `/categories` | Get list of all sports categories | `SportCategory[]` |
| `GET` | `/categories/{uuid}` | Get category details and its events | `SportCategory` |

---

## 📁 2. File & Folder Architecture

```text
src/
├── types/                <-- Step 1: TypeScript Interfaces (Data Contracts)
│   ├── sport.ts          # Defines the shape of a Sport object
│   ├── event.ts          # Defines the shape of an Event object
│   └── category.ts       # Defines the shape of a SportCategory object
│
├── server/               <-- Step 2: Direct Server Fetch Functions
│   ├── sports.ts         # getAllSports(), getSportByUuid(uuid)
│   ├── events.ts         # getAllEvents(), getEventByUuid(uuid)
│   └── categories.ts     # getAllCategories(), getCategoryByUuid(uuid)
│
├── services/api/         <-- Centralized API Service Layer
│   ├── client.ts         # Core fetch client with timeouts & base URL
│   ├── sports.ts         # sportsApi object
│   ├── events.ts         # eventsApi object
│   └── categories.ts     # categoriesApi object
│
└── app/                  <-- Step 3: Next.js Server Components (UI Pages)
    ├── sports/page.tsx               # /sports (Calls getAllSports)
    ├── sports/[uuid]/page.tsx        # /sports/:uuid (Calls getSportByUuid)
    ├── events/page.tsx               # /events (Calls getAllEvents)
    ├── events/[uuid]/page.tsx        # /events/:uuid (Calls getEventByUuid)
    ├── categories/page.tsx           # /categories (Calls getAllCategories)
    └── categories/[uuid]/page.tsx    # /categories/:uuid (Calls getCategoryByUuid)
```

---

## 🧩 3. Step-by-Step: How Fetching Works

### Step 3.1: Defining the Type (`src/types/sport.ts`)
Before fetching, we tell TypeScript what data fields the backend will send back:

```typescript
export interface Sport {
  id: number;
  uuid: string;
  name: string;
  description?: string; // Optional field
  category?: {
    id: number;
    name: string;
  };
  imageUrls?: string[];
  createdAt?: string;
  updatedAt?: string;
}
```

---

### Step 3.2: Writing the Fetch Function (`src/server/sports.ts`)

Here is the exact code with line-by-line annotations:

```typescript
import { Sport } from "@/types/sport";

// 1. Define the base URL with environment variable fallback
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sport-api.eunglyzhia.com/api/v1";

// 2. An async function returning a Promise of Sport array
export async function getAllSports(): Promise<Sport[]> {
  
  // 3. Native fetch() call
  const response = await fetch(`${BASE_URL}/sports`, {
    cache: "no-store", // Server-Side Rendering (SSR): always get fresh data
  });

  // 4. HTTP status verification
  if (!response.ok) {
    throw new Error(`Failed to fetch sports. HTTP Status: ${response.status}`);
  }

  // 5. Convert JSON response stream into TypeScript object
  const data = await response.json();

  // 6. Support both direct array response or wrapped { data: [...] } format
  return Array.isArray(data) ? data : data.data || [];
}

// 7. Fetch a single sport by its UUID
export async function getSportByUuid(uuid: string): Promise<Sport> {
  const response = await fetch(`${BASE_URL}/sports/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sport (${uuid}). HTTP Status: ${response.status}`);
  }

  const data = await response.json();
  return data.data !== undefined ? data.data : data;
}
```

---

### Step 3.3: Consuming the Data in a Next.js Server Component (`src/app/sports/page.tsx`)

In Next.js App Router, pages are **Server Components** by default. They can run `async/await` directly:

```tsx
import { getAllSports } from "@/server/sports";
import { SportCard } from "@/components/cards/SportCard";
import { Sport } from "@/types/sport";

export default async function SportsPage() {
  // 1. Fetch data directly on the server before sending HTML to the browser
  let sports: Sport[] = [];
  let error: string | null = null;

  try {
    sports = await getAllSports();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load sports.";
  }

  // 2. Render error state if failed
  if (error) {
    return <div className="text-rose-500">Error: {error}</div>;
  }

  // 3. Render cards by mapping over the sports array
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sports.map((sport) => (
        <SportCard key={sport.uuid || sport.id} sport={sport} />
      ))}
    </div>
  );
}
```

---

### Step 3.4: Dynamic Route by UUID (`src/app/sports/[uuid]/page.tsx`)

When the user clicks `/sports/4d03540a-...`:
Next.js extracts `uuid` from the URL parameters:

```tsx
interface SportDetailsProps {
  params: Promise<{ uuid: string }>;
}

export default async function SportDetailsPage({ params }: SportDetailsProps) {
  // In Next.js 15+, params is a Promise that must be awaited:
  const { uuid } = await params;

  // Fetch the single item
  const sport = await getSportByUuid(uuid);

  return (
    <div>
      <h1>{sport.name}</h1>
      <p>{sport.description}</p>
    </div>
  );
}
```

---

## 🎯 4. Teacher Q&A Cheat Sheet (Memorize These!)

### Q1: "How do you fetch data in this project?"
> **Your Answer:**  
> "I use the native JavaScript `fetch()` API combined with TypeScript `async/await`. The fetching is done on the server inside Next.js Server Components and server utility functions (`src/server/sports.ts`, `events.ts`, `categories.ts`)."

---

### Q2: "What is the difference between Server Component fetching and Client Component fetching (`useEffect`)?"
> **Your Answer:**  
> 1. **Server Component Fetching** (What we use for pages):
>    - Runs on the server during the request.
>    - The browser receives fully rendered HTML with data already inside (fast SEO, no blank loading spinner flicker).
>    - API keys and tokens stay secret because the code runs on the server.
> 2. **Client Component Fetching** (`useEffect`):
>    - The browser downloads an empty page first, then runs JavaScript in the browser to fetch the data.
>    - Slower initial content display and bad for SEO.

---

### Q3: "Why do you use TypeScript interfaces like `Sport` and `Event`?"
> **Your Answer:**  
> "To enforce **type safety**. TypeScript verifies that every property we use (like `sport.name` or `sport.uuid`) actually exists. It prevents runtime errors, prevents spelling mistakes, and gives autocomplete in VS Code."

---

### Q4: "What does `cache: 'no-store'` mean in the fetch options?"
> **Your Answer:**  
> "In Next.js, `cache: 'no-store'` tells the framework not to cache the HTTP response. Every time a user visits the page, Next.js sends a fresh request to the backend API so the user always sees the newest sports, events, and categories."

---

### Q5: "What is `response.ok` and why do we check it?"
> **Your Answer:**  
> "`fetch()` does not automatically reject on HTTP error codes like 404 (Not Found) or 500 (Internal Server Error). `response.ok` is a boolean that is `true` only if the HTTP status code is between 200 and 299. If `!response.ok`, we manually throw an error so our `try/catch` block can display an error message to the user."

---

### Q6: "Why do you have `await response.json()`?"
> **Your Answer:**  
> "When `fetch()` completes, the initial response is an HTTP stream. Calling `response.json()` reads that stream to completion and parses the raw JSON string into a usable JavaScript object/array. Because parsing a stream takes time, it returns a Promise, so we must `await` it."

---

### Q7: "Why did you separate the fetch code into `src/server/` instead of putting raw `fetch()` directly in the JSX components?"
> **Your Answer:**  
> "For **Separation of Concerns** and **reusability**:
> - The UI components only care about displaying the data (UI presentation).
> - The server files handle HTTP requests, headers, and error handling.
> If the API URL or endpoint changes in the future, we only have to change it in one place without touching our UI components."

---

### Q8: "How does the search query filter work?"
> **Your Answer:**  
> "In `SportsPage`, we receive `searchParams`. If the user types a query like `?search=football`, we use `.filter()` on the fetched array:
> ```typescript
> sports.filter(s => s.name.toLowerCase().includes(searchQuery))
> ```
> This filters the data in real-time."
