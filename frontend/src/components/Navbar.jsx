import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#F6F0D7]'>
        <header className="border-b border-slate-800  backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">Job Hunt</h1>
          <span className="text-xs">Dashboard</span>
        </div>
      </header>
    </div>
  )
}

export default Navbar