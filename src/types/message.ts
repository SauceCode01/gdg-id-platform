export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: number;
  privateNote?: string;
  done?: boolean;
  doneBy?: string;
};
