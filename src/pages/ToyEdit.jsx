import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { saveToy } from '../store/actions/toy.actions'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const [labels, setLabels] = useState([])
  const navigate = useNavigate()

  const { toyId } = useParams()

  useEffect(() => {
    loadToyLabels()
    loadToy()
  }, [toyId])

  async function loadToy() {
    if (!toyId) return

    try {
      const toy = await toyService.get(toyId)
      setToyToEdit(toy)
    } catch (error) {
      console.log('Had issues in toy edit:', error)
      navigate('/toy')
      showErrorMsg('Toy not found!')
    }
  }

  async function loadToyLabels() {
    try {
      const labels = await toyService.getToyLabels()
      setLabels(labels)
    } catch (error) {
      console.log('Had issues in toy edit:', error)
      navigate('/toy')
      showErrorMsg('Toy not found!')
    }
  }

  function handleChange({ target }) {
    const { name, value, type, checked } = target
    let fieldValue = value
    if (type === 'checkbox') {
      fieldValue = checked
    } else if (type === 'number') {
      fieldValue = +value
    } else if (type === 'select-multiple') {
      fieldValue = [...target.selectedOptions].map(option => option.value)
    }

    setToyToEdit(prevToy => ({
      ...prevToy,
      [name]: fieldValue,
    }))
  }

  async function onSaveToy(ev) {
    ev.preventDefault()

    try {
      const savedToy = await saveToy(toyToEdit)
      showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
      navigate('/toy')
    } catch (error) {
      showErrorMsg('Cannot save toy')
    }
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={toyToEdit.name} onChange={handleChange} required />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={toyToEdit.price || ''}
          onChange={handleChange}
          required
          min="1"
        />

        {toyToEdit._id && (
          <label>
            <input type="checkbox" name="inStock" checked={toyToEdit.inStock} onChange={handleChange} />
            In Stock
          </label>
        )}

        <label htmlFor="labels">Labels:</label>
        <select name="labels" id="labels" multiple value={toyToEdit.labels} onChange={handleChange}>
          {labels.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        <button type="submit">{toyToEdit._id ? 'Update Toy' : 'Add'}</button>
      </form>
    </section>
  )
}
