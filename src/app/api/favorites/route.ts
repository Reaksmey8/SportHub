import { NextResponse } from "next/server";
import { favoritesApi } from "@/services/api/favorites";

export const dynamic = "force-dynamic";

/**
 * Next.js API Route proxy to prevent browser CORS restrictions
 * when communicating with the Spring Boot / Nginx backend API.
 */
export async function GET() {
  try {
    const favorites = await favoritesApi.getFavorites();
    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await favoritesApi.createFavorite(payload);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to toggle favorite" },
      { status: 500 }
    );
  }
}
