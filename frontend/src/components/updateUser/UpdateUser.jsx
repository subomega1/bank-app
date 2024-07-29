import { useState } from "react";
import { FaEdit } from "react-icons/fa";


function UpdateUser() {
  const [isEditing, setIsEditing] = useState({
    fullName: false,
    username: false,
    password: false,
    email: false,
  });

  const handleEditClick = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="flex flex-col flex-grow p-4 h-screen">
      <h1 className="text-3xl font-semibold text-center mb-5">
        <span className="text-success">User Information</span>
      </h1>
      <form className="flex flex-col flex-grow">
        <div className="mb-3">
          {["fullName", "username", "password", "email"].map((field, index) => (
            <div key={index} className="mb-3">
              <label className="label p-2">
                <span className="text-base label-text capitalize">{field}</span>
              </label>
              <div className="flex w-full items-center">
                <input
                  type={field === "password" ? "password" : "text"}
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  className="input input-bordered input-success w-full max-w-xs"
                  disabled={!isEditing[field]}
                />
                <FaEdit
                  className="w-7 h-7 text-success cursor-pointer ml-2"
                  onClick={() => handleEditClick(field)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <button className="btn btn-outline btn-success w-full ">Update User</button>
          <button className="btn btn-outline btn-error w-full  mt-2">Delete User</button>
          
          
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
