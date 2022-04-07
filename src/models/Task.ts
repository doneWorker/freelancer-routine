export type TaskTag = {
  id: string
  name: string
  color: string
}

export type TaskPhase = {
  id: string
  name: string
  description?: string
}

export type TimeSpan = [string, string?]

export type Task = {
  id: string
  name: string
  projectId: string
  description: string
  isCompleted: Boolean
  dateCreated: string
  dateUpdated: string
  dateCompleted?: string
  extLink?: string
  parentId?: string
  timeSpent?: number
  timeSpans?: Array<TimeSpan>
  tags?: Array<TaskTag>
  status?: TaskStatus
}

export type TaskStatus = {
  id: string
  name: string
}
