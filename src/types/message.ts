

export type Message = {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: number;
  privateNote?: string;
  done?: boolean;
};