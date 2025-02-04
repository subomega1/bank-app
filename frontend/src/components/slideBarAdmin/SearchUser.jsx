import { IoSearchSharp } from 'react-icons/io5';
function SearchUser() {
  return (
    <form  className='flex items-center gap-2'>
      <input
        type="text"
        placeholder='Search'
        className='input input-bordered rounded-full'
      />
      <button type='submit' className='btn btn-circle bg-success text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
    
  )
}

export default SearchUser