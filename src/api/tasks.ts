import axios from 'axios'

const { API_URL } = process.env

export const getTaskById = async (id: string) => {
  const url = `${API_URL}/task/${id}`
  const res = await axios.get(url)

  return res
}

export const fetchTasksByProjectId = async (id: string) => {
  const url = `${API_URL}/project/${id}/tasks`
  const res = await axios.get(url)

  return res
}

export const completeTask = async (id: string) => {
  const url = `${API_URL}/task/${id}/complete`
  const res = await axios.post(url)

  return res
}
