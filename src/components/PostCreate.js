import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      console.log(response.data);
      // Redirect to the post details page
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="col-md-10 mx-auto col-lg-7">
          <form className="p-4 p-md-5 border  bg-light" onSubmit={handleSubmit}>
            <header className="text-center">
              <h2 className="text-2xl font-bold uppercase mb-1">Create a Post</h2>
            </header>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" id="title" className="form-control" value={title} onChange={handleTitleChange} required />
              {/* {title.length===0 && validation && <span className="text-danger">title is required</span>} */}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image:</label>
              <input type="file" id="image" className="form-control" onChange={handleImageChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="body" className="form-label">Body:</label>
              <textarea id="body" className="form-control" value={body} onChange={handleBodyChange} required />
              {/* {body.length===0 &&  validation && <span className="text-danger">this field is required</span>} */}

            </div>
            <div className="mb-6">

              <button type="submit" className="btn btn-success">Create</button>
              <Link to="/post/manage" className="text-black ml-4">Back</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostCreate
