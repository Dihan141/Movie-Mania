import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import './App.css'
import Search from './componenets/Search'
import Spinner from './componenets/Spinner'
import MovieCard from './componenets/MovieCard'
import { updateSearchCount, getTrendingMovies } from './appwrite'
import { use } from 'react'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setLoading(true)
    setErrorMsg('')
    try {
        const endPoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                              :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

        const response = await fetch(endPoint, API_OPTTIONS)
        console.log('Response:', response)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Data:', data)

        if(data.Response === 'False') {
          setErrorMsg(data.Error || 'Failed to fetch movies.')
          setMovies([])
          return
        }

        setMovies(data.results || [])

        if(query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }

    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMsg('Failed to fetch movies. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }

  useEffect(() => {
    loadTrendingMovies();
  }
  , [])

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {
            loading ? (
              <Spinner />
            ) : errorMsg ? (
              <p className='text-red-500'>{errorMsg}</p>
            ) : (
              <ul>
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
              </ul>
            )
          }
        </section>
      </div>
    </main>
  )
}

export default App
