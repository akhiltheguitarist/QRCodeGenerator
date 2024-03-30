import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QRForm from './component/QRForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <QRForm />
    </>
  )
}

export default App
