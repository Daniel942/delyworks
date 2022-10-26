import React from 'react'

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom'

// We import all the components we need in our app
import Navbar from './components/navbar'
import ItemList from './components/itemList'
import Edit from './components/edit'
import Create from './components/create'

import logo from './logo.svg'
import './App.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/items" element={<ItemList />} />
        <Route path="/updateItem/:id" element={<Edit />} />
        <Route path="/addItem" element={<Create />} />
      </Routes>
    </div>
  )
}

export default App
