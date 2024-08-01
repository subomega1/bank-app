import Header from '../components/Header';
import CopyRight from '../components/CopyRight';
import useVerifierOtp from '../hooks/useVerifierOtp'; // Import the custom hook

function Otpverifier() {
  const { otp, setOtp, seconds, minutes, handleVerify } = useVerifierOtp(); // Destructure from the custom hook

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 flex justify-center items-center">
        <div className="flex flex-col items-start justify-start min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-black">
              <span className="text-success">AmenBank</span>
            </h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleVerify(); // Call the verification function on form submission
            }}>
              <div className="mb-3">
                <label className="label p-2">
                  <span className="text-base label-text pl-5">The OTP has been sent to your email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="input input-bordered input-success w-full max-w-xs"
                  value={otp} // Controlled input
                  onChange={(e) => setOtp(e.target.value)} // Update OTP state
                />
              </div>
              <div className="mb-3">
                <p className="text-center text-gray-700">
                  {`Time remaining: ${minutes}m ${seconds}s`}
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-outline btn-success w-full"
                  disabled={minutes === 0 && seconds === 0} // Disable if time is up
                >
                  Verify OTP
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

export default Otpverifier;
