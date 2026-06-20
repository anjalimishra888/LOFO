import { useState } from "react";

export default function SearchBar({ onSearch }) {

  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="flex gap-3">

      <input
        placeholder="Search items..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="flex-1 border border-slate-200 rounded-3xl px-4 py-3"
      />

      <button
        onClick={handleSearch}
        className="bg-brand text-white px-6 rounded-3xl hover:bg-brand/90"
      >
        Search
      </button>

    </div>
  );
}