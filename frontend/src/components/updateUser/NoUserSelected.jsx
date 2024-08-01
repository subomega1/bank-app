import { GrUserAdmin } from "react-icons/gr";



function NoUserSelected() {
  
 
  
  return (
    
        <div className='flex items-center justify-center w-full h-full mt-auto'>
          <div className='px-4 text-center sm:text-lg md:text-xl text-success font-semibold flex flex-col items-center justify-center gap-2 h-screen '>
            <h1 className='text-3xl md:text-6xl text-center'>
              
              <span className='text-success'> Welcome 👋 Admin</span>
            </h1>
            <GrUserAdmin className='text-3xl md:text-6xl text-center' />
            
            
          </div>
        </div>
      );
    }
    


export default NoUserSelected