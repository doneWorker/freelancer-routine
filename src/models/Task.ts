export type TimeSpan = [string, string]

export type TaskTag = {
  name: string
  color: string
}

export type Task = {
  id: string
  name: string
  projectId: string
  description: string
  isCompleted: Boolean
  dateCreated: string
  dateUpdated: string
  dateCompleted: string
  parentId?: string
  timeSpent?: number
  timeSpans?: Array<TimeSpan>
  tags?: Array<TaskTag>
}
