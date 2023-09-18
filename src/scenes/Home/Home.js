import React, { useEffect, useState } from 'react'
import './Home.css'
import { QuestionContainer } from '../../components/QuestionContainer/QuestionContainer'
import { Navbar } from '../../components/Navbar/Navbar'
import { Loader } from '../../components/Loader/Loader'

export const Home = ({setIsAuth}) => {
  const [questions, setQuestions] = useState([]);
  const [level, setLevel] = useState("easy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
// eslint-disable-next-line  no-unused-vars
  const local = localStorage.getItem('lango-local');
  const practice = localStorage.getItem('lango-practice');

  console.log(questions);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API}/questions/${practice.toLowerCase()}/${level}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setQuestions(data.result);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    } finally { 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [level]); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div className='home'>
      <Navbar setIsAuth={setIsAuth}/>
      <div className='level-container'>
        <p className={level === "easy" ? 'level selected' : 'level'} onClick={() => setLevel('easy')}>Easy</p>
        <p className={level === "medium" ? 'level selected' : 'level'} onClick={() => setLevel('medium')}>Medium</p>
        <p className={level === "hard" ? 'level selected' : 'level'} onClick={() => setLevel('hard')}>Hard</p>
      </div>
      <section className='home-main'>
        <div className='questions-container'>
          {
            loading ? (
                <div style={{display:"flex", width: "100%" , justifyContent:"center"}}><Loader/></div>
              ) : (
                error ? (
                  <p style={{width: "100%" ,textAlign: "center"}}>Something Went wrong</p>
                ) : (
                  questions.length !== 0 ? (
                    questions.map((q) => <QuestionContainer key={q._id} q={q} />)
                  ) : (
                    <p style={{width: "100%" ,textAlign: "center"}}>Nothing to show up here.</p>
                  )
                )
              )
          }
        </div>
      </section>
    </div>
  )
}