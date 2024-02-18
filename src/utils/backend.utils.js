import axios from "axios";

// const URL = "http://localhost:2300"
 const URL = "http://localhost:2300"

const API_SERVICE = axios.create({
    baseURL: URL,
    timeout: 5000,
})

 export const login = (email, password)=>{
    return API_SERVICE.post('/admin/login', {email, password})
}  



export const createStudent = (student)=>{
    const token = localStorage.getItem('token')
    return API_SERVICE.post('/create', {student}, {
        headers: {
            authtoken: `bearer ${token}`
        }
    })
}

export const updateStudent = (student)=>{
    const token = localStorage.getItem('token')
    return API_SERVICE.put(`/update/${student.id}`, student, {
        headers: {
            authtoken: `bearer ${token}`
        }
    })
}

export const deleteStudent = (id)=>{
    const token = localStorage.getItem('token')
    return API_SERVICE.delete(`/del/${id}`, {
        headers: {
            authtoken: `bearer ${token}`
        }
    })
}

export const upload = (formData)=>{
    const token = localStorage.getItem('token')
    console.log(token)
    return API_SERVICE.post('/uploads', formData, {
        headers: {
            authToken: `bearer ${token}`
        },
        timeout: 30000
    })
}

export const fetchStudent = (id)=>{
    // const token = localStorage.getItem('token')
    return API_SERVICE.get(`/single/${id}`, {
        // headers: {
        //     authtoken: `bearer ${token}`
        // }
    })
}

export const searchStudent = (searchTerm, searchBy)=>{
    const token = localStorage.getItem('token')
    return API_SERVICE.get(`/admin/getstudent/${searchTerm}`, {
        params:{
            searchBy: searchBy
        },
        headers: {
            authtoken: `bearer ${token}`
        }
    })
}
export const sendContact=(contact)=>{
    return API_SERVICE.post("/contact",contact)
}
export const getEvents=()=>{
    return API_SERVICE.get('/admin/getevents')
}

export const fetchDashboard=()=>{
    const token = localStorage.getItem('token')
    return API_SERVICE.get('/dashboard', {
        headers: {
            authtoken: `bearer ${token}`
        }
    })
}