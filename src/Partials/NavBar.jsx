import React from 'react'
import { Link } from 'react-router-dom'
export default function NavBar() {
  return (
    <nav>
        <div>
            <Link to={'/profile'}>profile</Link>
        </div>
        <div>
            <Link to={'/home'}>Home</Link>
        </div>
        <div>
            <Link to={'/settings'}>Settings</Link>
        </div>
    </nav>
  )
}
