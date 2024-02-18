import {  useState } from 'react'
import { login } from '../utils/backend.utils'
import { Link, useNavigate } from 'react-router-dom'
import { useContextData } from '../context/provider'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigate()
    const { dispatch} = useContextData()
    const [isLogging, setIsLogging] = useState(false)

    const submitHandler = async (e)=>{
        e.preventDefault()
        if(isLogging || !(username && password)) return
        console.log('loging in')
        const toastID = toast.loading('Trying to login', {
            position: "top-center"
        })
        setIsLogging(true)
        try {
            const response  = await login(username, password)
            localStorage.setItem('token', response.data.token)
            toast.done(toastID)
            dispatch({type: 'login'})
            navigation('/admin')
            setIsLogging(false)
        } catch (error) {
            // toast.done(toastID)
            // toast(error.response.statusText, {
            //     type: 'error',
            //     position: "top-center"
            // })
            toast.update(toastID, {
                render: error,
                type: 'error',
                autoClose: 3000,
                isLoading: false,
            })
            setIsLogging(false)
            // alert(error.response.statusText)
        }
    }

    return (
        <div className="h-screen bg-teal-50 py-20 p-4 md:p-20 lg:p-12 flex flex-col items-center ">
            <ToastContainer></ToastContainer>
            <div className="max-w-sm border rounded-lg overflow-hidden shadow-lg mx-auto w-10/12 md:w-6/12">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                    <p className="text-gray-700 mb-6">Please sign in to your account</p>
                    <form >
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                    Username
                </label>
                            <input 
                                value={username} onChange={(e)=>setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                    Password
                </label>
                            <input 
                                value={password} onChange={(e)=>setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <button  
                            className="bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    <Link to={'/admin'}>Log In</Link>
                </button>
                            <a className="inline-block align-baseline font-bold text-sm text-teal-700 hover:text-teal-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
