import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestSlice"

const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()

    const fetchRequests = async() => {
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received", { withCredentials: true })
            dispatch(addRequests(res?.data?.data))
        } catch(err) {
            console.log(err)
        }
    }

    console.log(requests)

    useEffect(() => {
        fetchRequests()
    },[])

    if(!requests) return

    if(requests.length === 0) return <h1> No Requests Found</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
            {
                requests.map( r => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = r.fromUserId

                    return (
                        <div key={_id} className="flex justify-between items-center gap-8 p-6 m-4 mx-auto w-2/3 max-w-3xl bg-base-200 rounded-2xl shadow-lg">
                            <img alt="photo" className="w-30 h-30 rounded-full object-cover border-4 border-base-100" src={photoUrl} />
                            <div className="text-left space-y-3">
                                <h2 className="text-2xl font-semibold text-base-content">{firstName + " " + lastName}</h2>
                                {age && gender && <p className="text-sm text-base-content/70">{age + ", " + gender}</p>}
                                <p className="text-base-content/90">{about}</p>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2">Reject</button>
                                <button className="btn btn-secondary mx-2">Accept</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Requests