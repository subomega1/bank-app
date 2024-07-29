import SearchUser from "./SearchUser"
import GetUsers from "./GetUsers"
import LogoutBt from "./LogoutBt"
function GetSlideBar() {
  return (
    <div className=" p-4 flex flex-col h-screen ">
        <SearchUser/>
        <GetUsers />
        <LogoutBt />
    </div>
  )
}

export default GetSlideBar