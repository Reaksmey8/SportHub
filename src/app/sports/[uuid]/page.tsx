import { sportsApi } from "@/services/api/sports";
import Image from "next/image";

interface SportDetailPageProps{
   params: Promise<{
    uuid: string
   }>;
}

export default async function SportDetailPage({
    params,
}:SportDetailPageProps ){
    const {uuid} = await params;
    const sport = await sportsApi.getSportByUuid(uuid);

    return(
        <div  className="grid md:grid-cols-2 gap-8 items-center py-8 px-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{sport.name}</h1>
                <p className="text-slate-700 dark:text-zinc-300">{sport.description}</p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-zinc-300 leading-relaxed">{sport.category?.name || "General"}</p>
            </div>


            {sport.imageUrls?.[0] && (
                <Image src={sport.imageUrls[0]} alt={sport.name} width={600} height={400} className="rounded-2xl shadow-xl
                "/>
            )}
        </div>
    )
}
