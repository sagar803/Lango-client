import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Auth } from './scenes/Auth/Auth';
import { Home } from './scenes/Home/Home.js';
import { Setup } from './scenes/Setup/Setup';
import { useState , useEffect} from 'react';
import { Ranking } from './scenes/Ranking/Ranking';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('lango-user');
    const userId = localStorage.getItem('lango-user-id');

    if (user && userId) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);


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
          element={isAuth ? <Navigate to='/home' /> :  <Auth setIsAuth={setIsAuth}/>} 
        />
        <Route
            path="/setup" 
            element={isAuth ? <Setup /> :  <Navigate to='/' />} 
        />
        <Route
            path="/home" 
            element={isAuth ? <Home setIsAuth={setIsAuth}/> :  <Navigate to='/' />} 
        />
        <Route
            path="/ranking" 
            element={isAuth ? <Ranking setIsAuth={setIsAuth}/> :  <Navigate to='/' />} 
        />
      </Routes>
      </div>
    </Router>
      
  );
}

export default App;