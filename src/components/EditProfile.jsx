import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age || "")
    const [gender, setGender] = useState(user.gender || "")
    const [about, setAbout] = useState(user.about || "")
    const [error, setError] = useState("")
    const [toast, setToast] = useState(false)

    const dispatch = useDispatch()

    const saveProfile = async() => {
        setError("")
        try{
            const res = await axios.patch(BASE_URL+"/profile/edit", {firstName, lastName, photoUrl, age, gender, about}, { withCredentials: true })
            dispatch(addUser(res?.data?.data))
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 3000);
        } catch(err) {
            setError(err.response.data)
        }
    }

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset pb-4">
                                    <legend className="fieldset-legend text-sm">First Name</legend>
                                    <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                </fieldset>
                                <fieldset className="fieldset pb-4">
                                    <legend className="fieldset-legend text-sm">Last Name</legend>
                                    <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset pb-4">
                                    <legend className="fieldset-legend text-sm">Photo Url</legend>
                                    <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset pb-4">
                                    <legend className="fieldset-legend text-sm">Age</legend>
                                    <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset pb-4">
                                    <legend className="fieldset-legend text-sm">Gender</legend>
                                    <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} />
                                </fieldset>
                                <fieldset className="fieldset pb-4">
                                    <legend className="fieldset-legend text-sm">About</legend>
                                    <input type="text" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
                                </fieldset>
                            </div>
                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
            </div>
            {toast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProfile