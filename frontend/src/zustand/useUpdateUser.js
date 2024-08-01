import { create } from 'zustand';

// Create a zustand store for managing user information and selection
const useUpdateUser = create((set) => ({
    // State to store the currently selected user
    selectedUser: null,
    
    // Function to set the selected user
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    // State to store information of a user
    userInformation: {},

    // Function to set the information of a user
    setUserInformation: (userInformation) => set({ userInformation }),
}));

export default useUpdateUser;
