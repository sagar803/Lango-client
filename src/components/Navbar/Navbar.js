import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

export const Navbar = ({positionValue}) => {
  const navigate = useNavigate();
  return (
    <nav className='navbar'>
      <div className='logo'>LANGO</div>
      <div className='nav-icons'>
        <i class="fa-solid fa-ranking-star"></i>
        <i class="fa-solid fa-circle-info"></i>
        <i class="fa-solid fa-gear"></i>
        <i class="fa-solid fa-user"></i>
      </div>
    </nav>
  )
}