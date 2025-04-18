import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../utils/requestSlice"

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

    const reviewRequests = async(status,_id) => {
        try{
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, {}, { withCredentials: true })
            dispatch(removeRequest(_id))
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRequests()
    },[])

    if(!requests) return

    if(requests.length === 0) return <h1 className="flex justify-center my-10"> No Requests Found</h1>

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
                                <button className="btn btn-primary my-2" onClick={() => {reviewRequests("rejected",r._id)}}>Reject</button>
                                <button className="btn btn-secondary my-2" onClick={() => {reviewRequests("accepted",r._id)}}>Accept</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Requests