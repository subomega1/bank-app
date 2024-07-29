import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
function LogoutBt() {
  return (
    <div className='mt-auto  flex flex-between items-center'>
      <BiLogOut className='w-6 h-6 text-success cursor-pointer'  />
      <Link to="/admin/adduser" className='btn btn-outline btn-success ml-auto'> AddUser</Link>
    {/*<span className='loading loading-spinner'></span>*/}
    </div>
  )
}

export default LogoutBt