import { useState } from "react";
import Header from "../components/Header";

function User() {
  // State to manage form visibility and input values
  const [showForm, setShowForm] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(100); // User's current balance

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
    return parseFloat(amount) > balance;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 flex justify-center items-center">
        <div className="flex flex-col items-start justify-start w-full mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-black">
              Welcome
              <span className="text-success"> User</span>
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
                user
              </p>
              <p className="text-2xl font-semibold text-center text-black">
                user
              </p>
              <p className="text-2xl font-semibold text-center text-black">DT</p>
              <p className="text-2xl font-semibold text-center text-black">
                {balance.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="btn btn-outline btn-success ml-auto"
                onClick={toggleForm}
              >
                Send Money
              </button>
            </div>

            {/* Form for sending money */}
            {showForm && (
              <div className="mt-8 p-4 border border-gray-300 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Send Money</h2>
                <div className="mb-4">
                  <label className="block text-base font-medium mb-2">
                    To
                  </label>
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
                      ? "No enough money"
                      : `Balance after transaction: ${(balance - amount).toFixed(
                          2
                        )}`}
                  </p>
                </div>
                <button
                  className="btn btn-outline btn-success w-full"
                  disabled={isAmountExceeding() || !recipient || !amount}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
