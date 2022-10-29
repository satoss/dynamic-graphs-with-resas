import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
  headers: {
    'X-API-KEY': import.meta.env.VITE_API_KEY,
  },
  timeout: 2000,
})

// api.interceptors.response.use(
//   async (response) => {
//     return await Promise.resolve(response)
//   },
//   async (error) => {
//     // eslint-disable-next-line
//     return await Promise.reject({
//       error: error.response,
//     })
//   }
// )
