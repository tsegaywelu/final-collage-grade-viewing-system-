import { useState } from "react";
import { useContextData } from "../context/provider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  min-width: 20rem;
  height: fit-content;
  min-height: 12rem;
  padding-left:  20px ;
  padding-right: 20px ;
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
`

function Header() {
  const location = useLocation()
  const { data, dispatch } = useContextData();
  const navigate = useNavigate()
  const [hideMenu, setHideMenu] = useState(true)
  const toggleMenu = ()=>{
    setHideMenu(!hideMenu)
  }
  
  const logoutHandler = ()=>{
    localStorage.removeItem('token')
    dispatch({type: 'logout'})
    toggleModal()
    navigate('/login')
  }

  const [isOpen, setIsOpen] = useState(false)

  function toggleModal() {
    setIsOpen(!isOpen)
  }
  // src/assets/tbe.png

  return (
    <header className="print:hidden lg:px-16 px-4 bg-teal-50 flex flex-wrap items-center  shadow-md">
    <div className="flex-1 flex justify-between items-center">
        <Link to={data.logged ? '/admin' : '/'} className=" "><img style={{
          height: '80px'
        }} src={`${ "/src/assets/tbe.png" || " https://www.tigrayeducation.org/wp-content/uploads/2023/06/treb-logo.png"}`}   alt="TEB LOGO" /></Link>
    </div>

    <label htmlFor="menu-toggle" className=" cursor-pointer md:hidden block" onClick={toggleMenu}>
      <svg className="fill-current text-gray-900"
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <title>menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg>
    </label>
    <input className="hidden" type="checkbox" id="menu-toggle" />

    <div className={`${hideMenu && 'hidden'} md:flex md:items-center md:w-auto w-full print:hidden`} id="menu">
        <nav>
            <ul className="print:hidden md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <div className="print:hidden flex flex-col md:flex-row md:gap-2">
                  <li><Link to="/events" className={`print:hidden md:w-24 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded ${(location.pathname==='/events') && 'font-bold bg-gray-200'}`}>Events</Link></li>
                {!data.logged && <li><Link to="/" className={` md:w-28 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded ${(location.pathname==='/') && 'font-bold bg-gray-200'}`} >My Result</Link></li>}
                {data.logged && <li><Link to="/admin" className={` md:w-24 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded ${(location.pathname==='/admin') && 'font-bold bg-gray-200'}`} >Dashboard</Link></li>}
                {data.logged && <li><Link to="/admin/search" className={` md:w-24 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded ${(location.pathname==='/admin/search') && 'font-bold bg-gray-200'}`} >Search</Link></li>}
                  {data.logged && <li><Link to="/admin/addoredit" className={` md:w-20 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded ${(location.pathname==='/admin/addoredit') && 'font-bold bg-gray-200'}`} >Add</Link></li>}
                  {data.logged && <li><Link to="/admin/upload" className={` md:w-20 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded mr-2 ${(location.pathname==='/admin/upload') && 'font-bold bg-gray-200'}`} >Upload</Link></li>}
                  {!data.logged && <li><Link to="/about" className={` md:w-32 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded ${(location.pathname==='/about') && 'font-bold bg-gray-200'}`}>About Us</Link></li>}
                  {!data.logged && <li><Link to="/contact" className={` md:w-32 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded mr-2 ${(location.pathname==='/contact') && 'font-bold bg-gray-200'} md:mb-0 mb-2`}>Contact Us</Link></li>}
                </div>
                <div>

                  {data.logged && <li><button onClick={toggleModal} className={` md:w-32 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded  md:mb-0 mb-2`}>Logout</button></li>}
                  {!data.logged && <li><Link to="/login" className={`print:hidden md:w-20 md:p-4 py-3 md:px-0 md:text-center block hover:font-bold hover:bg-gray-100 px-4 rounded ${(location.pathname==='/login') && 'font-bold bg-gray-200'}`} >Login</Link></li>}
                </div>
            </ul>
        </nav>
    </div>

    <div>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}>
        <div className=" w-full h-full  flex flex-col items-center justify-center gap-4">
          <span className="font-semibold text-2xl">Do you want to logout of the system !!</span>
          <div className="w-full flex justify-around">
            <button className="btn bg-teal-500 py-2 px-4 rounded font-semibold text-white w-24" onClick={toggleModal}>Cancel</button>
            <button className="btn bg-red-500 py-2 px-4 rounded font-semibold text-white w-24" onClick={logoutHandler}>Ok</button>
          </div>
        </div>
      </StyledModal>
    </div>
</header>
  );
}

export default Header;
