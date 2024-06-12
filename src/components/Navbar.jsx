import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-900 brightness-90 text-white py-2 rounded-xl'>
        <div className="logo cursor-pointer">
            <span className='font-semibold text-2xl mx-10'>iTasks</span>
        </div>
      <ul className="flex gap-9 mx-10">
        <li className='cursor-pointer font-light hover:font-bold hover:underline transition-all hover:duration-50 ease-in'>Home</li>
        <li className='cursor-pointer font-light hover:font-bold hover:underline transition-all hover:duration-50 ease-in'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
