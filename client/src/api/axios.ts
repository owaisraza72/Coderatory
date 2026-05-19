import axios from "axios"  


const api = axios.create({
  baseURL: "http://localhost:3000/v1",
  withCredentials: true
})

export default api