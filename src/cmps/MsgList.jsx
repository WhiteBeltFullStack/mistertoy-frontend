import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import { PagingButtons } from './PagingButtons'

export function MsgList({ msgs, user, onSaveMsg }) {
  const [input, setInput] = useState({ txt: '' })

  const [pageIdx, setPageIdx] = useState(0)
  const [totalCount, setTotalCount] = useState(Array.isArray(msgs) ? msgs.length : 0)
  //   const [pageSize, setPageSize] = useState(5)
  const pageSize = 5

  function onSubmitMsg(ev) {
    ev.preventDefault()
    onSaveMsg(input)
    setInput({ txt: '' })
  }

  function handleMsgChange(ev) {
    const { name: field, value } = ev.target
    setInput(msg => ({ ...msg, [field]: value }))
  }

  return (
    <section className="reviews-container">
      <section className="reviews-section">
        {!Array.isArray(msgs) || msgs.length === 0 ? (
          <p>No comments</p>
        ) : (
          <ul>
            {msgs.slice(pageIdx * pageSize, (pageIdx + 1) * pageSize).map(msg => (
              <li key={msg.id}>
                <h3>{msg.by.fullname} :</h3>
                <p>{msg.txt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      {user && (
        <form action="" className="comment" onSubmit={onSubmitMsg}>
          <label htmlFor="txt"></label>
          <input
            id="txt"
            type="text"
            value={input.txt}
            name="txt"
            onChange={handleMsgChange}
            placeholder="Comment..."
          />
          <button type="submit">Send</button>
        </form>
      )}
      <PagingButtons
        pageIdx={pageIdx}
        setPageIdx={setPageIdx}
        totalCount={Array.isArray(msgs) ? msgs.length : 0}
        pageSize={pageSize}
      />
    </section>
  )
}
