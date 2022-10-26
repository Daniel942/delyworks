import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

const Edit = () => {
  const [form, setForm] = useState({
    id: 0,
    name: '',
    displayName: '',
    quality: '',
    type: '',
    expansion: '',
    sellPriceCopper: 0,
    sellPriceSilver: 0,
    sellPriceGold: 0,
    wowheadIcon: '',
  })

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const id = params.id.toString()
      const response = await fetch(`http://localhost:5000/getItem/${params.id.toString()}`)

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const item = await response.json()
      if (!item) {
        window.alert(`Item with id ${id} not found`)
        navigate('/')
        return
      }

      setForm(item)
    }

    fetchData()

    return
  }, [params.id, navigate])

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const editedItem = {
      name: form.name,
      displayName: form.displayName,
      quality: form.quality,
      type: form.type,
      expansion: form.expansion,
      sellPriceCopper: form.sellPriceCopper,
      sellPriceSilver: form.sellPriceSilver,
      sellPriceGold: form.sellPriceGold,
      wowheadIcon: form.wowheadIcon,
    }

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/updateItem/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(editedItem),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    navigate('/')
  }

  return (
    <div>
      <h3>Update Item</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">ID: </label>
          <input type="number" className="form-control" id="id" value={form.id} />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Display Name: </label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            value={form.displayName}
            onChange={(e) => updateForm({ displayName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Quality: </label>
          <input
            type="text"
            className="form-control"
            id="quality"
            value={form.quality}
            onChange={(e) => updateForm({ quality: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Type: </label>
          <input
            type="text"
            className="form-control"
            id="type"
            value={form.type}
            onChange={(e) => updateForm({ type: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expansion">Expansion: </label>
          <input
            type="text"
            className="form-control"
            id="expansion"
            value={form.expansion}
            onChange={(e) => updateForm({ expansion: e.target.value })}
          />
        </div>

        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expansionOptions"
              id="expansionClassic"
              value="Classic"
              checked={form.expansion === 'Classic'}
              onChange={(e) => updateForm({ expansion: e.target.value })}
            />
            <label htmlFor="expansionClassic" className="form-check-label">
              Classic
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expansionOptions"
              id="expansionTBC"
              value="TBC"
              checked={form.expansion === 'TBC'}
              onChange={(e) => updateForm({ expansion: e.target.value })}
            />
            <label htmlFor="expansionTBC" className="form-check-label">
              TBC
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expansionOptions"
              id="expansionWotLK"
              value="WotLK"
              checked={form.expansion === 'WotLK'}
              onChange={(e) => updateForm({ expansion: e.target.value })}
            />
            <label htmlFor="expansionWotLK" className="form-check-label">
              WotLK
            </label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input type="submit" value="Update Item" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default Edit
