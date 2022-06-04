/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export type TaskTag = {
  id: string
  name: string
  color: string
}

export enum TaskPriority {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
  Critical = 'CRITICAL',
}

export type TaskPhase = {
  id: string
  name: string
  description?: string
}

export type TimeSpan = [string, string?]

export type TaskStatus = {
  id: string
  name: string
}

export type Task = {
  id: string
  name: string
  projectId: string
  description: string
  isCompleted: Boolean
  dateCreated: string
  dateUpdated: string
  dueDate?: string
  priority?: TaskPriority
  dateCompleted?: string
  extLink?: string
  parentId?: string
  timeSpent?: number
  timeSpans?: Array<TimeSpan>
  tags?: Array<TaskTag>
  status?: TaskStatus
}
