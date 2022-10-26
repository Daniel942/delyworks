import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Create = () => {
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

  const navigate = useNavigate()

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const newItem = { ...form }

    await fetch('http://localhost:5000/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    }).catch((error) => {
      window.alert(error)
      return
    })

    setForm({
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

    navigate('/')
  }

  return (
    <div>
      <h3>Create New Item</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="number"
            className="form-control"
            id="id"
            value={form.id}
            onChange={(e) => updateForm({ id: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            value={form.displayName}
            onChange={(e) => updateForm({ displayName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quality">Quality</label>
          <input
            type="text"
            className="form-control"
            id="quality"
            value={form.quality}
            onChange={(e) => updateForm({ quality: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            value={form.type}
            onChange={(e) => updateForm({ type: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expansion">Expansion</label>
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

        <div className="form-group">
          <label htmlFor="sellPriceCopper">Sell Price Copper</label>
          <input
            type="number"
            className="form-control"
            id="sellPriceCopper"
            value={form.sellPriceCopper}
            onChange={(e) => updateForm({ sellPriceCopper: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sellPriceSilver">Sell Price Silver</label>
          <input
            type="number"
            className="form-control"
            id="sellPriceSilver"
            value={form.sellPriceSilver}
            onChange={(e) => updateForm({ sellPriceSilver: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sellPriceGold">Sell Price Gold</label>
          <input
            type="number"
            className="form-control"
            id="sellPriceGold"
            value={form.sellPriceGold}
            onChange={(e) => updateForm({ sellPriceGold: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="wowheadIcon">WoWHead Icon</label>
          <input
            type="text"
            className="form-control"
            id="wowheadIcon"
            value={form.wowheadIcon}
            onChange={(e) => updateForm({ wowheadIcon: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Create item" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default Create
