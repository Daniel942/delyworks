import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => (
  <tr>
    <td>{props.item.displayName}</td>
    <td>{props.item.quality}</td>
    <td>{props.item.type}</td>
    <td>{props.item.expansion}</td>
    <td>
      {props.item.sellPrice.gold}g {props.item.sellPrice.silver}s {props.item.sellPrice.copper}c
    </td>
    <td>{props.item.wowheadIcon}</td>
    <td>
      <Link className="btn btn-link" to={`/updateItem/${props.item._id}`}>
        Edit
      </Link>{' '}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteItem(props.item._id)
        }}
      >
        Delete
      </button>
    </td>
  </tr>
)

const ItemList = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch('http://localhost:5000/getItems/')

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const newItems = await response.json()
      setItems(newItems)
    }

    getItems()

    return
  }, [items.length])

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/deleteItem/${id}`, {
      method: 'DELETE',
    })

    const newItems = items.filter((el) => el._id !== id)
    setItems(newItems)
  }

  const itemList = () => {
    return items.map((item) => {
      return <Item item={item} deleteItem={() => deleteItem(item._id)} key={item._id} />
    })
  }

  return (
    <div>
      <h3>Item List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quality</th>
            <th>Type</th>
            <th>Expansion</th>
            <th>Sell Price</th>
            <th>Icon</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{itemList()}</tbody>
      </table>
    </div>
  )
}

export default ItemList
