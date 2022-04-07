import { v4 as uuid } from 'uuid'

import { Task, TaskTag } from './../../models/Task'
import { PaymentType, Project } from '../../models/Project'
import { getRandomColor, getRandomInteger } from '../../helpers/random'

/*
 * Mocks for projects
 */
export const createMockProjects = (total: number = 1): Project[] => {
  const out: Project[] = []

  for (let i = 0; i < total; i++) {
    out.push({
      id: uuid(),
      img: 'link/to/image',
      name: 'first project',
      isCompleted: false,
      tasksCompleted: Math.floor(Math.random() * 25) + 1,
      tasksTotal: 25,
      paymentType: PaymentType.Hourly,
      dateCreated: Date(),
      dateUpdated: Date(),
      dateCompleted: Date(),
      description: '',
    })
  }

  return out
}

/*
 * Mocks for tasks
 */
export const createMockTasks = (
  total: number = 1,
  projectId: string = '0'
): Task[] => {
  const out: Task[] = []

  for (let i = 0; i < total; i++) {
    out.push({
      id: uuid(),
      name: `Task #${i}`,
      projectId,
      description: '',
      isCompleted: false,
      timeSpent: getRandomInteger(1_000, 36_000),
      dateCreated: Date(),
      dateUpdated: Date(),
      dateCompleted: Date(),
    })
  }

  return out
}

/*
 * Mocks for tags
 */
export const createMockTags = (total: number = 1): TaskTag[] => {
  const out: TaskTag[] = []

  for (let i = 0; i < total; i++) {
    out.push({
      id: uuid(),
      name: '',
      color: getRandomColor(),
    })
  }

  return out
}
