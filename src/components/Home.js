import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = ({ posts, createdAt }) => {

  return (
    <div>
        <Navbar />
      <div className="container mt-5">
        <div className="container  mb-4 ">
          <div>
            {posts && posts.length > 0 && posts.map((post, index) => (
              <div key={post.id}>
                <h1 className="my-2 "><Link to={`/post/${post.id}`} className="text-decoration-none text-dark text-primary:hover"> {post.title}</Link></h1>
                <p className="text-dark "> dds{post.body.slice(0, 1000)}</p>
                <small className="mb-0 text-muted d-flex aligne-item-end">Posted {new Date(post.created_at).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
