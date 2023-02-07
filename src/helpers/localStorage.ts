export class LocalStorage {
  static setItem = <T>(key: string, value: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(`exeption while set localStorage item ${e}`);
    }
  };
  static getItem = <T>(key: string): T | null | string => {
    try {
      const possibleValue = window.localStorage.getItem(key);
      if (!possibleValue) {
        return null;
      }
      return JSON.parse(possibleValue) as T;
    } catch (e) {
      console.log(`exeption while get localStorage item ${e}`);
      return null;
    }
  };

  static deleteItem = (key: string): void => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.log(`exeption while delete localStorage item ${e}`);
    }
  };
}
