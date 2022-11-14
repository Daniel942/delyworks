import React from 'react'

// We use Route in order to define the different routes of our application
import { Route, Routes } from 'react-router-dom'

import NavigationMenu from './components/NavigationMenu'

import Items from './pages/items'
import Auctions from './pages/auctions'

import './App.css'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Roboto'],
  },
})

const pages = [
  {
    title: 'Items',
    link: '/items',
  },
  {
    title: 'Auctions',
    link: '/auctions',
  },
]

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <NavigationMenu pages={pages} />
      <Routes>
        <Route path="/items" element={<Items />} />
        <Route path="/auctions" element={<Auctions />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
