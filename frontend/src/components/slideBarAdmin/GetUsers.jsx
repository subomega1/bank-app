import GetUser from "./GetUser"
import useGetUsers from "../../hooks/useGetUsers"

function GetUsers() {
   const {loading, users} = useGetUsers()
  return (
    <div className="mt-9 flex flex-col overflow-auto">

     {loading ? (<span className="loading loading-spinner mx-auto"></span>) : (null)}
    {users.map((user, index) => (
      <GetUser key={user._id} user={user}
      lastIndex={index === users.length - 1} />
    ))}


    </div>
  )
}

export default GetUsers