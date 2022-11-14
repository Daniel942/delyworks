import React, { useEffect, useReducer, useState } from 'react'

import {
  BLIZZARD_API,
  BLIZZARD_API_AUCTIONS,
  BLIZZARD_API_AUCTION_HOUSE,
  BLIZZARD_API_REALMS,
} from '../constants'

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'

const region = 'eu'
const locale = 'en_US'
const accessTokenKey = 'ACCESS_TOKEN'

const baseURL = BLIZZARD_API.replace('{region}', region)
const realmsURL = `${baseURL}${BLIZZARD_API_REALMS}`
const auctionHouseURL = `${baseURL}${BLIZZARD_API_AUCTION_HOUSE}`
const auctionsURL = `${baseURL}${BLIZZARD_API_AUCTIONS}`

const durations = {
  SHORT: '<30m',
  MEDIUM: '30min - 2h',
  LONG: '2h - 12h',
  VERY_LONG: '12h - 48h',
}

const auctionHouseFee = 5 // 5% ... (Winning Bid - Cut + Deposit) = Winning Bid * (0.95) + Deposit

const deposits = {
  //
  12: 15, // 15%
  24: 30, // 30%
  48: 60, // 60%
}

// Helpers
const storeAccessToken = ({ accessToken, expiresIn }) => {
  const date = new Date()
  date.setSeconds(date.getSeconds() + expiresIn)
  localStorage.setItem(
    accessTokenKey,
    JSON.stringify({ accessToken: accessToken, expiresOnTimestamp: date.getTime() })
  )
}

const getAccessToken = () => {
  const accessTokenObject = localStorage.getItem(accessTokenKey)
  if (!accessTokenObject) {
    return null
  }

  const accessTokenParsed = JSON.parse(accessTokenObject)
  const currentDateTimestamp = new Date().getTime()
  if (currentDateTimestamp < accessTokenParsed.expiresOnTimestamp) {
    return accessTokenParsed.accessToken
  }

  localStorage.removeItem(accessTokenKey)
  return null
}

// Main component
const Auctions = () => {
  const [accessToken, setAccessToken] = useState(() => getAccessToken())
  const [realms, setRealms] = useState([])
  const [auctionHouses, setAuctionHouses] = useState([])

  const [realm, setRealm] = useState('')
  const [auctionHouse, setAuctionHouse] = useState('')

  const [auctions, setAuctions] = useState([])

  const [formData, setFormData] = useReducer((state, newState) => ({ ...state, ...newState }), {
    clientID: '',
    clientSecret: '',
  })

  const handleInput = (e) => {
    const name = e.target.name
    const newValue = e.target.value
    setFormData({ [name]: newValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`https://${region}.battle.net/oauth/token`, {
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${formData.clientID}:${formData.clientSecret}`)}`,
      },
    })
      .then((response) => response.json())
      .then((response) =>
        handleAccessToken({ accessToken: response.access_token, expiresIn: response.expires_in })
      )
      .catch((error) => console.error('Error: ', error))
  }

  const handleAccessToken = ({ accessToken, expiresIn }) => {
    storeAccessToken({ accessToken, expiresIn })
    setAccessToken(accessToken)
  }

  const setUpRealms = (results) => {
    const realms = results.reduce((realms, result) => {
      const connectedRealms = result.data.realms
      realms.push(
        ...connectedRealms.map((connectedRealm) => ({
          id: connectedRealm.id,
          name: connectedRealm.name[locale],
          slug: connectedRealm.slug,
          connectedRealmID: result.data.id,
        }))
      )
      return realms
    }, [])

    setRealms(realms)
  }

  const fetchRealms = () => {
    const realmsData = {
      namespace: `dynamic-classic-${region}`,
      'status.type': 'UP',
      'realms.timezone': 'Europe/Paris',
      orderby: 'id',
      _page: 1,
      access_token: accessToken,
    }

    fetch(realmsURL + '?' + new URLSearchParams(realmsData), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setUpRealms(response.results))
      .catch((error) => console.error('Error: ', error))
  }

  useEffect(() => {
    if (!accessToken) return

    fetchRealms()
  }, [accessToken])

  const handleRealmSelect = (e) => {
    setRealm(e.target.value)
  }

  const setUpAuctionHouses = (auctionHouses) => {
    setAuctionHouses(
      auctionHouses.map((auctionHouse) => ({ id: auctionHouse.id, name: auctionHouse.name }))
    )
  }

  const fetchAuctionHouseOptions = () => {
    const auctionHouseData = {
      namespace: `dynamic-classic-${region}`,
      locale: locale,
      access_token: accessToken,
    }

    const url = auctionHouseURL.replace('{connectedRealmId}', realm)

    fetch(url + '?' + new URLSearchParams(auctionHouseData), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setUpAuctionHouses(response.auctions))
      .catch((error) => console.error('Error: ', error))
  }

  useEffect(() => {
    if (!realm) return

    setAuctionHouses([])
    setAuctionHouse('')
    fetchAuctionHouseOptions()
  }, [realm])

  const handleAuctionHouseSelect = (e) => {
    setAuctionHouse(e.target.value)
  }

  const handleFetchAuctions = () => {
    const auctionsData = {
      namespace: `dynamic-classic-${region}`,
      locale: locale,
      access_token: accessToken,
    }

    const url = auctionsURL
      .replace('{connectedRealmId}', realm)
      .replace('{auctionHouseId}', auctionHouse)

    fetch(url + '?' + new URLSearchParams(auctionsData), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => setAuctions(response.auctions))
      .catch((error) => console.error('Error: ', error))
  }

  useEffect(() => {
    if (!auctions.length) return

    console.log('Auctions:', auctions)
  }, [auctions])

  return (
    <Container maxWidth="xl">
      <Box sx={{ mx: 'auto', width: 1000 }}>
        {!accessToken && (
          <Paper>
            <form onSubmit={handleSubmit}>
              <TextField id="clientID" label="Client ID" name="clientID" onChange={handleInput} />
              <TextField
                id="clientSecret"
                label="Client Secret"
                name="clientSecret"
                onChange={handleInput}
              />

              <Button variant="contained" type="submit" color="primary">
                Connect
              </Button>
            </form>
          </Paper>
        )}

        {accessToken && (
          <Typography variant="body1">Access token accepted! {accessToken}</Typography>
        )}

        {!!realms.length && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="realm-label">Realm</InputLabel>
            <Select
              labelId="realm-label"
              id="realm-select"
              value={realm}
              label="Realm"
              onChange={handleRealmSelect}
            >
              {realms.map((realm, i) => (
                <MenuItem key={i} value={realm.connectedRealmID}>
                  {realm.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {!!auctionHouses.length && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="auction-house-label">Auction House</InputLabel>
            <Select
              labelId="auction-house-label"
              id="auction-house-select"
              value={auctionHouse}
              label="Auction House"
              onChange={handleAuctionHouseSelect}
            >
              {auctionHouses.map((auctionHouse, i) => (
                <MenuItem key={i} value={auctionHouse.id}>
                  {auctionHouse.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {auctionHouse && (
          <Button variant="contained" color="primary" onClick={handleFetchAuctions} sx={{ mt: 2 }}>
            Fetch auctions
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default Auctions
