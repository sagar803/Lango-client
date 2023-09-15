import React from 'react'
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import { ProfileWidget } from '../../components/ProfileWidget/ProfileWidget'


export const Navbar = ({setIsAuth}) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState();
  
  const userId = localStorage.getItem('lango-user-id');
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();
  return (
    <nav className='navbar'>
      <div className='logo' onClick={() => navigate('/home')}>LANGO</div>
      <div className='nav-icons'>
        <i class="fa-solid fa-ranking-star" onClick={() => navigate('/ranking')}></i>
        {
          visible ? (
            <i class="fa-solid fa-xmark active" onClick={() => setVisible(!visible)}></i>
            ) : (
            <i class="fa-solid fa-user" onClick={() => setVisible(!visible)}></i>
          )
        }
      </div>
      {visible && (
        <div className="widget-container">
          <ProfileWidget progress={progress} setIsAuth={setIsAuth} />
        </div>
      )}
    </nav>
  )
}