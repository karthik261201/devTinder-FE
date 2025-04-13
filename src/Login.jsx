import axios from "axios"
import { useState } from "react"

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/login",{ emailId: email, password: password },{ withCredentials: true })
            console.log(res.data)
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
                            <input type="text" className="input" onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset pb-4">
                            <legend className="fieldset-legend text-sm">Password</legend>
                            <input type="password" className="input" onChange={(e) => setPassword(e.target.value)} />
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