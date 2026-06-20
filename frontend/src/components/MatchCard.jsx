import api from "../api/axios";

export default function MatchCard({
  match,
  onRefresh
}) {
  const lost =
    match.lostItemId;

  const found =
    match.foundItemId;

  const recoverItem =
    async () => {
      try {
        await api.put(
          `/matches/recover/${match._id}`
        );

        onRefresh();
      } catch (error) {
        console.log(error);
      }
    };

  const deleteMatch =
    async () => {
      try {
        await api.delete(
          `/matches/${match._id}`
        );

        onRefresh();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">Match Found</h2>
          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
            {match.score}%
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-slate-700">Lost Item</h3>
            <img
              src={`http://localhost:5000/uploads/${lost?.image}`}
              alt=""
              className="h-52 w-full object-cover rounded-2xl"
            />
            <p className="font-semibold mt-3 text-slate-900">{lost?.title}</p>
            <p className="text-sm text-slate-500">{lost?.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-slate-700">Found Item</h3>
            <img
              src={`http://localhost:5000/uploads/${found?.image}`}
              alt=""
              className="h-52 w-full object-cover rounded-2xl"
            />
            <p className="font-semibold mt-3 text-slate-900">{found?.title}</p>
            <p className="text-sm text-slate-500">{found?.description}</p>
          </div>
        </div>

        <div className="grid gap-3">
          <button
            onClick={recoverItem}
            className="rounded-3xl px-4 py-3 min-h-[48px] bg-brand text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            Mark Recovered
          </button>
          <button
            onClick={deleteMatch}
            className="rounded-3xl px-4 py-3 min-h-[48px] bg-slate-900 text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-900/30"
          >
            Delete Match
          </button>
        </div>
      </div>
    </div>
  );
}