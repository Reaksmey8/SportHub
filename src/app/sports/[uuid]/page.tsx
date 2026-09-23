import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/ui/DetailPage";
import { ErrorState } from "@/components/ui/ErrorState";
import { ApiError } from "@/services/api/client";
import { sportsApi } from "@/services/api/sports";

interface SportDetailsPageProps {
  params: Promise<{ uuid: string }>;
}

export async function generateMetadata({ params }: SportDetailsPageProps): Promise<Metadata> {
  const { uuid } = await params;
  try {
    const sport = await sportsApi.getSportByUuid(uuid);
    return { title: `${sport.name} — SportsHub`, description: sport.description };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return { title: "Sport Details — SportsHub" };
  }
}

export default async function SportDetailsPage({ params }: SportDetailsPageProps) {
  const { uuid } = await params;
  let sport;

  try {
    sport = await sportsApi.getSportByUuid(uuid);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20 dark:bg-[#090d16]">
        <ErrorState title="Failed to load sport" message="We could not load this sport. Please try again later." />
      </div>
    );
  }

  return (
    <DetailPage
      title={sport.name}
      description={sport.description}
      imageUrl={sport.imageUrls?.[0]}
      badge={sport.category?.name || "Sport"}
      backHref="/sports"
      backLabel="Back to sports"
      favoriteType="sport"
      favoriteUuid={sport.uuid}
      metadata={[{ label: "Category", value: sport.category?.name || "General" }]}
    />
  );
}
