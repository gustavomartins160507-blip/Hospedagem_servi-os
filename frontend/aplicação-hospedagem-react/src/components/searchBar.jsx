import { useState, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';


const SearchBar = () =>{
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleSearch = () =>{
        if(search.trim()){
            navigate(`/produtos?filter=${encodeURIComponent(search.trim())}`)
        }
    }

    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            handleSearch()
        }
    }

    return(
        <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-600 transition"
        aria-label="Buscar"
      >
        <FiSearch className="text-lg" />
      </button>
    </div>

    )
}
export default SearchBar