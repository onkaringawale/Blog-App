import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [allposts, setallposts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getRecords')
      .then(posts => setallposts(posts.data))
      .catch(err => console.log(err))
  }, [])
  console.log(allposts)
  return (
    <div className="allPostsCard">
      {
        allposts.map((post) => (
          <>
          <div className="card">
              <div className="PostedImg">
                <img src={`http://localhost:3001/Images/${post.file}`} />

              </div>
              <div className="container">
                <h4><b>{post.title}</b></h4>
                <p>{post.desc}</p>
              </div>
              <div className="seePostDiv">
              <Link to={`/post/${post._id}`} className="seepostButton"> See the full post</Link>
              </div>
          </div>
          </>
        ))
      }
    </div>
  )
}

export default Home;
