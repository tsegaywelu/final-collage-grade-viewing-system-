import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const AdminPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const [file, setFile] = useState();
  const fr = useRef();
  useEffect(()=>{
    const authToken = localStorage.getItem('token')
    if(!authToken) {                                    
        navigate('/login')
    }
  }, []) 
  return (
    <section className=" w-full mt-12 ">
      {/* <nav className="w-full flex space-x-3 justify-end items-center pr-3">
        <a
          href="#"
          className={`${pathname.includes("addoredit") ? "hidden" : ""}`}
        >
          register
        </a>
        <a href="#" className={`${pathname == "/admin" ? "hidden" : ""}`}>
          search
        </a>
      </nav> */}
      {/* <form action="" className="">
        <input
          type="file"
          className=""
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
      </form> */}
      <Outlet />
    </section>
  );
};

export default AdminPage;
