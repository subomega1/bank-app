import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

function LogoutBt() {
  const { loading, handleLogout } = useLogout();

  return (
    <div className='mt-auto flex justify-between items-center'>
      <div 
        className='flex items-center'
        aria-label="Logout"
      >
        {loading ? (
          <span className='loading loading-spinner'></span>
        ) : (
          <BiLogOut 
            className='w-6 h-6 text-success cursor-pointer'
            onClick={handleLogout} 
            aria-label="Logout"
          />
        )}
      </div>
      <Link 
        to="/admin/adduser" 
        className='btn btn-outline btn-success ml-auto'
        aria-label="Add User"
      >
        Add User
      </Link>
    </div>
  );
}

export default LogoutBt;
