import React from 'react'
import "./Ranking.css"
import { Navbar } from '../../components/Navbar/Navbar'

export const Ranking = ({setIsAuth}) => {
  return (
    <div className='ranking'>
      <Navbar setIsAuth={setIsAuth}/>
      Rankings will show up after some time, we are working on it.
    </div>
  )
}
