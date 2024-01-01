
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const [title, settitle] = useState();
    const [desc, setdesc] = useState();
    const {id} = useParams()
    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put('http://localhost:3001/editPost/'+id,{title,desc})
        .then(res=> {
           console.log(res)
           if(res.data === "Success"){
            navigate('/')
           }
        })
        .catch(err =>console.log(err))
    }
  
    useEffect(()=>{
        axios.get('http://localhost:3001/getpostbyid/'+id)
        .then(result=>{
            settitle(result.data.title)
            setdesc(result.data.desc)
        } ) 
        .catch(err =>console.log(err) )
            
    },[])

  return (
    <div className="post_container">
        <div className="post_form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Enter Title" value={title} onChange={(e)=>settitle(e.target.value)} />
                <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Enter Description"
                onChange={(e)=> setdesc(e.target.value)} value={desc}></textarea>
                {/* <input type="file" id='desc' name="file" /> */}
                <button type="submit"> post</button>
            </form>
        </div>
    </div>
  )
}

export default EditPost;

