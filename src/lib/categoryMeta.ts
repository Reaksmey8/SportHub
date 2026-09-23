import { SportCategory } from "@/types/category";

export interface CategoryMeta {
  emoji: string;
  tag: string;
  fallbackImage: string;
  cleanDescription: string;
}

const CATEGORY_MAP: Record<string, CategoryMeta> = {
  football: {
    emoji: "⚽",
    tag: "Ball Sport",
    fallbackImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Explore professional leagues, international fixtures, match highlights, and club updates.",
  },
  soccer: {
    emoji: "⚽",
    tag: "Ball Sport",
    fallbackImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Explore professional leagues, international fixtures, match highlights, and club updates.",
  },
  tennis: {
    emoji: "🎾",
    tag: "Racket Sport",
    fallbackImage: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Follow Grand Slam tournaments, ATP and WTA tours, player rankings, and high-stakes court action.",
  },
  boxing: {
    emoji: "🥊",
    tag: "Combat Sport",
    fallbackImage: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Championship bouts, Kun Khmer fixtures, fighter profiles, and professional combat tournaments.",
  },
  box: {
    emoji: "🥊",
    tag: "Combat Sport",
    fallbackImage: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Championship bouts, fighter profiles, and professional combat tournaments.",
  },
  swimming: {
    emoji: "🏊",
    tag: "Aquatics",
    fallbackImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Competitive aquatics, freestyle to butterfly events, world championships, and national swimming records.",
  },
  racing: {
    emoji: "🏎️",
    tag: "Motorsport",
    fallbackImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "High-octane motorsport racing, Grand Prix circuits, driver standings, and speed trials.",
  },
  volleyball: {
    emoji: "🏐",
    tag: "Team Sport",
    fallbackImage: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Fast-paced team sport where competitors send the ball over the net with strategic spikes and rallies.",
  },
  chess: {
    emoji: "♟️",
    tag: "Mind Sport",
    fallbackImage: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Strategic board game of intellect, tactical calculation, classical tournaments, and Grandmaster matches.",
  },
  cycling: {
    emoji: "🚴",
    tag: "Endurance",
    fallbackImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Road races, mountain trails, velodrome sprints, and international peloton tours.",
  },
  running: {
    emoji: "🏃",
    tag: "Athletics",
    fallbackImage: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Marathons, half marathons, 5K fun runs, track events, and endurance distance challenges.",
  },
  basketball: {
    emoji: "🏀",
    tag: "Court Sport",
    fallbackImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "Professional court games, playoff tournaments, slam dunks, and team leagues.",
  },
  badminton: {
    emoji: "🏸",
    tag: "Racket Sport",
    fallbackImage: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    cleanDescription: "High-speed rallies, international open championships, and badminton tour matches.",
  },
};

const DEFAULT_META: CategoryMeta = {
  emoji: "🏆",
  tag: "Discipline",
  fallbackImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  cleanDescription: "Discover official athletic competitions, tournament brackets, and athlete updates.",
};

export function getCategoryMeta(name: string): CategoryMeta {
  if (!name) return DEFAULT_META;
  const key = name.toLowerCase().trim();
  return CATEGORY_MAP[key] || DEFAULT_META;
}

/**
 * Returns the best image for a category:
 * Uses the image of the first child sport with an image; falls back to curated sport Unsplash photo.
 */
export function getCategoryCoverImage(category: SportCategory): string {
  const sportsList = Array.isArray(category.sports) ? category.sports : [];
  const firstWithImage = sportsList.find((s) => s.imageUrls && s.imageUrls.length > 0 && s.imageUrls[0]);
  if (firstWithImage && firstWithImage.imageUrls[0]) {
    return firstWithImage.imageUrls[0];
  }
  return getCategoryMeta(category.name).fallbackImage;
}

/**
 * Sanitizes category descriptions from the backend API.
 * The backend database has copy-pasted "A standard-size football..." for non-football categories (like Swimming, Racing).
 * This function preserves authentic descriptions while replacing copy-pasted or placeholder text.
 */
export function getCategoryCleanDescription(category: SportCategory): string {
  const meta = getCategoryMeta(category.name);
  const raw = category.description?.trim();

  if (!raw) return meta.cleanDescription;

  const isFootball = /football|soccer/i.test(category.name);
  // Detect copy-pasted football text in non-football categories
  if (!isFootball && /football/i.test(raw)) {
    return meta.cleanDescription;
  }

  // Detect generic "A standard-size..." placeholder text
  if (/^A standard-size/i.test(raw)) {
    return meta.cleanDescription;
  }

  return raw;
}
