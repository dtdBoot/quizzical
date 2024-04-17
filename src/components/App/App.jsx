import { useState, useEffect } from 'react'
import './App.css'
import Start from '../Start/Start'
import Quiz from '../Quiz/Quiz'

function App() {

  const [screenNav, setScreenNav] = useState(false)

  function startSelected() {
    setScreenNav(true)
  }
  
  return (
    <>
        {screenNav ? <Quiz /> : <Start buttonSelect={startSelected} />}
    </>
  )
}

export default App
