import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { userContext } from "./App"

const Post = () => {
  const { id } = useParams()
  const [post, setpost] = useState({});
  const user = useContext(userContext)
  const navigate = useNavigate()
  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deletePost/' + id)
      .then(result => navigate('/'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('http://localhost:3001/getpostbyid/' + id)
      .then(result => setpost(result.data))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="editCard">
      <div className="postCard">
        <div className="PostedImg">
          <img src={`http://localhost:3001/Images/${post.file}`} alt="" />

        </div>
        <div className="container">
          <h4><b>{post.title}</b></h4>
          <p>{post.desc}</p>
        </div>
        <div>

          {
            user ?
                user.email === post.email ?<>
                <Link to={`/editPost/${post._id}`}> Edit </Link>
                <button onClick={() => handleDelete(post._id)}> Delete </button>
                </>  :<></>
               : <></>

          }


        </div>


      </div>

    </div>
  )
}

export default Post
