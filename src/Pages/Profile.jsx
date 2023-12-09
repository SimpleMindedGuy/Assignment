import React from 'react'
import { useSelector } from 'react-redux';

function Profile() {

    const language = useSelector((state)=> {
        console.log(state); 
        return state.global.language;
      })
  return (
    <div>
      
    </div>
  )
}

export default Profile
