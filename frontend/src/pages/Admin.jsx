import Header from '../components/Header';
import GetSlideBar from '../components/slideBarAdmin/GetSlideBar';
import UpdateUser from '../components/updateUser/UpdateUser';
import NoUserSelected from '../components/updateUser/NoUserSelected';
import useUpdateUser from '../zustand/useUpdateUser.js';
function Admin() {
  const {selectedUser} = useUpdateUser();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 flex  mt-6">
        <div className="flex flex-col items-start justify-start min-w-96 ml-5">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <GetSlideBar />
            
          </div>
         
        </div>
        <div className="flex-auto flex-col items-start justify-start min-w-96   ">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
              {selectedUser  ? <UpdateUser /> : <NoUserSelected />} 
              
            </div>
          </div>
      </div>
    </div>
  );
}

export default Admin;
