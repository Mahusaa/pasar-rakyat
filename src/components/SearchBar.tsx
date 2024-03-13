import React from "react"

interface SearchBarProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div >
            <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 border rounded-md w-full"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchBar;