import { ToyPreview } from './ToyPreview.jsx'
import { Link } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy }) {
  return (
    <ul className="toy-list">
      {toys.map(toy => (
        <li className="toy-item" key={toy._id}>
          <ToyPreview toy={toy} />
          <section className="toy-actions">
            <button onClick={() => {onRemoveToy(toy._id)}}>Remove</button>
            <button>
              <Link to={`/toy/${toy._id}`}>Details</Link>
            </button>
            <button>
              <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            </button>
          </section>
        </li>
      ))}
    </ul>
  )
}
