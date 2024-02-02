import { useState } from "react";
import { fetchStudent } from "../utils/backend.utils";
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
    const [id, setid] = useState("");
    const [t, st] = useState({});
    const [error, setError] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    
    const handlechangeid = (e) => {
        setid(e.target.value);
    };
    const getresult = async(e) => {
    e.preventDefault();
    if(isSearching || !id) return
    setIsSearching(true)
    const toastID = toast.loading('Searching', {
        position: 'bottom-center',
    })
    
    try {
        const  response = await fetchStudent(id)
        toast.isActive 
        // if(!response.data) throw Error('Student not found')
        st(response.data)
        console.log(response.data)
        toast.done(toastID)
        setError(null)
    } catch (error) {
      // console.log("some thing wrong", error);
        if(error) {
            setError('Student not found')
        } else {
        setError(error.message)
        }
        toast.update(toastID, {
            render: error.response.statusText,
            type: 'error',
            position: 'bottom-center',
            autoClose: 5000,
            isLoading: false
        })
    }
    setIsSearching(false)
  };

  return (
    <div className="flex flex-col h-full shadow-lg my-3 p-2  ">
      <ToastContainer></ToastContainer>
      <form className="flex relative rounded-md w-full px-4 max-w-xl mx-auto mb-4 print:hidden" onSubmit={getresult}>
          <input type="number" name="q" id="query" placeholder="Insert your ID Number"
              value={id}
              onChange={handlechangeid}
              className="w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none " />
          <button
              className="inline-flex items-center gap-2 bg-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md">
              <span>search</span>
              <span className="hidden md:block">
                  
              </span>
          </button>

      </form>

      {error? (<p className=" mt-6 mx-auto text-xl text-red-700 font-semibold">{error}</p>) : ( t.result && 
      <div className="bg-white mx-auto w-10/12 shadow overflow-auto sm:rounded-lg text-center print:mt-24">
        <div className=" flex">
        <div className="flex justify-center items-center flex-1">
            <img className=" h-16" src={t.gender === 'male' ? '/src/assets/boy_img.png' : '/src/assets/girl_img.png'} alt="profile_pic" />
            <div className="px-4 py-5  ">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {t.name} {t.middlename} {t.lastname} 
                </h3>
                <p className="mt-1 max-w-2xl text-sm print:text-lg text-left text-gray-500">
                    School: {t.schoolname}
                </p>
            </div>
        </div>
        <button onClick={window.print}
            className="btn bg-teal-500 hover:bg-teal-600 active:scale-95 self-center px-8 py-1 rounded text-white md:mr-24 print:hidden">Print</button>
        </div>
          <div className="border-t border-gray-200 flex flex-col md:flex-row !w-10/12 mx-auto overflow-auto">
              <dl className=" mx-2 px-2 py-4">
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          English
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                          {t.result.english}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Maths
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.result.maths}
                      </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Biology
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.result.biology}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Chemistry
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.result.chemistry}
                      </dd>
                  </div>
                </dl>
                <dl className=" mx-2 px-2 py-4">
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Physics
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.result.physics}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Civic
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.result.civic}
                      </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Geography
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.result.geography}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Tigrigna
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.result.tigrigna}
                      </dd>
                  </div>
                  
              </dl>
              <dl className=" mx-2 px-2 py-4">
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between border-b-2 mb-2">
                      <dt className="text-sm print:text-lg text-left font-medium text-gray-500">
                          Amahric
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                        {t.result.amharic}
                      </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left text-left font-bold text-gray-900">
                          Total
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.total}
                      </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left text-left font-bold text-gray-900">
                          Average
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.average}
                      </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 print:flex print:justify-between">
                      <dt className="text-sm print:text-lg text-left text-left font-bold text-gray-900">
                          Percentile
                      </dt>
                      <dd className="mt-1 text-sm print:text-lg text-left print:text-right text-gray-900 sm:mt-0 sm:col-span-2">
                      {t.percentile}
                      </dd>
                  </div>
                  
              </dl>
          </div>
    </div>)}
    </div>
  );
};

export default Home;
