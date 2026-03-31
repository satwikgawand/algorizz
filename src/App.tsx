import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Gallery from './pages/Gallery'
import Visualizer from './pages/Visualizer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Gallery />} />
          <Route path="algorithm/:id" element={<Visualizer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
