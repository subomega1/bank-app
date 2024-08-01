import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

function useSendMoney() {
  const { authUser, setAuthUser } = useAuthContext(); // Ensure setAuthUser is available to update context
  const [loadingM, setLoadingM] = useState(false);

  const sendMoney = async (recipient, amount) => {
    setLoadingM(true);
    try {
      // Check for empty recipient or amount
      if (!recipient || amount <= 0) {
        throw new Error("Recipient and amount must be specified");
      }

      const res = await fetch(`api/payment/${authUser.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverUsername: recipient, amount }),
      });

      if (!res.ok) {
        // Extract error message from response
        const errorData = await res.json();
        throw new Error(errorData.error || "Send failed");
      }

      const data = await res.json();

      // Use senderNewBalance from the response
      const newBalance = data.senderNewBalance;

      // Update local storage
      const updatedUser = { ...authUser, userBalance: newBalance.toFixed(2) };
      localStorage.setItem("authUser", JSON.stringify(updatedUser));

      // Update context
      setAuthUser(updatedUser);

      toast.success("Money sent successfully");
    } catch (error) {
      // Handle errors gracefully
      toast.error(`Send error: ${error.message}`);
    } finally {
      // Ensure loading state is reset
      setLoadingM(false);
    }
  };

  return { loadingM, sendMoney };
}

export default useSendMoney;
