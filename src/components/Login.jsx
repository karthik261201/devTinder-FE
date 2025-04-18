import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [isLogin,setIsLogin] = useState(false)
    const [error,setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async() => {
        try {
            const res = await axios.post(BASE_URL+"/login",{ emailId: email, password: password },{ withCredentials: true })
            dispatch(addUser(res.data))
            navigate("/")
        }catch (err) {
            console.log(err)
            setError(err?.response?.data || "Something went wrong!")
        }
    }

    const handleSignUp = async() => {
        try {
            const res = await axios.post(BASE_URL+"/signup", { firstName: firstName, lastName: lastName, emailId: email, password: password}, { withCredentials: true })
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        }catch(err) {
            console.log(err)
            setError(err?.response?.data || "Something went wrong!")
        }
    }
    
    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">{ isLogin ? "Login" : "Sign Up" }</h2>
                    <div>
                        { !isLogin && <>
                            <fieldset className="fieldset pb-4">
                                <legend className="fieldset-legend text-sm">First Name</legend>
                                <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset pb-4">
                                <legend className="fieldset-legend text-sm">Last Name</legend>
                                <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                        </> }
                        <fieldset className="fieldset pb-4">
                            <legend className="fieldset-legend text-sm">Email</legend>
                            <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset pb-4">
                            <legend className="fieldset-legend text-sm">Password</legend>
                            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>{ isLogin ? "Login" : "Sign Up" }</button>
                    </div>
                    <p className="m-auto cursor-pointer py-2" onClick={() => setIsLogin((value) => !value)}>{ isLogin ? "New User? Signup Here" : "Existing User? Login Here"}</p>
                </div>
            </div>
        </div>
    )
}

export default Login