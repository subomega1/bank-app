import { useState } from "react";
import Header from "../components/Header";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../context/AuthContext";
import useSendMoney from "../hooks/useSendMonney";

function User() {
  // State to manage form visibility and input values
  const { loading, handleLogout } = useLogout(); // Ensure `logout` function is available
  const { authUser } = useAuthContext();
  const [showForm, setShowForm] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { loadingM, sendMoney } = useSendMoney();

  // Handle showing/hiding the form
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Handle input changes
  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow positive numbers or zero
    if (!value || parseFloat(value) >= 0) {
      setAmount(value);
    }
  };

  // Check if the entered amount exceeds the current balance
  const isAmountExceeding = () => {
    const amountValue = parseFloat(amount) || 0;
    return amountValue > parseFloat(authUser.userBalance);
  };

  // Calculate balance after transaction
  const calculateBalanceAfterTransaction = () => {
    const amountValue = parseFloat(amount) || 0;
    return (parseFloat(authUser.userBalance) - amountValue).toFixed(2);
  };

  // Handle send money form submission
  const handleSendMoney = async (e) => {
    e.preventDefault();

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    await sendMoney(recipient, amountValue);
    toggleForm();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 flex justify-center items-center">
        <div className="flex flex-col items-start justify-start w-full mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-black">
              Welcome
              <span className="text-success"> {authUser.fullName}</span>
            </h1>
            <div className="flex flex-col w-full mt-5">
              <div className="flex justify-between">
                <p className="text-2xl font-semibold text-center text-success">
                  Username
                </p>
                <p className="text-2xl font-semibold text-center text-success">
                  FullName
                </p>
                <p className="text-2xl font-semibold text-center text-success">
                  Currency
                </p>
                <p className="text-2xl font-semibold text-center text-success">
                  Balance
                </p>
              </div>
            </div>
            <div className="divider my-1 py-2"></div>
            <div className="flex justify-between mt-5">
              <p className="text-2xl font-semibold text-center text-black">
                {authUser.username} {/* Display logged-in user's username */}
              </p>
              <p className="text-2xl font-semibold text-center text-black">
                {authUser.fullName} {/* Display logged-in user's full name */}
              </p>
              <p className="text-2xl font-semibold text-center text-black">DT</p>
              <p className="text-2xl font-semibold text-center text-black">
                {authUser.userBalance}
              </p>
            </div>
            <div className="flex justify-center items-center mt-8">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <BiLogOut
                  className="w-6 h-6 text-success cursor-pointer"
                  onClick={handleLogout}
                  aria-label="Logout"
                />
              )}
              <button
                className="btn btn-outline btn-success ml-auto"
                onClick={toggleForm}
              >
                Send Money
              </button>
            </div>

            {/* Form for sending money */}
            {showForm && (
              <form
                className="mt-8 p-4 border border-gray-300 rounded-lg"
                onSubmit={handleSendMoney}
              >
                <h2 className="text-xl font-semibold mb-4">Send Money</h2>
                <div className="mb-4">
                  <label className="block text-base font-medium mb-2">To</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={recipient}
                    onChange={handleRecipientChange}
                    placeholder="Recipient username"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-base font-medium mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    step="0.01" // Allows two decimal places
                    className="input input-bordered w-full"
                    value={amount}
                    min={0}
                    onChange={handleAmountChange}
                    placeholder="Amount to send"
                  />
                  <p
                    className={`text-sm mt-1 ${
                      isAmountExceeding() ? "text-error" : "text-gray-500"
                    }`}
                  >
                    {isAmountExceeding()
                      ? "Not enough money"
                      : `Balance after transaction: ${calculateBalanceAfterTransaction()}`}
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline btn-success w-full"
                  disabled={isAmountExceeding() || !recipient || !amount}
                >
                  {loadingM ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Send Money"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
