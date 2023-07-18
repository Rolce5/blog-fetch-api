import React from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom';
import moment from 'moment/moment';
import Navbar from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from './Loading';

const PostShow = () => {
  // const elapsedTime = moment(createdAt).fromNow();

  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    author: '',
    email: '',
    text: '',
});
  const [inputErrorList, setInputErrorList] = useState({})

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/post/${id}`);
      const data = response.data;
      const imageUrl = response.data.imageUrl;
      setPost(data.post);
      setImageUrl(data.imageUrl);
      setComments(data.comments)
      setLoading(false);
      console.log(data.post);
      console.log("Working")
    } catch (error) {
      console.error(error);
      console.log("Error");
    }
  };

const handleInput = (e) =>{
  e.persist()
  setComments({...comment, [e.target.name]: e.target.value });
  
}

const handleSubmit = (e) => {
  e.preventDefault();

  const data = {
    author: comment.author,
    email: comment.email,
    comment: comment.comment
  }

  try {
    const response = axios.post(`http://127.0.0.1:8000/api/comment`, data);
    const data = response.data;
  } catch (error) {
    console.error(error);
    if(error.response.status === 422){
      setInputErrorList(error.response.data.errors)
    }
    if(error.response.status === 500){
      alert(error.response.data)
    }
  }
};
  
    // const [author, setAuthor] = useState('');
    // const [email, setEmail] = useState('');
    // const [text, setText] = useState('');
    // const [errors, setErrors] = useState([]);


useEffect(() => {
  fetchPost();
}, [id]);

if(loading){
  return (
    <Loading />
  )
}

  return (
    <div>
        <Navbar />
      <div className="container mt-5">
        <div className="container  mb-4 ">
          <div>
          <small className="mb-0 text-muted d-flex">Posted {new Date(post.created_at).toLocaleString()}</small>
            {
              <div key={post.id}>
                {/* <small className="text-body-tertiary">Posted {moment(post.createdAt).fromNow()}</small> */}
                <h1 className="my-2 "> {post.title}</h1>
                {imageUrl && <img src={imageUrl} alt="Post Image" className='img-fluid my-5' />}
                <p className="text-dark "> dds{post.body}</p>
              </div>
            }
               <div className="container">
                    <h2 className="mt-5 mb-2 text-4xl font-bold text-center text-gray-900">Comments</h2>
                    <form onSubmit={handleSubmit} className="mb-0">
                        <div className="form-group">
                            <label htmlFor="author" className="d-flex ">Author</label>
                            <input type="text" id="author" name="author" className="form-control" value={comment.author} onChange={handleInput} required />
                            <span className='text-danger'>{inputErrorList.author}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="d-flex ">Email</label>
                            <input type="email" id="email" name="email" className="form-control" value={comment.email} onChange={handleInput}  required />
                            <span className='text-danger'>{inputErrorList.email}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="text" className="d-flex mt-4">Text</label>
                            <textarea id="text" name="comment" className="form-control" value={comment.comment} onChange={handleInput}  required></textarea>
                            <span className='text-danger'>{inputErrorList.comment}</span>
                        </div>
                        <button type="submit" className="btn btn-primary d-flex  mt-2">Post</button>
                    </form>
                    <div className="mt-4">
                        {post.comments && post.comments.length > 0 && post.comments.map((comment, index) => (
                            <div key={index} className="mb-3 bg-white p-4 rounded shadow">
                                <div className="d-flex align-items-center">
                                    <div className="mr-4 flex-shrink-0">
                                        <span className="bg-dark-subtle p-3 rounded-circle">{comment.author.split(' ').map(name => name[0]).join('').toUpperCase()}</span>
                                    </div>
                                    <div className="flex-grow-1 ms-2">
                                        <p className="mb-0 font-weight-bold d-flex ">{comment.author}</p>
                                        <small className="mb-0 text-muted d-flex ">{new Date(comment.created_at).toLocaleString()}</small>
                                    </div>
                                </div>
                                <div className="mt-3 ms-2">
                                    <p className='d-flex fw-medium'>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostShow;
