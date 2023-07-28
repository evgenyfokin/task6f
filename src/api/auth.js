import axios from "axios";

// export const API_URL = 'http://localhost:3000'
export const API_URL = 'http://localhost:3000'

export const getMessages = (name) => axios.get(`${API_URL}/messages`)