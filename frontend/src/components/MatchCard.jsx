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
    <div className="bg-white shadow rounded-xl p-6 border">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Match Found
        </h2>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
          {match.score}% Match
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <h3 className="font-semibold mb-3 text-red-600">
            Lost Item
          </h3>

          <img
            src={`http://localhost:5000/uploads/${lost?.image}`}
            alt=""
            className="h-52 w-full object-cover rounded"
          />

          <p className="font-bold mt-3">
            {lost?.title}
          </p>

          <p>
            {lost?.description}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-green-600">
            Found Item
          </h3>

          <img
            src={`http://localhost:5000/uploads/${found?.image}`}
            alt=""
            className="h-52 w-full object-cover rounded"
          />

          <p className="font-bold mt-3">
            {found?.title}
          </p>

          <p>
            {found?.description}
          </p>
        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={recoverItem}
          className="
          bg-green-600
          text-white
          px-4
          py-2
          rounded"
        >
          Mark Recovered
        </button>

        <button
          onClick={deleteMatch}
          className="
          bg-red-600
          text-white
          px-4
          py-2
          rounded"
        >
          Delete Match
        </button>

      </div>

    </div>
  );
}