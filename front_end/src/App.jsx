
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Register from './Register';
import Login from './Login';
import Home from './Home';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import CreateBlogs from './CreateBlogs';
import Post from './Post';
import EditPost from './EditPost';

export const userContext = createContext()
function App() {
  const [user, setUser] = useState();
  
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get('http://localhost:3001/')
    .then(user => setUser(user.data))
    .catch(err => console.log(err))
  },[])
// console.log(user)
  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/create" element={<CreateBlogs></CreateBlogs>} />
          <Route path="/post/:id" element={<Post></Post>} />
          <Route path="/editPost/:id" element={<EditPost/>} />
   
      </Routes>
    </BrowserRouter>
    </userContext.Provider>
  )
}

export default App
