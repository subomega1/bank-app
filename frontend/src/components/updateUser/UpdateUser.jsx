import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import useUpdateUser from "../../zustand/useUpdateUser.js";
import useUpUser from "../../hooks/useUpUser.js";
import toast from 'react-hot-toast';
import useDeleteUser from "../../hooks/useDeleteUser.js";

function UpdateUser() {
  
  const { selectedUser } = useUpdateUser();
  const { loading, updateUser } = useUpUser();
  const { loadingD, deleteUser } = useDeleteUser();
  const [inputValues, setInputValues] = useState({
    FullName: "", // Changed to FullName
    username: "",
    password: "",
    Email: "",
    balance: 0,
  });

  const [isEditing, setIsEditing] = useState({
    FullName: false, // Changed to FullName
    username: false,
    password: false,
    Email: false,
    balance: false,
  });

  useEffect(() => {
    if (selectedUser) {
      setInputValues({
        FullName: selectedUser.FullName || "", // Changed to FullName
        username: selectedUser.username || "",
        password: "",
        Email: selectedUser.Email || "",
        balance: selectedUser.balance || 0,
      });
    }
  }, [selectedUser]);

  const handleEditClick = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (field, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(inputValues);
    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
      console.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    await deleteUser();
  };

  return (
    <div className="flex flex-col flex-grow p-4 h-screen">
      <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
        <div className="mb-3">
          {["FullName", "username", "password", "Email", "balance"].map((field, index) => (
            <div key={index} className="mb-3">
              <label className="label p-2">
                <span className="text-base label-text capitalize">{field}</span>
              </label>
              <div className="flex w-full items-center">
                <input
                  type={field === "password" ? "password" : field === "balance" ? "number" : "text"}
                  placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  className="input input-bordered input-success w-full max-w-xs"
                  disabled={!isEditing[field]}
                  value={inputValues[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  min={field === "balance" ? 0 : undefined}
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
          <button type="submit" className="btn btn-outline btn-success w-full" >
            {loading ? <span className="loading loading-spinner"></span> : 'Update User'}
          </button>
          <button type="button" className="btn btn-outline btn-error w-full mt-2" onClick={handleDeleteUser}>
           {  loadingD ? <span className="loading loading-spinner"></span> : `Delete User`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
