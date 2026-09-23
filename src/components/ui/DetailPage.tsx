import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, Trophy } from "lucide-react";

interface DetailPageProps {
  title: string;
  description: string;
  imageUrl?: string;
  badge: string;
  metadata: Array<{ label: string; value: string }>;
  backHref: string;
  backLabel: string;
}

export function DetailPage({
  title,
  description,
  imageUrl,
  badge,
  metadata,
  backHref,
  backLabel,
}: DetailPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-12 dark:bg-[#090d16] sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-none">
          <div className="relative aspect-[16/7] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-500">
                <Trophy className="h-16 w-16 opacity-50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-lg bg-emerald-500/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
              {badge}
            </span>
          </div>

          <div className="p-6 sm:p-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl whitespace-pre-line text-base leading-8 text-slate-600 dark:text-zinc-300">
              {description || "More information about this item will be available soon."}
            </p>

            {metadata.length > 0 && (
              <dl className="mt-8 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
                {metadata.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    {item.label === "Location" ? (
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    ) : (
                      <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    )}
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
