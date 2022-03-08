import { useContext, useEffect, useState } from "react"
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { Route, Routes } from 'react-router';
import axios from "axios";
import ProjectList from "./components/ProjectList";
import CreateProject from "./components/CreateProject";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import {AuthContext} from "./context/auth.context"



function App() {

  const [projectsArr, setProjectsArr] = useState([]);

  const { getToken } = useContext(AuthContext)

  useEffect( () => {
    fetchProjects();
  }, []);


  const fetchProjects = () => {

    const storedToken = getToken()

    axios.get(`${process.env.REACT_APP_API_URL}/projects`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
    )
    
      .then(response => {
        setProjectsArr(response.data);
      })
      .catch(e => console.log("error getting list of projects...", e));
  }

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/projects" element={
          <IsPrivate> 
        <ProjectList projects={projectsArr} /> 
        </IsPrivate> 
        } />


        <Route path="/projects/create" element={
          <IsPrivate>
            <CreateProject updateProjects={fetchProjects} />
          </IsPrivate>
        } />
        
        <Route path="/signup" element={ 
          <IsAnon>
            <SignupPage />
          </IsAnon> 
        } />

        <Route path="/login" element={ 
          <IsAnon>
            <LoginPage />
          </IsAnon> 
        } />



      </Routes>


    </div>
  );
}

export default App;
