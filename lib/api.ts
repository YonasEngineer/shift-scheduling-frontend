import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// export const loginUser = async (
//   email: string,
//   password: string,
//   accessMode: string,
//   endPoint: string,
// ) => {
//   const response = await API.post(`${endPoint}`, {
//     email,
//     password,
//     accessMode,
//   });
//   return response.data; // e.g., { token, user }
// };
