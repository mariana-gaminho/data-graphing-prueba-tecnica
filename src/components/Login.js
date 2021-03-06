import React from 'react'
import axios from 'axios'
import useForm from '../hooks/useForm'
import swal from 'sweetalert'
import Cookies from 'js-cookie'
const baseURL = 'https://voldemort.klustera.com'


const Login = props => {
  const [form, handleInputs] = useForm()
  const { username, password } = form
  const inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000)

  const handleLogin = () => {
    let config = {auth: {
      username: username,
      password: password
    }}

    axios.get(`${baseURL}/login`, config)
    .then(response => {
        const {token} = response.data
        Cookies.set('cookie', token, {expires: inTwoHours})
        props.history.push('/graph')
    })
    .catch(err => {
        console.log(err)
        swal({
          title: "Oops...",
          text: "Something went wrong.",
          icon: "error",
          dangerMode: true,
          timer: 3000,
          button: false
          })
    })
  }
  
  return(
    <div className="loginContainer">
        <div className="loginForm">
          <h2>Log in</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleInputs} required/> <br/>
          <input type="password" name="password" placeholder="Password" onChange={handleInputs} required/> <br/>
          <button onClick={handleLogin}>Log in</button> <br/>
        </div>
    </div>
  )
}

export default Login

