import React from 'react'
import './ProfileWidget.css'

export const ProfileWidget = ({setIsAuth, user, progress}) => {

  console.log(progress);

  return (
    <div className='profile-widget-container'>
        <div className='user-progress'>
            <p>Progress : {progress.percentage}%</p>
        </div>
        <div className='logout' onClick={() => setIsAuth(false)}>Logout <i class="fa-solid fa-right-from-bracket"></i></div>
    </div>
  )
}
