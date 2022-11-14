import React from 'react'

import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NavigationMenu = ({ pages }) => (
  <AppBar position="static">
    <Toolbar disableGutters>
      <Typography variant="h4" sx={{ mx: 2 }}>
        HOME
      </Typography>

      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        {pages.map((page, i) => (
          <Link
            key={i}
            component={RouterLink}
            to={page.link}
            sx={{
              mx: 2,
              color: 'white',
              display: 'block',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            {page.title}
          </Link>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
)

export default NavigationMenu
