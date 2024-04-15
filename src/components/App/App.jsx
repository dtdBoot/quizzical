import { useState, useEffect } from 'react'
import './App.css'
import Start from '../Start/Start'
import Quiz from '../Quiz/Quiz'

function App() {

  const [screenNav, setScreenNav] = useState(false)
  
  return (
    <>
        {screenNav ? <Quiz /> : <Start />}
    </>
  )
}

export default App
