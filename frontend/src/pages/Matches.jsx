import { useEffect } from "react";
import { useState } from "react";
import api from "../api/axios";
import MatchCard from "../components/MatchCard";

export default function Matches() {

  const [matches, setMatches] =
    useState([]);

  const fetchMatches =
    async () => {
      try {

        const res =
          await api.get(
            "/matches"
          );

        setMatches(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Possible Matches
      </h1>

      <div className="space-y-6">

        {matches.length === 0 && (
          <div>
            No Matches Found
          </div>
        )}

        {matches.map(
          (match) => (
            <MatchCard
              key={match._id}
              match={match}
              onRefresh={
                fetchMatches
              }
            />
          )
        )}

      </div>

    </div>
  );
}