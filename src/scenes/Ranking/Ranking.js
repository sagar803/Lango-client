import React, { useState, useEffect } from 'react'
import "./Ranking.css"
import { Navbar } from '../../components/Navbar/Navbar'
import { Loader } from '../../components/Loader/Loader'

export const Ranking = ({setIsAuth}) => {

  const [loading, setLoading] = useState(false);
  const [rankings, setRankings] = useState();
  const fetchRankingsData = async () => {
  try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API}/user/rankings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setRankings(data.result);
      }
    } catch (error) {
      console.log(error);
    } finally { 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingsData();
  },[])

  return (
    <div className='ranking'>
      <Navbar setIsAuth={setIsAuth}/>
      <div className='rankings-container'>
        <h3>Leaderboard</h3>
        <hr />
        { 
          loading ? (
            <div style={{display:"flex", width: "100%" , justifyContent:"center"}}><Loader/></div>
          ) : (
              rankings && rankings.length !== 0 ? (
                    <table className='ranking-table'>
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Solved</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankings.map((r, index) => (
                          <tr key={index}>
                            <td>{r.rank + 1}</td>
                            <td>{r.name}</td>
                            <td>{r.solved}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                ) : (
                  <p style={{width: "100%" ,textAlign: "center"}}>Something Went wrong</p>
                )
            )
        }
      </div>
    </div>
  )
}
