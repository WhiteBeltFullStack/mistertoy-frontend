import { useState, useEffect } from 'react'
import { eventBusService } from '../services/event-bus.service.js'

export function UserMsg() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
      const unsubscribe = eventBusService.on('show-user-msg', msg => {
          setMsg(msg)
          setTimeout(onCloseMsg, 1500)
      })

      return () => {
          unsubscribe()
      }
  }, [])

  function onCloseMsg() {
      setMsg(null)
  }

  if (!msg) return null

  return (
    <section className={"user-msg " + msg.type}>
        <p>{msg.txt}</p>
    <h1>Hey</h1>
    </section>
  )
}
