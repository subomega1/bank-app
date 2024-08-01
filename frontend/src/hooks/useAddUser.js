import { useState } from "react";
import toast from "react-hot-toast";

function useAddUser() {

    const [loading, setLoading] = useState(false);

    const addUser = async (newUser) => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Add failed');
            }
        }
            catch (error) {
                toast.error(`Add error: ${error.message}`);
            }
            finally {
                setLoading(false);
            }
        

    }

    return { loading, addUser };

}

export default useAddUser