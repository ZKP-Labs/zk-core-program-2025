import { BrowserRouter as Routers, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Auth } from './pages/Auth'
import './stylesheets/main.scss'
import PrivateRoute from './PrivateRoute';

function App() {
  // localStorage.clear();
  return (
    <>
      <Routers>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/auth/:type" element={<Auth />} /> {/* signin or signup */}
        </Routes>
      </Routers>
    </>
  )
}

export default App
