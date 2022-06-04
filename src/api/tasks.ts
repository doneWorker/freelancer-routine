import axios from 'axios'

import { Task } from 'models/Task'
import { Comment } from 'models/Comment'
import { API_URL, ListResponse, responseIsSuccess } from './common'

/*
 * Tasks
 */
export const getTaskById = async (id: string) => {
  const url = `${API_URL}/task/${id}`
  const resp = await axios.get(url)

  return responseIsSuccess(resp) ? resp.data : null
}

export const createTask = async (
  projectId: string,
  name: string,
): Promise<Task | null> => {
  const url = `${API_URL}/task`
  const resp = await axios.post(url, { project_id: projectId, name })

  return responseIsSuccess(resp) ? (resp.data.task as Task) : null
}

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>,
): Promise<Task | null> => {
  const url = `${API_URL}/task/${taskId}`
  const resp = await axios.put(url, updates)

  return responseIsSuccess(resp) ? (resp.data.task as Task) : null
}

export const fetchTasksByProjectId = async (
  id: string,
): Promise<ListResponse<Task>> => {
  const url = `${API_URL}/project/${id}/tasks`
  const resp = await axios.get(url)

  return responseIsSuccess(resp) ? resp.data : null
}

export const completeTask = async (id: string) => {
  const url = `${API_URL}/task/${id}/complete`
  const resp = await axios.post(url)

  return resp
}

/*
 * Comments
 */
export const fetchTaskComments = async (
  id: string,
): Promise<ListResponse<Comment>> => {
  const url = `${API_URL}/task/${id}/comments`
  const resp = await axios.get(url)

  return responseIsSuccess(resp) ? resp.data : null
}

export const submitComment = async (
  id: string,
  text: string,
): Promise<{ comment: Comment }> => {
  const url = `${API_URL}/task/${id}/comment`
  const resp = await axios.post(url, { text })

  return responseIsSuccess(resp) ? resp.data : null
}
