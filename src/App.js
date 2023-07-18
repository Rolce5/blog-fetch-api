
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManagePost from './components/ManagePost';
import Login from './components/Login';
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
import PostShow from './components/PostShow';

function App() {
  // const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/api/home');
  //     const data = await response;
  //     setPosts(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchPosts();
  // }, [])

  const [posts, setPosts] = useState([]);
 

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/home`);
      const data = response.data;
      setPosts(data.posts.data);
    } catch (error) {
      console.error(error);
    }
  };


useEffect(() => {
  fetchPosts();
}, []);
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home posts={posts} />}></Route>
        <Route path='post/:id' element={<PostShow />}></Route>
        <Route path='posts/manage' element={<ManagePost />}></Route>
        <Route path='posts/create' element={<PostCreate />}></Route>
        <Route path='posts/:id/edit`' element={<PostEdit />}></Route>
        <Route path='login' element={<Login />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
