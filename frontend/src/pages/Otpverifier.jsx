import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CopyRight from '../components/CopyRight';

function Otpverifier() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(true); // Automatically start the timer on mount
  }, []);

  useEffect(() => {
    let myInterval;

    if (isDisabled) {
      myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [seconds, minutes, isDisabled]);

  const startTimer = () => {
    setIsDisabled(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4 flex justify-center items-center">
        <div className="flex flex-col items-start justify-start min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-semibold text-center text-black">
              <span className="text-success">AmenBank</span>
            </h1>
            <form>
              <div className="mb-3">
                <label className="label p-2">
                  <span className="text-base label-text pl-5">The OTP has been sent to your email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="input input-bordered input-success w-full max-w-xs"
                />
              </div>
              <div className="mb-3">
                <p className="text-center text-gray-700">
                  {`Time remaining: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                </p>
              </div>
              <div>
                <button
                  className="btn btn-outline btn-success w-full"
                  disabled={isDisabled}
                  onClick={startTimer}
                >
                  {'Login'}
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
