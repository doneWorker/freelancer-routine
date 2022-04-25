/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export enum PaymentType {
  Hourly = 'Hourly',
  Project = 'Project',
  NotSpecify = 'NotSpecify',
}

export type Project = {
  id: string
  name: string
  isCompleted: boolean
  paymentType: PaymentType
  dateCreated: string
  dateUpdated: string
  img?: string
  timeSpent?: number
  tasksTotal?: number
  tasksCompleted?: number
  moneyEarned?: number
  dateCompleted?: string
  description?: string
  hourlyRate?: number
}
