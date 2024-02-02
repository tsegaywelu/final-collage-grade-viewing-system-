import { useState } from "react";
import { useContextData } from "../context/provider";
import { useNavigate } from "react-router-dom";
import { fetchStudent, deleteStudent } from "../utils/backend.utils";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const searchList = ['id', 'name', 'school']
function Search() {
  const [data, setData] = useState([]);
  const { dispatch } = useContextData();
  const [searchparam, setsearchparam] = useState("");
  const [isSearching, setIsSearching] = useState(false)
  // const [searchBy, setSearchBy]= useState('id')
  // const handleSelectChange = (e)=>{
  //   e.preventDefault()
  //   setSearchBy(e.target.value)
  // }
  const navg = useNavigate();
  const editHandler = (student) => {
    dispatch({ type: "setEditMode", payload: student });
    navg("/admin/addoredit");
  };
  const deleteHandler = async (id) => {
    try {
      await deleteStudent(id);
      const filteredusers = data.filter((student) => student.id != id);
      setData(filteredusers);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault()
    if(isSearching || !searchparam) return
    setIsSearching(true)
    const toastID = toast.loading('Searching', {
      position: 'top-center'
    })
    try {
      const response = await fetchStudent(searchparam);
      const student = response.data;
      setData([student]); //they are equal setData(filteredusers);
      toast.done(toastID)
    } catch (error) {
      toast.update(toastID, {
        render: error.response.statusText,
        type: 'error',
        position: 'top-center',
        autoClose: 5000,
        isLoading: false
      })
    }
    setIsSearching(false)
  };

  /* useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetchAll();
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadStudents();
  }, []); */

  return (
    <div className="mt-3 md:mt-0">
      <ToastContainer></ToastContainer>
      <form className="flex relative rounded-md w-full px-4 max-w-xl mx-auto mb-4 print:hidden" onSubmit={searchHandler}>
        
          <input type="text" name="q" id="query" placeholder="Search Student"
              value={searchparam}
              onChange={(e) => setsearchparam(e.target.value)}
              className="w-full p-3 rounded-md border-2 border-r-white rounded-r-none border-gray-300 placeholder-gray-500 dark:placeholder-gray-300 dark:bg-gray-500dark:text-gray-300 dark:border-none print:hidden " />
          <button
              className="print:hidden inline-flex items-center gap-2 bg-teal-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md">
              search
          </button>
          {/*<select
            className="outline-none focus:outline-none p-2 bg-teal-100 rounded ml-2"
            value={searchBy}
            onChange={handleSelectChange}
          >
            {searchList.map((item, i) => (
              <option value={item} key={i}>
                  {item} 
              </option>
              
            ))}
        </select>*/}

      </form>
      
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
    <table className="w-full table-fixed">
        <thead>
            <tr className="bg-gray-100">
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">ID</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">School</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Average</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Percentile</th>
                <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white">
        {data?.map((student) => {
            return (student && 
              <tr key={student?.id}>
                <td className="py-4 px-6 border-b border-gray-200">{student?.id}</td>
                <td className="py-4 px-6 border-b border-gray-200">{student?.name} {student?.middlename} {student?.lastname}</td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{student.schoolname}</td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{student.average}</td>
                <td className="py-4 px-6 border-b border-gray-200">{student.percentile}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                    <button
                    className=" mr-3 text-yellow-600 hover:underline"
                    onClick={() => editHandler(student)}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => deleteHandler(student?.id)}
                    className=" text-red-600 hover:underline"
                  >
                    delete
                  </button>
                </td>
            </tr>
            );
          })}
            
        </tbody>
    </table>
</div>
    </div>
  );
}

export default Search;
