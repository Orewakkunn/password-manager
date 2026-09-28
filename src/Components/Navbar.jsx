import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 '> 

      <div className="container mx-auto flex flex-wrap items-center justify-between gap-y-3 px-4 py-4 text-white sm:py-5">
        <div className="logo font-bold  text-2xl "> 
          <span className='text-green-600'>&lt;</span>
          PManger  
          <span className='text-green-600'>/&gt;</span>
        </div>
        
        <ul className="order-3 w-full sm:order-none sm:w-auto">
          <li className='flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:text-base'>
            <a  className='hover:font-bold hover:cursor' href="/">Home</a>
            <a  className='hover:font-bold hover:cursor'  href="#">About</a>
            <a  className='hover:font-bold hover:cursor' href="#contact">Contact</a>
            <a> </a>
          </li>
        </ul>
        <button className='order-2 sm:order-none'>
          <a href="https://github.com" target='blank'><img className="w-10 h-10" src="/github.svg" alt="github-logo" /></a>
        </button>

      </div>
      
    </nav>
  )
}

export default Navbar