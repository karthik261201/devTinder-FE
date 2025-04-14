import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)

    const fetchUser = async () => {
        if(user) return
        try {
            const res = await axios.get(BASE_URL+"/profile/view",{ withCredentials: true })
            dispatch(addUser(res.data))
        }
        catch(err) {
            if(err.status === 401) {
                naviagte("/login")
            }
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUser()
    },[])

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body