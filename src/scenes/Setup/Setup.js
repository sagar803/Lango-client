import React, { useState } from 'react'
import './Setup.css'
import { useNavigate } from 'react-router-dom'


export const Setup = () => {
    const [selectedOptions, setSelectedOptions] = useState({local: "", practice: ""})
    const navigate = useNavigate();

    const handleSubmit = () => {
        if(selectedOptions.local === "" || selectedOptions.practice === "" || (selectedOptions.local === selectedOptions.practice)){
          alert('Please fill the details correctly');      
        } else {
          localStorage.setItem('lango-local', selectedOptions.local);
          localStorage.setItem('lango-practice', selectedOptions.practice);
          navigate('/home')
        }
    }
    const language = [
        {
          "languageId": "EN",
          "name": "English"
        },
        {
          "languageId": "ES",
          "name": "Spanish"
        },
        {
          "languageId": "FR",
          "name": "French"
        },
        {
          "languageId": "DE",
          "name": "German"
        },
        {
          "languageId": "IT",
          "name": "Italian"
        },
    ]
    
    return (
      <div className='setup-body'>
        <div className='setup-container'>
            <h1 className='setup-heading'>Getting Started....</h1>
            <div className='select-local-language languages-container'>
                <p className='language-container-heading'>Which Language you are comfortable with..</p>
                <hr />
                {language.map((lang) => (
                  <label key={lang.languageId}>
                        <input
                          type='radio'
                          name='Local'
                          value={lang.languageId}
                          onChange={(e) => setSelectedOptions({ ...selectedOptions, local: e.target.value })}
                        />
                        {lang.name}
                      </label>
                ))}
            </div>
            <div className='select-practice-language languages-container'>
                  <p className='language-container-heading'>Which Language you want to learn..</p>
                  <hr />
                    {language.map((lang) => (
                      <label key={lang.languageId}>
                        <input
                          type='radio'
                          name='practice'
                          value={lang.languageId}
                          onChange={(e) => setSelectedOptions({ ...selectedOptions, practice: e.target.value })}
                        />
                        {lang.name}
                      </label>
                    ))}
            </div>
            <div className='setup-submit-button'>
              <button onClick={handleSubmit}>
                Lets Go...
              </button>
            </div>
          </div>
      </div>
    )
}
