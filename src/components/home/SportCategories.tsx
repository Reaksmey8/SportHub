import React from "react";
import { categoriesApi } from "@/services/api/categories";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { SportCategory } from "@/types/category";

export const SportCategories: React.FC = async () => {
  let categories: SportCategory[] = [];
  let error: string | null = null;

  try {
    const data = await categoriesApi.getCategories();
    categories = Array.isArray(data) ? data.slice(0, 6) : [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Unable to load sport categories.";
  }

  return (
    <section id="categories" className="py-16 sm:py-24 bg-slate-100/50 dark:bg-zinc-950/50 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="ORGANIZED DISCIPLINES"
          title="Sport Categories"
          subtitle="Discover sports categorized by discipline, from football and cycling to swimming and combat arts."
        />

        {error ? (
          <ErrorState
            title="Failed to load categories"
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
            title="No categories found"
            message="There are currently no sport categories available from the backend API."
            actionLabel="Refresh"
            actionHref="#categories"
          />
        )}
      </div>
    </section>
  );
};

