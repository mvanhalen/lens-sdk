export type StorageSubscription = {
  unsubscribe(): void;
};

export type StorageSubscriber<Data> = (newData: Data | null, oldData: Data | null) => void;

export type StorageProviderSubscriber = StorageSubscriber<string>;

export interface IStorageProvider {
  getItem(key: string): Promise<string | null> | string | null;
  setItem(key: string, value: string): Promise<string> | Promise<void> | void | string;
  removeItem(key: string): Promise<string> | Promise<void> | void;
  subscribe(key: string, subscriber: StorageProviderSubscriber): StorageSubscription;
}

export interface IStorage<Data> {
  set(data: Data): Promise<void>;
  get(): Promise<Data | null>;
  reset(): Promise<void>;
  subscribe(subscriber: StorageSubscriber<Data>): StorageSubscription;
}