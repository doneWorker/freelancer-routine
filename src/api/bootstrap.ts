import axios from 'axios'

import { ACCESS_TOKEN_KEY } from './common'

const bootstrapApi = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    ACCESS_TOKEN_KEY,
  )}`
}

export default bootstrapApi
