import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";
import useAddUser from "../hooks/useAddUser";

function AddUser() {
  const [inputValue, setInputValue] = useState({
    FullName: "",
    username: "",
    password: "",
    confirmedPassword: "",
    Email: "",
  });

  const { loading, addUser } = useAddUser();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!inputValue.FullName || !inputValue.username || !inputValue.Email) {
      toast.error("Please fill all required fields");
      return;
    }

    if (inputValue.password !== inputValue.confirmedPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await addUser(inputValue);
      toast.success("User added successfully!");
      navigate("/admin"); // Navigate to /admin on success
    } catch (error) {
      toast.error(`Add error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 flex justify-center items-center">
        <div className="flex flex-col items-start justify-start min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-black">
              <span className="text-success">Add User</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="label p-2">
                  <span className="text-base label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="FullName"
                  placeholder="Enter Full Name"
                  className="input input-bordered input-success w-full max-w-xs"
                  value={inputValue.FullName}
                  onChange={handleChange}
                  aria-label="Full Name"
                />
                <label className="label">
                  <span className="text-base label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="input input-bordered input-success w-full max-w-xs"
                  value={inputValue.username}
                  onChange={handleChange}
                  aria-label="Username"
                />
                <label className="label">
                  <span className="text-base label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="input input-bordered input-success w-full max-w-xs"
                  value={inputValue.password}
                  onChange={handleChange}
                  aria-label="Password"
                />
                <label className="label p-2">
                  <span className="text-base label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmedPassword"
                  placeholder="Enter Confirm Password"
                  className="input input-bordered input-success w-full max-w-xs"
                  value={inputValue.confirmedPassword}
                  onChange={handleChange}
                  aria-label="Confirm Password"
                />
                <label className="label p-2">
                  <span className="text-base label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter Email"
                  className="input input-bordered input-success w-full max-w-xs"
                  value={inputValue.Email}
                  onChange={handleChange}
                  aria-label="Email"
                />
              </div>
              <div>
                <button type="submit" className="btn btn-outline btn-success w-full" disabled={loading}>
                  {loading ? <span className="loading loading-spinner"></span> : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
