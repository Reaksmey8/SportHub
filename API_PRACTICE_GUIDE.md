# 📝 API Fetching Practice Guide (Cheat Sheet)

Use this guide to practice writing API fetch functions in your own practice folder.  
Each example has **clean code** and **brief, easy-to-remember explanations**.

---

## 🔑 The Golden Recipe (4 Simple Steps)

Every `fetch` function follows these 4 steps:
1. **`fetch(url, { cache: "no-store" })`** -> Calls the API.
2. **`if (!response.ok)`** -> Checks if HTTP status is 200–299.
3. **`await response.json()`** -> Converts stream to JSON.
4. **`return data`** -> Returns the final data.

---

## 🌐 Base URL
```typescript
const BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";
```

---

## 1️⃣ Sports API Practice

### TypeScript Types
```typescript
// types/sport.ts
export interface Sport {
  id: number;
  uuid: string;
  name: string;
  description?: string;
  category?: {
    id: number;
    name: string;
  };
  imageUrls?: string[];
}
```

### Fetch All Sports
```typescript
import { Sport } from "@/types/sport";

const BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

export async function getAllSports(): Promise<Sport[]> {
  // 1. Call API
  const response = await fetch(`${BASE_URL}/sports`, {
    cache: "no-store", // Always get latest data (SSR)
  });

  // 2. Check if success
  if (!response.ok) {
    throw new Error(`Failed to fetch sports: ${response.status}`);
  }

  // 3. Parse JSON
  const data = await response.json();

  // 4. Return array
  return Array.isArray(data) ? data : data.data || [];
}
```

### Fetch Single Sport by UUID
```typescript
export async function getSportByUuid(uuid: string): Promise<Sport> {
  const response = await fetch(`${BASE_URL}/sports/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sport: ${response.status}`);
  }

  const data = await response.json();
  return data.data !== undefined ? data.data : data;
}
```

---

## 2️⃣ Events API Practice

### TypeScript Types
```typescript
// types/event.ts
export interface Event {
  id: number;
  uuid: string;
  name: string;
  description?: string;
  locationName?: string;
  imageUrls?: string[];
  createdAt?: string;
}
```

### Fetch All Events
```typescript
import { Event } from "@/types/event";

const BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(`${BASE_URL}/events`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  const data: Event[] = await response.json();
  return Array.isArray(data) ? data : (data as any).data || [];
}
```

### Fetch Single Event by UUID
```typescript
export async function getEventByUuid(uuid: string): Promise<Event> {
  const response = await fetch(`${BASE_URL}/events/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event: ${response.status}`);
  }

  const data: Event = await response.json();
  return data;
}
```

---

## 3️⃣ Categories API Practice

### TypeScript Types
```typescript
// types/category.ts
export interface SportCategory {
  id: number;
  uuid: string;
  name: string;
  description?: string;
  events?: any[];
}
```

### Fetch All Categories
```typescript
import { SportCategory } from "@/types/category";

const BASE_URL = "https://sport-api.eunglyzhia.com/api/v1";

export async function getAllCategories(): Promise<SportCategory[]> {
  const response = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const data: SportCategory[] = await response.json();
  return Array.isArray(data) ? data : (data as any).data || [];
}
```

### Fetch Single Category by UUID
```typescript
export async function getCategoryByUuid(uuid: string): Promise<SportCategory> {
  const response = await fetch(`${BASE_URL}/categories/${uuid}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.status}`);
  }

  const data: SportCategory = await response.json();
  return data;
}
```

---

## 4️⃣ How to Use the Function in a Page (`page.tsx`)

In Next.js App Router, any page can be an `async` function:

```tsx
import { getAllSports } from "@/server/sports";

export default async function SportsPage() {
  // 1. Call your fetch function
  const sports = await getAllSports();

  // 2. Display the data in JSX
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sports List</h1>
      <ul>
        {sports.map((sport) => (
          <li key={sport.uuid}>
            <strong>{sport.name}</strong> - {sport.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 5️⃣ Dynamic Details Page (`[uuid]/page.tsx`)

```tsx
import { getSportByUuid } from "@/server/sports";

interface PageProps {
  params: Promise<{ uuid: string }>;
}

export default async function SportDetailPage({ params }: PageProps) {
  // 1. Await the route parameter (Next.js 15+)
  const { uuid } = await params;

  // 2. Fetch the specific item by UUID
  const sport = await getSportByUuid(uuid);

  // 3. Render the details
  return (
    <div style={{ padding: "20px" }}>
      <h1>{sport.name}</h1>
      <p>{sport.description}</p>
    </div>
  );
}
```

---

## 💡 Quick Tips for Practicing
1. Start with `getAllSports()`. Try typing it without looking.
2. Remember:
   - `async` function always returns a `Promise<Type>`.
   - `await fetch()` gets the response.
   - `await response.json()` gets the data.
