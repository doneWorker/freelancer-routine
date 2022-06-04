import axios from 'axios'

import { Comment } from 'models/Comment'
import { API_URL, ListResponse, responseIsSuccess } from './common'

export const fetchTaskComments = async (
  id: string,
): Promise<ListResponse<Comment>> => {
  const url = `${API_URL}/task/${id}/comments`
  const resp = await axios.get(url)

  return responseIsSuccess(resp) ? resp.data : null
}

export const submitComment = async (id: string, text: string): Promise<Comment> => {
  const url = `${API_URL}/task/${id}/comment`
  const resp = await axios.post(url, { text })

  return responseIsSuccess(resp) ? resp.data : null
}
