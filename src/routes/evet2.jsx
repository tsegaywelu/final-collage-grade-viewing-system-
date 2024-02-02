
const Event2 = () => {
  return (
<div className='flex flex-col gap-3'>
    <div className="relative border border-gray-200 rounded-lg shadow-lg">
      <button onClick='return this.parentNode.remove()'
        className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    
      <div className="flex items-center p-4 ">
        <img
          className="object-cover w-12 h-12 rounded-lg"
          src="https://randomuser.me/api/portraits/women/71.jpg"
          alt=""
        />
    
        <div className="ml-3 overflow-hidden">
          <p className="font-medium text-gray-900">Jan Doe</p>
          <p className="max-w-xs text-sm text-gray-500 truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
            laborum?
          </p>
        </div>
      </div>
    </div>
    <div className="relative border border-gray-200 rounded-lg shadow-lg">
      <button onClick='return this.parentNode.remove()'
        className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    
      <div className="flex items-center p-4">
        <img
          className="object-cover w-12 h-12 rounded-lg"
          src="https://randomuser.me/api/portraits/men/71.jpg"
          alt=""
        />
    
        <div className="ml-3 overflow-hidden">
          <p className="font-medium text-gray-900">John Doe</p>
          <p className="max-w-xs text-sm text-gray-500 truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
            laborum?
          </p>
        </div>
      </div>
    </div>
    <div className="relative border border-gray-200 rounded-lg shadow-lg">
      <button onClick='return this.parentNode.remove()'
        className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    
      <div className="flex items-center p-4">
        <img
          className="object-cover w-12 h-12 rounded-lg"
          src="https://randomuser.me/api/portraits/men/5.jpg"
          alt=""
        />
    
        <div className="ml-3 overflow-hidden">
          <p className="font-medium text-gray-900">Mike Doe</p>
          <p className="max-w-xs text-sm text-gray-500 truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
            laborum?
          </p>
        </div>
      </div>
    </div>


</div>
  )
}

export default Event2
