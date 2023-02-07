import { NotificationGroup } from "./Notification";

export type BasePagination = {
  page?: number;
  perPage?: number;
  pagesCount?: number;
};

export type Pagination = {
  id?: number;
  last?: string | number;
  group?: NotificationGroup;
} & BasePagination;

export type BucketPagination = {
  Page: number;
  PerPage: number;
  PagesCount: number;
  Name: string;
  Prefix: string;
};
