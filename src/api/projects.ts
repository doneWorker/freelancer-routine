import axios from 'axios'

import { Project } from 'models/Project'
import { ListResponse } from './common'

const API_URL = 'http://localhost:5000'

export const fetchProjects = async (): Promise<ListResponse<Project>> => {
  const url = `${API_URL}/projects`
  const resp = await axios.get(url)

  return resp.data
}

export const createProject = async (project: Partial<Project>): Promise<unknown> => {
  const url = `${API_URL}/projects`
  const resp = await axios.post(url, project)

  return resp.data
}
