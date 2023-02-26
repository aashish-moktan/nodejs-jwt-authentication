import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import './Login.css'


const Login = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ 
        email: 'admin@gmail.com', 
        password: 'admin'
    })

    const [formResponse, setFormResponse] = useState('')
    
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:8000/auth/login', JSON.stringify(formData), {
                headers: {
                  'Content-Type': 'application/json'
                }
            })

            console.log("Data = ", data)

            if(data.success) {
                localStorage.setItem("accessToken", data.token.accessToken)
                localStorage.setItem("refreshToken", data.token.refreshToken)
                setFormResponse(data.message)
                setTimeout(() => setFormResponse(''), 3000)
                navigate('/dashboard')
            }


        } catch(e) {
            console.log(e)
        }
    }


  return (
    <div id="form-box">
        <img src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" alt="avatar" width="80" />
        <h2 align="center">Login form</h2>
        <form id="login-form" onSubmit={handleSubmit}>
            <div>
                <label>Email*</label>
                <input 
                    type="email" 
                    value={formData.email}
                    name="email" 
                    required
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password*</label>
                <input 
                    type="password" 
                    value={formData.password} 
                    name="password" 
                    required 
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            <div id="error-div">
                { formResponse }
            </div>
        </form>
        {/* <ToastContainer /> */}
    </div>
  )
}

export default Login