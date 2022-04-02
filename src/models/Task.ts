export type TimeSpan = [string, string]

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
  timeSpans?: Array<TimeSpan>
}
