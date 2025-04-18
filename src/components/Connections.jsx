import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()

    const fetchConnection = async() => {
        try {
            const res = await axios.get(BASE_URL+"/user/connections", { withCredentials: true })
            dispatch(addConnection(res?.data?.data))
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchConnection()
    },[])

    if(!connections) return

    if(connections.length === 0) return <h1> No Connections Found!!</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            {
                connections.map( c => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = c

                    return (
                        <div key={_id} className="flex items-center gap-8 p-6 m-4 mx-auto w-2/3 max-w-3xl bg-base-200 rounded-2xl shadow-lg">
                            <img alt="photo" className="w-30 h-30 rounded-full object-cover border-4 border-base-100" src={photoUrl} />
                            <div className="text-left space-y-3">
                                <h2 className="text-2xl font-semibold text-base-content">{firstName + " " + lastName}</h2>
                                {age && gender && <p className="text-sm text-base-content/70">{age + ", " + gender}</p>}
                                <p className="text-base-content/90">{about}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Connections