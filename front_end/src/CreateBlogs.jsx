import axios from "axios";
// import { cleanData } from "jquery";
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { userContext } from "./App";

const CreateBlogs = () => {
    const [title, settitle] = useState();
    const [desc, setdesc] = useState();
    const [file, setfile] = useState();
    const user = useContext(userContext)
    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData();    //formdata object
        formData.append('title',title)
        formData.append('desc',desc)
        formData.append('file',file)
        formData.append('email',user.email)

        axios.post('http://localhost:3001/create',formData)
        .then(res=> {
           console.log(res)
           if(res.data === "Success"){
            navigate('/')
           }
        })
        .catch(err =>console.log(err))
    }
  
  return (
    <div className="post_container">

        <div className="post_form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Enter Title" value={title} onChange={(e)=>settitle(e.target.value)} />
                <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Enter Description"
                onChange={(e)=> setdesc(e.target.value)} value={desc}></textarea>
                <input type="file" id='desc' name="file" onChange={(e)=>setfile(e.target.files[0])}/>
                <button type="submit"> post</button>
            </form>
        </div>
    </div>
  )
}

export default CreateBlogs
