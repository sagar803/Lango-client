import React from 'react'
import './ProfileWidget.css'

export const ProfileWidget = ({setIsAuth , progress}) => {

  const logout = () => {
    localStorage.removeItem('lango-user-id');
    localStorage.removeItem('lango-user');
    localStorage.removeItem('lango-token');
    localStorage.removeItem('lango-local');
    localStorage.removeItem('lango-practice');
    setIsAuth(false);
}
 
  return (
    <div className='profile-widget-container'>
        <div className='user-progress'>
            <p>Progress : {progress.percentage}%</p>
        </div>
        <div className='logout' onClick={() => logout()}>Logout <i class="fa-solid fa-right-from-bracket"></i></div>
    </div>
  )
}
