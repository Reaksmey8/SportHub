import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "@/components/ui/DetailPage";
import { ErrorState } from "@/components/ui/ErrorState";
import { ApiError } from "@/services/api/client";
import { categoriesApi } from "@/services/api/categories";
import {
  getCategoryCoverImage,
  getCategoryCleanDescription,
} from "@/lib/categoryMeta";

interface CategoryDetailsPageProps {
  params: Promise<{ uuid: string }>;
}

export async function generateMetadata({ params }: CategoryDetailsPageProps): Promise<Metadata> {
  const { uuid } = await params;
  try {
    const category = await categoriesApi.getCategoryByUuid(uuid);
    const description = getCategoryCleanDescription(category);
    return { title: `${category.name} — SportsHub`, description };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return { title: "Category Details — SportsHub" };
  }
}

export default async function CategoryDetailsPage({ params }: CategoryDetailsPageProps) {
  const { uuid } = await params;
  let category;

  try {
    category = await categoriesApi.getCategoryByUuid(uuid);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20 dark:bg-[#090d16]">
        <ErrorState title="Failed to load category" message="We could not load this category. Please try again later." />
      </div>
    );
  }

  const sportsCount = Array.isArray(category.sports)
    ? category.sports.length
    : category.sports ?? 0;

  const coverImage = getCategoryCoverImage(category);
  const cleanDescription = getCategoryCleanDescription(category);

  return (
    <DetailPage
      title={category.name}
      description={cleanDescription}
      imageUrl={coverImage}
      badge="Category"
      backHref="/categories"
      backLabel="Back to categories"
      commentEntityType="category"
      commentEntityUuid={category.uuid}
      metadata={[{ label: "Sports", value: `${sportsCount} ${sportsCount === 1 ? "sport" : "sports"}` }]}
    />
  );
}
