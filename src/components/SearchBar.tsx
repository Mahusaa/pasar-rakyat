import React from "react";
import SearchIcon from "./icons/SearchIcon";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
      <SearchIcon className="w-6 h-6 mr-2 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 focus:outline-none focus:border-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
