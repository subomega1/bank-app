import useUpdateUser from '../zustand/useUpdateUser.js';
import toast from 'react-hot-toast';
import { useState } from 'react';

function useDeleteUser() {
    const { selectedUser } = useUpdateUser();
    const [loadingD, setLoadingD] = useState(false);

    const deleteUser = async () => {
        setLoadingD(true);
        try {
            const res = await fetch(`/api/admin/delete-user/${selectedUser?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Delete failed');
            }

            toast.success('User deleted successfully');
            window.location.reload();
        } catch (error) {
            toast.error(`Delete error: ${error.message}`);
        }
        finally {
            setLoadingD(false);
        }
    };

    return { loadingD,deleteUser };
}



export default useDeleteUser