import useUpdateUser from '../../zustand/useUpdateUser.js';



function GetUser( {user, lastIndex}) {

  const { selectedUser, setSelectedUser } = useUpdateUser();
   const isSelected = selectedUser?._id === user._id; 
  // State to track if the div is clicked
  

  // Function to toggle the isClicked state
 

   return (
    <>
      <div
        className={`flex gap-2 items-center cursor-pointer  ${isSelected ? 'bg-success' : 'hover:bg-success'}`}
        onClick={() => setSelectedUser(user)}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src="/public/avatar.png" alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black pl-2">{user.FullName} </p>
          </div>
        </div>
          
      </div>
      {!lastIndex && <div className="divider my-0 py-2 h-1" />}
    </>
  );
}

export default GetUser;
