import axios from "axios";

// export const API_URL = 'http://localhost:3000'
export const API_URL = 'https://nameless-wildwood-04003-8f80ca6edf3a.herokuapp.com'

export const getMessages = (name) => axios.get(`${API_URL}/messages`)