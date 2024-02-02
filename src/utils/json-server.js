import axios from "axios";

const URL = "http://localhost:3000"

const JSON_API = axios.create({
    baseURL: URL,
})

export const fetchAll = ()=>{
    return JSON_API.get('/students')
} 

export const updateStudent = (student)=>{
    return JSON_API.put(`/students/${student.id}`,student)
}
export const registerStudent = (student)=>{
    return JSON_API.post("/students",student)
}
export const deleteStudent = (id)=>{
    return JSON_API.delete(`/students/${id}`)
}
export const searchStudent = (id)=>{
    return JSON_API.get(`/students/${id}`)
}

