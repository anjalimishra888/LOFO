import { useEffect } from "react";
import { useState } from "react";
import api from "../api/axios";
import MatchCard from "../components/MatchCard";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const res = await api.get("/matches");
      setMatches(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 overflow-x-hidden px-4 pb-28 pt-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Matches</p>
              <h1 className="mt-3 text-4xl font-bold text-white">Possible Matches</h1>
            </div>
            <div className="rounded-3xl bg-slate-900/80 px-5 py-3 text-slate-300 shadow-lg shadow-slate-950/20">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Results</p>
              <p className="mt-1 text-lg font-semibold text-white">{matches.length}</p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-[28px] border border-dashed border-slate-700/60 bg-slate-900/80 p-12 text-center text-slate-400">
              Loading matches...
            </div>
          ) : matches.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-slate-700/60 bg-slate-900/80 p-12 text-center text-slate-400">
              No Matches Found
            </div>
          ) : (
            <div className="grid gap-5">
              {matches.map((match) => (
                <MatchCard key={match._id} match={match} onRefresh={fetchMatches} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}