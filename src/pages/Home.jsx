import { useState } from 'react'

export function Home() {
  const [isOn, setIsOn] = useState(false)

  return (
    <section className="home">
      <h1>Todo's R Us!</h1>

      {isOn && <img src="../assets/img/todo.png" alt="" />}
    </section>
  )
}
