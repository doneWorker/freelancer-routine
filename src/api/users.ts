import axios from 'axios'

import { User } from 'models/User'
import { API_URL, ListResponse, responseIsSuccess } from './common'

export const fetchSuggestions = async (
  searchTerm: string,
): Promise<ListResponse<Partial<User>>> => {
  const url = `${API_URL}/users/suggestion?term=${searchTerm}`
  const resp = await axios.get(url)

  return responseIsSuccess(resp) ? resp.data : null
}

export const addUserToTeam = () => {}
