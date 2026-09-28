import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'

function App() {

  return (
    
    <div className="flex min-h-screen flex-col bg-gray-800">
     <Navbar/>

    <main className="flex-1">
      <Manager/>
    </main>
<<<<<<< HEAD
  
=======
>>>>>>> ef560046708c8aa6d5819f42ff8f96dcd9827c71
     
     <Footer/>

    </div>
  )
}

export default App
