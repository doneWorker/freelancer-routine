import axios from 'axios'

import { Task } from 'models/Task'
import { ListResponse, responseIsSuccess } from './common'

const API_URL = 'http://localhost:5000'

export const getTaskById = async (id: string) => {
  const url = `${API_URL}/task/${id}`
  const res = await axios.get(url)

  return res
}

export const fetchTasksByProjectId = async (
  id: string,
): Promise<ListResponse<Task>> => {
  const url = `${API_URL}/project/${id}/tasks`
  const resp = await axios.get(url)

  return responseIsSuccess(resp) ? resp.data : null
}

// export const fetchTasks = async = async =

export const completeTask = async (id: string) => {
  const url = `${API_URL}/task/${id}/complete`
  const res = await axios.post(url)

  return res
}
