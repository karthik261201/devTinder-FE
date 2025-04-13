import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"

const Login = () => {
    const [email,setEmail] = useState("karthik@gmail.com")
    const [password,setPassword] = useState("Karthik@123")
    const dispatch = useDispatch()
    const naviagte = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL+"/login",{ emailId: email, password: password },{ withCredentials: true })
            dispatch(addUser(res.data))
            naviagte("/")
        }catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset pb-4">
                            <legend className="fieldset-legend text-sm">Email</legend>
                            <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset pb-4">
                            <legend className="fieldset-legend text-sm">Password</legend>
                            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login