import { useState } from 'react';
import toast from 'react-hot-toast';
import useUpdateUser from '../zustand/useUpdateUser.js';

function useUpUser() {
    const { selectedUser } = useUpdateUser();
    const [loading, setLoading] = useState(false);

    const updateUser = async (updatedUser) => {
        
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/update-user/${selectedUser?._id}`, { // Adjusted endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...updatedUser }), // Include user ID in request
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Update failed');
            }

            toast.success('User updated successfully');
            // Optionally, refresh the page or update the state here
            window.location.reload();
        } catch (error) {
            toast.error(`Update error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateUser };
}

export default useUpUser;
