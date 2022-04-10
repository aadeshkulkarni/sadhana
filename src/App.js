import './App.css';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import { Progress } from './components/Progress';
import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { useEffect, useState } from 'react';
function App() {
  const [goalsPresent,setGStatus]=useState(false)
  const [error,setError]=useState("")
  
  const { pathname } = useLocation();
  useEffect(()=>{
    const goals= JSON.parse(localStorage.getItem('goals')) || [];
    if(goals.length>0){
      setGStatus(true)
    }
  },[pathname])
  
  useEffect(()=>{
    if(error.length>0){
      setTimeout(()=>{
        setError('')
      },5000)
    }
  },[error])

  return (
    <div className="container">
      <div className="header-bg"></div>
      <div style={{ minHeight: "30vh", maxHeight: "30vh", height: "30vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Link to="/">
          <h2 style={{ marginTop: "1rem" }} className="title">|| Sadhana ||</h2>
        </Link>
        {goalsPresent && pathname === '/view-goals' ? <Link to="/" style={{ marginTop: "2rem" }} >View today's Sadhana</Link> : goalsPresent && <Link to="/view-goals" style={{ marginTop: "2rem" }} >View all</Link>}
        <Link to="/set-goals" >
          <button style={{ marginTop: "1rem",display:'flex',justifyContent:"center",alignItems:"center" }} className="btn"><img src="add.svg" alt="Add"/> <span style={{marginLeft:"0.75rem",fontWeight:"700"}}>Create new Sadhana</span></button>
        </Link>
      </div>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/view-goals" element={<Goals type='view' />} />
        <Route path="/set-goals" element={<Goals type='set' setError={setError}/>} />
        <Route path="/set-progress" element={<Progress type='set' setError={setError}/>} />
      </Routes>
      {error.length>0 && <div className="error">{error}
        </div>}
    </div>
  );
}

export default App;
