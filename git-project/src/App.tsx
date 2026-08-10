import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Section1/Navbar'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'
import Footer from './components/Footer'
import AllReposPage from './components/Section2/AllReposPage'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Section1 />
              <Section2 />
              <Footer />
            </>
          }
        />
        <Route path="/repos" element={<AllReposPage />} />
      </Routes>
    </div>
  )
}

export default App