import React, { useEffect, useState } from 'react'
import './Home.css'
import { QuestionContainer } from '../../components/QuestionContainer/QuestionContainer'
import { Navbar } from '../../components/Navbar/Navbar'

export const Home = ({local, practice, setIsAuth, user}) => {
  const [questions, setQuestions] = useState([]);
  const [level, setLevel] = useState("easy");
  
  const fetchData = async () => {
    try {
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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [level]); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div className='home'>
      <Navbar />
      <div className='level-container'>
        <p className={level === "easy" ? 'level selected' : 'level'} onClick={() => setLevel('easy')}>Easy</p>
        <p className={level === "medium" ? 'level selected' : 'level'} onClick={() => setLevel('medium')}>Medium</p>
        <p className={level === "hard" ? 'level selected' : 'level'} onClick={() => setLevel('hard')}>Hard</p>
      </div>
      <section className='home-main'>
        <div className='questions-container'>
          {questions.map((q) => <QuestionContainer user={user} key={q._id} q={q} />)}
        </div>
      </section>
    </div>
  )
}
