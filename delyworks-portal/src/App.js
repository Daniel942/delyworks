import React from 'react'

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom'

// We import all the components we need in our app
// import Navbar from './components/navbar'

import Items from './pages/items'
import Auctions from './pages/auctions'

import './App.css'

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/auctions" element={<Auctions />} />
      </Routes>
    </div>
  )
}

export default App
