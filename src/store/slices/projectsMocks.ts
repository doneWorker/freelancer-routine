import { PaymentType, Project } from '../../models/Project'

export const createMockProjects = (total: number = 1): Project[] => {
  const out: Project[] = []

  for (let i = 0; i < total; i++) {
    out.push({
      id: Math.random().toString(),
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
