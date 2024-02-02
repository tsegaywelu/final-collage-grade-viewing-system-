import { useEffect, useState } from "react";
import { useContextData } from "../context/provider";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createStudent, updateStudent } from "../utils/backend.utils";

function EditOrAdd() {
  const { data } = useContextData();
  const { isAddMode, EditUser } = data;
  const [isSaving, setIsSaving] = useState(false)
  const [student, setStudent] = useState(
    !isAddMode
      ? EditUser
      : {
          name: "",
          middlename: "",
          lastname: "",
          age: "",
          id: "",
          schoolId: "",
          schoolname: "",
          result: {
            english: 0,
            maths: 0,
            biology: 0,
            tigrigna: 0,
            amharic: 0,
            chemistry: 0,
            physics: 0,
            civic: 0,
            geography: 0,
          },
        }
  );
  useEffect(() => {
    if (EditUser) setStudent(EditUser);
  }, [EditUser]);
  console.log(student)
  const changeHandler = (e) => {
    if (Object.keys(student.result).includes(e.target.name)) {
      setStudent({
        ...student,
        result: { ...student.result, [e.target.name]: e.target.value },
      });
      return;
    }
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(isSaving ) return
    setIsSaving(true)
    const toastID = toast.loading('Uploading...', {
    position: 'bottom-right'
    })
    try {
      console.log('updating')
      if(isAddMode){
        await createStudent(student)
      }else{
        await updateStudent(student)
      }
      toast.update(toastID, {
        render: 'Successfully, Saved.',
        type: 'success',
        position: 'bottom-right',
        autoClose: 5000,
        isLoading: false
    })
    } catch (error) {
      toast.update(toastID, {
        render: error.response.statusText,
        type: 'error',
        position: 'bottom-right',
        autoClose: 5000,
        isLoading: false
    })
    }
    setIsSaving(false)
  };


  return (
    <div className=" ">
          <div className=" px-8">
      <div className=" px-8 text-black text-xl font-bold border-b border-grey-500 text-center mx-auto">Student Application
                </div>

                <form onSubmit={submitHandler} className="  !max-lg:h-[80vh] overflow-auto max-xl:pb-32 flex flex-col  gap-2 mb-4 md:mb-0 py-8 " name="student_application" id="student_application" action="">
                        {/* LKSDJFLKSJLKDSJLKSDJFLKSJFLKDSJFS */}
                        <div className=" flex flex-col md:flex-row gap-x-40 mb-4 md:mb-0 w-full mx-auto  justify-center">
                        <div>
                          <div className="mb-4">
                              <label className="block text-grey-darker text-sm font-bold mb-2">Student ID:</label>
                              <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                  name="id" id="student_id" value={student.id} placeholder="Enter Your ID"
                                  onChange={changeHandler}/>
                                  
                          </div>

                          <div className="mb-4">
                              <label className="block text-grey-darker text-sm font-bold mb-2">Student Name</label>
                              <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                  name="name" id="student_name" value={student.name} placeholder="Enter Your Name"
                                  onChange={changeHandler}/>
                          </div>

                          <div className="mb-4">
                              <label className="block text-grey-darker text-sm font-bold mb-2">Father &apos;s Name</label>
                              <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                  name="middlename" id="student_name" value={student.middlename} placeholder="Enter Your Name"
                                  onChange={changeHandler}/>
                          </div>

                          <div className="mb-4">
                              <label className="block text-grey-darker text-sm font-bold mb-2">Grand Father &apos;s Name</label>
                              <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                  name="lastname" id="student_name" value={student.lastname} placeholder="Enter Your Name"
                                  onChange={changeHandler}/>
                          </div>

                          <div className="mb-4">
                              <label className="block text-grey-darker text-sm font-bold mb-2">School Name:</label>
                              <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text" onChange={changeHandler}
                                  name="schoolname" id="school_name" value={student.schoolname} placeholder="Enter School Name"/>
                              <p id="error_creater_id"></p>
                          </div>

                              <div className="mb-4">
                              <label className="block text-grey-darker text-sm font-bold mb-2">School ID:</label>
                              <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text" onChange={changeHandler}
                                  name="schoolId" id="addmission_date" value={student.schoolId} placeholder="Enter School ID"/>
                              <p id="error_intake_year"></p>
                          </div>
                        </div>
                        
          <div className="flex flex-col gap-y-1">
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Tigrigna:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker "
                  placeholder="tigrigna "
                  type="number"
                  min={0}
                  max={100}
                  name="tigrigna"
                  value={student.result.tigrigna}
                  id=""
                  onChange={changeHandler}
                />
                <p id="error_intake_year"></p>
            </div>
            

            <div className="mb-4 ">
                <label className="block text-grey-darker text-sm font-bold mb-2">Amharic:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="amharic"
                  value={student.result.amharic}
                  id=""
                  placeholder="amarigna"
                  onChange={changeHandler}
                />

                <p id="error_intake_year"></p>
            </div>
            
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">English:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="english"
                  value={student.result.english}
                  id=""
                  placeholder="english"
                  onChange={changeHandler}
                />

                <p id="error_intake_year"></p>
            </div>
            
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Maths:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="maths"
                  value={student.result.maths}
                  placeholder="maths"
                  id=""
                  onChange={changeHandler}
                />
                <p id="error_intake_year"></p>
            </div>
            

          <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Biology:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  placeholder="biology"
                  name="biology"
                  value={student.result.biology}
                  id=""
                  onChange={changeHandler}
                />
                <p id="error_intake_year"></p>
            </div>
            
          <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Physics:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="physics"
                  value={student.result.physics}
                  id=""
                  placeholder="physics"
                  onChange={changeHandler}
                />
                <p id="error_intake_year"></p>
            </div>

          </div>

            
          <div className="flex flex-col gap-y-1">

            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Chemistry:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="chemistry"
                  value={student.result.chemistry}
                  placeholder="chemistry"
                  id=""
                  onChange={changeHandler}
                />
                <p id="error_intake_year"></p>
            </div>
            

            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Geography:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="geography"
                  value={student.result.geography}
                  placeholder="geography"
                  id=""
                  onChange={changeHandler}
                />

                <p id="error_intake_year"></p>
            </div>
            
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Civic:</label>
                <input
              className="border rounded w-full py-2 px-3 text-grey-darker"
              type="number"
              name="civic"
              value={student.result.civic}
              placeholder="civic"
              id=""
              onChange={changeHandler}
            />
                <p id="error_intake_year"></p>
            </div>
           {/* <label className=" mt-5"htmlFor="studentphoto"></label> */}

            {/* <input type="file" id="studentphoto"  />  upload student photo */}
          <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Total:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="total"
                  value={student.total}
                  id="total"
                  placeholder="total"
                  onChange={changeHandler}
                />
                <p id="error_intake_total"></p>
            </div>

            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Average:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="average"
                  value={student.average}
                  id=""
                  placeholder="average"
                  onChange={changeHandler}
                />
                <p id="error_intake_percentile"></p>
            </div>

            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Percentile:</label>
                <input
                  className="border rounded w-full py-2 px-3 text-grey-darker"
                  type="number"
                  name="percentile"
                  value={student.percentile}
                  id=""
                  placeholder="percentile"
                  onChange={changeHandler}
                />
                <p id="error_intake_percentile"></p>
            </div>
          </div>
        </div>
        <div className="mb-4 mx-auto">
                    <button
                        className="mb-2 mx-auto rounded-full py-1 px-24 bg-gradient-to-r from-green-400 to-blue-500 ">
                        {isAddMode? 'Add': 'Update'}
                    </button>
                        </div>
                </form>
                    </div>
        <ToastContainer></ToastContainer>
    </div>
  );
}

export default EditOrAdd;
