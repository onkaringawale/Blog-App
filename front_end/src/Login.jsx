import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


const Login = () => {
    const [loginData, setRegistrationData] = useState({
        username :'',
        email:'',
        password:''
        
    });
    const navigate = useNavigate()

const handleInput=(e)=>{
let { name, value} = e.target;
setRegistrationData((previous)=>({...previous,[name]:value}))
}
const HandleLogin_Submit = (e)=>{
    e.preventDefault()
    // axios.post({url:'http://localhost:3001/login', withCredentials:true},loginData)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
        axios({
            method: 'post',
            url: 'http://localhost:3001/login',
            data: loginData,
            withCredentials:true
          }).then(res => {
            if(res.data === 'Success'){
                window.location.href ='/'
            }
          })
          .catch(err => console.log(err))
 }

  return (
    <div>
        <div className='signIn_container'>
        <div className='signIn_form'>
            <h2>
                Sign In
            </h2>
            
            <form onSubmit={HandleLogin_Submit}>
                {/* <div>
                <label htmlFor="name">User Name : </label>
                <input type="text" />
                </div> */}
                <div>
                <label htmlFor="email">User Email : </label>
                <input type="email"  name="email" onChange={handleInput} value={loginData.email} />
                </div>
                <div>
                <label htmlFor="password">User password : </label>
                <input type="password"  name="password" onChange={handleInput} value={loginData.password} />
                </div>
                <div>
                <button type='submit' className='signIn_button'> Sign In</button>
                </div>
            </form>
            <br />
            <p>if you already not have account?</p>
            <Link to={'/register'}><button>Register</button></Link>
        </div>
    </div>
    </div>
  )
}

export default Login
