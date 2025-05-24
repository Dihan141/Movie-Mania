import { useEffect, useState } from 'react'
import './App.css'
import Search from './componenets/Search'
import Spinner from './componenets/Spinner'
import MovieCard from './componenets/MovieCard'

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
  const [errorMsg, setErrorMsg] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMovies = async () => {
    setLoading(true)
    setErrorMsg('')
    try {
        const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

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

    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMsg('Failed to fetch movies. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

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
