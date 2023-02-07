export interface Ticket {
  id: string;
  userId: string;
  status: string;
  topic: string;
  email: string;
  subTopic: string;
  subject: string;
  ticketDetails: string;
  file: string[];
  unreadMessage: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetTicket {
  data: Ticket[];
  pageCount: number;
}
