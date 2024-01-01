import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios'

const Navbar = () => {
  const user = useContext(userContext)
  const navigate = useNavigate()
  const handleLogout=()=>{
   axios.get('http://localhost:3001/logout')
   .then(res=>{
    if(res.data === 'Success')
    navigate(0)
   })
   .catch(err =>{
    return console.log(err)
   })
  }
  return (
    <div className='navbar-header'>
        <div><h3>Blog App</h3></div>
        <div>
            <Link to={'/'} className='link'>Home </Link>
            {user ? 
              <>
                { user.username ? (
               <Link to={'/create'} className='link'>Create</Link>
                ):(
                 <></>
                )}       
              </>
        :<></>
       
      }
            
            <a href="" className='link'>Contact</a>
        </div>

        {user ? 
              <>
                { user.username ? (
                  <div>
                  <input type="button" value="Logout" onClick={handleLogout} className='btn_input' />
                  </div>
                ):(
                  <div>
                  <h5><Link to={'/register'} className='link'> Register/Login</Link></h5>
                  </div>
                )}       
              </>
        :<></>
       
      }
        
          {/* if(user){
            if(user.username ){
              <div>
                <input type="button" value="Logout" />
              </div>
            }
            else{
  
              <div><h5><Link to={'/register'} className='link'> Register/Login</Link></h5></div>
            }

          }
          else{

          } */}
        
       
      
    </div>
  )
}

export default Navbar

