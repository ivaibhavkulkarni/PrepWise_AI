import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center mb-16 backdrop-blur-sm bg-white/20 rounded-2xl p-4 border border-white/30 shadow-lg'>
      <Link to="/dashboard">
        <h2 className='text-xl text-black font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          PrepWise AI
        </h2>
      </Link>

      <ProfileInfoCard />
    </div>
  )
}

export default Navbar
