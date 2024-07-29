import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Otpverifier from "./pages/Otpverifier";
import Admin from "./pages/Admin";
import AddUser from "./pages/AddUser";
import User from "./pages/User";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { authUser } = useAuthContext();

    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/otpverifier" 
                    element={authUser ? <Otpverifier /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/admin" 
                    element={authUser?.role === 'admin' ? <Admin /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/admin/adduser" 
                    element={authUser?.role === 'admin' ? <AddUser /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/user" 
                    element={authUser ? <User /> : <Navigate to="/login" />} 
                />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
