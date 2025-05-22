import { useState } from 'react'
import './App.css'
import Search from './componenets/Search'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
      </div>
    </main>
  )
}

export default App
