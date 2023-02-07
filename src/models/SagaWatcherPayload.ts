export type SagaWatcherPayload<T> = {
  type: string;
  payload: T;
};
