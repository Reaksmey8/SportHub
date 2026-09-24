import { sportsApi } from "@/services/api/sports";
import { SportCard } from "@/components/cards/SportCard";

export default async function SportPage() {
  try {
    const sports = await sportsApi.getSports();
    return (
      <div className="mx-auto max-w-7xl px-6 py-14">
        <main>
          {/* <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 py-4">Sports</h1> */}
          {/* <p className="text-xl text-slate-900 py-2 text-bold  ">Total sports: {sports.length}</p> */}

          {/* {sports.map((sports) => (
            <div key={sports.uuid} >
                {sports.name}
            </div>
        ))} */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sports.map((sports) => (
              <SportCard key={sports.uuid} sport={sports} />
            ))}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    return <p>failed ot load page. Please try again </p>;
  }
}
