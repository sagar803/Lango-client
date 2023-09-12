import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth } from './components/Auth/Auth';
import { Home } from './scenes/Home/Home.js';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);

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
          element={isAuth ? <Home isAuth={isAuth} setIsAuth={setIsAuth}/> : <Auth isAuth={isAuth} setIsAuth={setIsAuth}/>} 
        />
      </Routes>
      </div>
    </Router>
      
  );
}

export default App;

/*
            <Route
              path="/room"
              element={isAuth ? <Room setIsAuth={setIsAuth}/> : <Navigate to="/" />}
            />
            <Route 
              path="/create" 
              element={isAuth ? <CreateRoom isAuth={isAuth} setIsAuth={setIsAuth}/> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={isAuth ? <Profile isAuth={isAuth} setIsAuth={setIsAuth}/> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={isAuth ? <Settings isAuth={isAuth} setIsAuth={setIsAuth}/> : <Navigate to="/" />}
            />
*/