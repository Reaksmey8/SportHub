import React from "react";
import { categoriesApi } from "@/services/api/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { SportCategory } from "@/types/category";

export default async function CategoriesPage() {
  let categories: SportCategory[] = [];
  let error: string | null = null;

  try {
    const data = await categoriesApi.getCategories();
    categories = Array.isArray(data) ? data : [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load sport categories from API.";
  }

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="ALL DISCIPLINES"
        title="Sport Categories"
        subtitle="Browse all official sports categories recognized by the sports platform."
      />

      {error ? (
        <ErrorState
          title="Error Loading Categories"
          message={error}
        />
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.uuid || category.id} category={category} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Categories Found"
          message="There are currently no sport categories available from the backend API."
        />
      )}
    </div>
  );
}

