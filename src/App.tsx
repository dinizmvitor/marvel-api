import './App.css'
import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { Character } from './pages/Character'
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Menu />
    </>
  )
}

export default App
