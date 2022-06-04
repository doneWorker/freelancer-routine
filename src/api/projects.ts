import axios from 'axios'

import { Project } from 'models/Project'
import { API_URL, ListResponse, responseIsSuccess } from './common'

export const fetchProjects = async (): Promise<ListResponse<Project>> => {
  const url = `${API_URL}/projects`
  const resp = await axios.get(url)

  return resp.data
}

export const createProject = async (
  project: Partial<Project>,
): Promise<Project | null> => {
  const url = `${API_URL}/project`
  Reflect.deleteProperty(project, 'paymentType')
  const resp = await axios.post(url, project)

  return responseIsSuccess(resp) ? (resp.data.project as Project) : null
}
