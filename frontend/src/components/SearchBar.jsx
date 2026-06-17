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
        className="flex-1 border p-3 rounded"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 rounded"
      >
        Search
      </button>

    </div>
  );
}