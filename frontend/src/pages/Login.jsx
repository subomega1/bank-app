import Header from "../components/Header";
import CopyRight from "../components/CopyRight";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useLogin from "../hooks/useLogin";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success } = await login({ username, password });
        if (success) {
            navigate('/otpverifier');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-4 flex justify-center items-center">
                <div className="flex flex-col items-start justify-start min-w-96 mx-auto">
                    <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                        <h1 className="text-3xl font-semibold text-center text-black">
                            Login
                            <span className="text-success"> AmenBank</span>
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="label p-2">
                                    <span className="text-base label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    className="input input-bordered input-success w-full max-w-xs"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label className="label">
                                    <span className="text-base label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="input input-bordered input-success w-full max-w-xs"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className={`btn btn-outline btn-success w-full`}
                                    disabled={loading}
                                >
                                    {loading ? <span className="loading loading-spinner"></span> : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CopyRight />
        </div>
    );
}

export default Login;
