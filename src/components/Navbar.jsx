import React from 'react'

const navbar = () => {
  return (
    <div>
      <nav>
        <div className = "bg-violet-400 min-h-10 flex items-center justify-between">
          <div className="logo font-bold mx-10 cursor-pointer text-xl">iTask</div>
          <ul className = "flex gap-8 mx-8">
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>About us</li>
            <li className='cursor-pointer'>Contact us</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default navbar
