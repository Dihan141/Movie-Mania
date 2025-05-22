function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search">
        <div>
            <img src="./search.svg" alt="Search Icon" />
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search through 1,000+ movies and TV shows"
            />
        </div>
    </div>
  )
}

export default Search