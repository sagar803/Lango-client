import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth } from './components/Auth/Auth';
import { Home } from './scenes/Home/Home.js';
import { Setup } from './scenes/Setup/Setup';
import { useState } from 'react';

function App() {
  const [user , setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({local: "", practice: ""})

  return (
    <Router>
      <div className="App">
      <Routes>
        <Route
            path="*" 
            element={<p>Not Found</p>} 
        />
        <Route
          path="/" 
          element={isAuth ? <Home user={user} local={selectedOptions.local} practice={selectedOptions.practice} setIsAuth={setIsAuth}/> : <Auth isAuth={isAuth} setIsAuth={setIsAuth} setUser={setUser}/>} 
        />
        <Route
            path="/setup" 
            element={isAuth ? <Setup selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/> : <Setup />} 
        />
      </Routes>
      </div>
    </Router>
      
  );
}

export default App;