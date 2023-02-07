export type Notification = {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  readAt: Date;
  userId: string;
};

export type NotificationRep = {
  items: Notification[];
  readCount: number;
  totalCount: number;
  unreadCount: number;
  last?: string;
};

export enum NotificationGroup {
  all = "all",
  read = "read",
  unread = "unread",
}
