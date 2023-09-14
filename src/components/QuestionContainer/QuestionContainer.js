import React, { useState } from 'react'
import './QuestionContainer.css'


export const QuestionContainer = ({q, user}) => {
  const [selected, setSelected] = useState(-1);
  const [submissionResult, setSubmissionResult] = useState();

  const handleSubmit = async (index) => {
      setSelected(index);
      try {
          const res = await fetch(`${process.env.REACT_APP_API}/questions/submit`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                questionId: q._id, 
                userId: user._id,
                submission: index,
            }),
          }) 
          if (res.ok){
              const data = await res.json();
              setSubmissionResult(data.result);
          }
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <div className='quiz-container'>

        <div className='question-meta-data'>
          <p>{q.languageId.toUpperCase()}</p>
          <i class="fa-solid fa-brain"></i>
          <p>{q.level}</p>
        </div>
        
        <hr className='question-hr'/>
        
        <div className='question'>
          {q.quiz.question}
        </div>
        
        <div className='options-container'>
          {q.quiz.options.map((o, index) => (
            <div 
                className={`option ${selected === index ?  (submissionResult ? 'green' : 'red') : ''}`}
                onClick={() => handleSubmit(index)}
            >
              {o}
            </div>
          ))}
        </div>

    </div>
  )
}

/*
{
            "quiz": {
                "question": "What does 'Gracias' mean in Spanish?",
                "options": [
                    "Goodbye",
                    "Hello",
                    "Thank you",
                    "Please"
                ],
                "correct_option": 2
            },
            "_id": "6502b8d2722881fa974b86e4",
            "languageId": "es",
            "type": "mcq",
            "word": "Gracias",
            "translation": "Thank you",
            "sentence": "Sentence: 'Gracias por tu ayuda.' (Thank you for your help.)",
            "helper_text": "Helper Text: Use 'Gracias' to express gratitude in Spanish.",
            "level": "easy",
            "__v": 0
        }
*/