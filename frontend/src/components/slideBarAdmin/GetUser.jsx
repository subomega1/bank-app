import  { useState } from 'react';



function GetUser() {
  // State to track if the div is clicked
  const [isClicked, setIsClicked] = useState(false);

  // Function to toggle the isClicked state
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

   return (
    <>
      <div
        className={`flex gap-2 items-center cursor-pointer  ${isClicked ? 'bg-success' : 'hover:bg-success'}`}
        onClick={handleClick}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src="/public/avatar.png" alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-black pl-2">test </p>
          </div>
        </div>
          
      </div>
      <div className="divider my-0 py-2 h-1" />
    </>
  );
}

export default GetUser;
