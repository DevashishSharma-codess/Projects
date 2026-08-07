import React from 'react'
import Landing from './components/Landing'
import { JournalProvider } from './context/JournalContext'

const App = () => {
  return (
    <JournalProvider>
      <Landing />
    </JournalProvider>
  )
}

export default App