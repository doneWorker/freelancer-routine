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
  dateCompleted?: string;
  description?: string;
};
