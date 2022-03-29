import './App.css'
import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { Character } from './pages/Character'
import { Comics } from './pages/Comics'
import { Comic } from './pages/Comic'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

const App = () => {
  return (
    <>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/comics" element={<Comics />}/>
          <Route path="/comics/:id" element={<Comic />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Menu />
    </>
  )
}

export default App
