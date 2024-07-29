import Header from "../components/Header"
import { useState } from "react";
//import useAddUser from "../hooks/useAddUser"
function AddUser() {
  
  const [inputValue, setInputValue] = useState({
    FullName: "",
    UserName: "",
    Password: "",
    confirmedPassword: "",
    Email: "",
  });
  //const {loading, addUser} = useAddUser()

  const handleSubmit = (event) => {
    event.preventDefault();
    //addUser(inputValue)
  

    
  };
  
  return (
    <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow p-4 flex justify-center items-center">
            <div className="flex flex-col items-start justify-start min-w-96 mx-auto">
              <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-black">
               
                  <span className="text-success"> AddUser</span>
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="label p-2">
                      <span className="text-base label-text">FullName</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter FullName"
                      className="input input-bordered input-success w-full max-w-xs"
                      value={inputValue.FullName}
                      onChange={(e) =>
                        setInputValue({ ...inputValue, FullName: e.target.value })
                      }
                    />
                    <label className="label">
                      <span className="text-base label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      className="input input-bordered input-success w-full max-w-xs"
                      value={inputValue.UserName}
                      onChange={(e) =>
                        setInputValue({ ...inputValue, UserName: e.target.value })
                      }
                    />
                    <label className="label">
                      <span className="text-base label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="input input-bordered input-success w-full max-w-xs"
                      value={inputValue.Password}
                      onChange={(e) =>
                        setInputValue({ ...inputValue, Password: e.target.value })
                      }
                    />
                       <label className="label p-2">
                      <span className="text-base label-text">Confirmed Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Confirmed Password"
                      className="input input-bordered input-success w-full max-w-xs"
                      value={inputValue.confirmedPassword}
                      onChange={(e) =>
                        setInputValue({ ...inputValue, confirmedPassword: e.target.value })
                      }
                    />
                       <label className="label p-2">
                      <span className="text-base label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Email"
                      className="input input-bordered input-success w-full max-w-xs"
                      value={inputValue.Email}
                      onChange={(e) =>
                        setInputValue({ ...inputValue, Email: e.target.value })
                      }
                    />
                    
                  </div>
    
                  <div>
                    <button className="btn btn-outline btn-success w-full">{'Add User'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default AddUser

