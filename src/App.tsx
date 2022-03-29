import './styles/app.scss'
import { Header } from './components/Header'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Character } from './pages/Character'
import { NotFound } from './pages/NotFound'

const App = () => {
  return (
    <>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Character />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
