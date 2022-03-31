export enum PaymentType {
  Hourly,
  Project,
}

export type Project = {
  id: string;
  name: string;
  isCompleted: boolean;
  paymentType: PaymentType;
  dateCreated: string;
  dateUpdated: string;
  img?: string;
  timeSpent?: number;
  tasksTotal?: number;
  tasksCompleted?: number;
  moneyEarned?: number;
  dateCompleted?: string;
  description?: string;
  hourlyRate?: number;
};
