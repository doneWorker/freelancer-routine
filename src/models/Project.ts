export enum PaymentType {
    Hourly,
    Project
}

export type Project = {
  id: string;
  img: string;
  name: string;
  isCompleted: boolean;
  paymentType: PaymentType;
  dateCreated: Date;
  dateUpdated: Date;
  dateCompleted?: Date;
  description?: string;
};
