import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const navigate = useNavigate()
    const verifyToken = async () => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        try {   
            const data = await axios.get('http://localhost:8000/auth/verifyToken', {
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': 'Bearer ' + accessToken
                }
            })

        } catch(e) {
            const responseMessage = e?.response?.data?.message;
            if(responseMessage === "jwt expired") {
                try {
                    // generate refresh token 
                    const data = await axios.post('http://localhost:8000/auth/generateToken', JSON.stringify({ token: refreshToken }), {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                } catch(e) {
                    console.log()
                    const responseMessage = e?.response?.data?.message
                    if(responseMessage === "jwt expired" && e?.response?.status === 401) {
                        localStorage.removeItem("accessToken")
                        localStorage.removeItem("refreshToken")
                        navigate('/login')
                    }
                }                
            }
            // console.log("Response message = ", responseMessage)
            // console.log("Error = ", e)
        }
    }

    useEffect(() => {
        verifyToken()
    })
  return (
    <div>
        <h1>Welcome to dashboard page</h1>
        <div>
            Admin Section
        </div>
        <div>
            HR Section
        </div>
        <div>
            User Section
        </div>
        <button>Logout</button>
    </div>
  )
}

export default Dashboard