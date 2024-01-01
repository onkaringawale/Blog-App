import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [registrationData, setRegistrationData] = useState({
        username :'',
        email:'',
        password:''

    });
    const navigate = useNavigate()

const handleInput=(e)=>{
let { name, value} = e.target;
setRegistrationData((previous)=>({...previous,[name]:value}))
}
const HandleRegis_Submit = (e)=>{
    e.preventDefault()
    console.log(registrationData)
    axios.post('http://localhost:3001/register',registrationData)
        .then(res => navigate('/login'))
        .catch(err => console.log(err))
}
  return (
    <div className='signup_container'>
        <div className='signup_form'>   
            <h2>
                Sign Up
            </h2>
            <form onSubmit={HandleRegis_Submit}>
                <div>
                <label htmlFor="name">User Name : </label>
                <input type="text" name="username" onChange={handleInput} value={registrationData.username}/>
                </div>
                <div>
                <label htmlFor="email">User Email : </label>
                <input type="email"  name="email" onChange={handleInput} value={registrationData.email} />
                </div>
                <div>
                <label htmlFor="password">User password : </label>
                <input type="password"  name="password" onChange={handleInput} value={registrationData.password} />
                </div>
                <div>
                <button type='submit' className='signup_button'> Sign up</button>
                </div>
            </form>
            <br />
            <p>if you already register?</p>
           
            <Link to={'/login'}><button>Login</button></Link>
        </div>
    </div>
  )
}

export default Register
