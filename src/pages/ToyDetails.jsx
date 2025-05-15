import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PopUp } from '../cmps/PopUp.jsx'
import { Chat } from '../cmps/Chat.jsx'
import { MsgList } from '../cmps/MsgList.jsx'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)



  const navigate = useNavigate()
  const toyId = useParams().toyId
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  useEffect(() => {
    loadToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.get(toyId)
      setToy(toy)
    } catch (error) {
      console.log('err:', error)
      showErrorMsg('couldnt load toy')
      navigate('/toy')
    }
    // toyService
    //   .get(toyId)
    //   .then(setToy)
    //   .catch(err => {
    //     console.log('err:', err)
    //     showErrorMsg('couldnt load toy')
    //     navigate('/toy')
    //   })
  }

  async function onSaveMsg(msg) {
    try {
      const savedMsg = await toyService.addMsg(toy._id, msg)
      setToy(prevToy => ({
        ...prevToy,
        msgs: [...(prevToy.msgs || []), savedMsg],
      }))
    } catch (error) {
      showErrorMsg('Cannot save message')
    }
  }

  return (
    <section className="toy-details">
      {isLoading || !toy ? (
        <h1>loading...</h1>
      ) : (
        <div className="toy-details-div">
          <div className="toy-details-container">
            <img className="toy-image" src={toy.imgUrl} alt="toy-image" />
            <h2 className="toy-title">{toy.name}</h2>
            <span className="toy-price">Price : {toy.price}</span>
            <span>Categories : {toy.labels.join(' ') + '.'}</span>
            <span>createdAt : {new Date(toy.createdAt).toLocaleString('he')}</span>
            <span className={toy.inStock ? `toy-available green` : `toy-available red`}>
              {toy.inStock ? 'Available' : 'Currently Unavailabe'}
            </span>
            <button className="back-btn">
              <Link to="/toy">Back</Link>
            </button>

            {!isChatOpen && (
              <button onClick={() => setIsChatOpen(true)} className="open-chat">
                Chat
              </button>
            )}
          </div>

          <MsgList msgs={toy.msgs} user={user} onSaveMsg={onSaveMsg} />
        </div>
      )}
      {isLoading || !toy ? (
        <h1>loading...</h1>
      ) : (
        <section className="pop-chat-section">
          <PopUp
            header={<h3>Chat About {toy.name}s</h3>}
            footer={<h4>&copy; 2025-9999 Toys INC.</h4>}
            onClose={() => setIsChatOpen(false)}
            isOpen={isChatOpen}
          >
            <Chat />
          </PopUp>
        </section>
      )}
    </section>
  )
}
