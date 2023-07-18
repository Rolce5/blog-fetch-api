import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar';

const ManagePost = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts/index');
        const data = response.data;
        setPosts(data.posts);
        console.log(data.posts);
        console.log('on manage')
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchPosts();
    }, [])

    const deletePost = (e, id) => {
        e.preventDefault();
         const thisClicked = e.currentTarget;
         thisClicked.innerText = 'Deleting...'

         try {
            const response = axios.delete(`http://127.0.0.1:8000/api/posts/${id}/delete`);
      
            console.log(response.data);
            // Redirect to the post details page
          } catch (error) {
            console.log(error);
          }
    }
    return (
        <div>
            <Navbar />
            <div className="container px-4 py-5">
                <div className="col-md-10 mx-auto col-lg-10">
                    <div className="d-flex justify-content-end text-right mb-3">
                        <Link to="/posts/create" className="btn btn-success"> Create Post</Link>
                    </div>
                    <div className="table-responsive position-relative">
                        <table className="table  table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Body</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posts && posts.length > 0 && posts.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>
                                        <td>
                                            <Link to={`/posts/${post.id}/edit`} className="btn btn-sm btn-secondary"><i class="bi bi-pencil-square"></i></Link>
                                            <button type='button' className="btn btn-danger btn-sm"  onClick={(e) => { deletePost(e, post.id) }} ><i class="bi bi-trash3-fill"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default ManagePost
