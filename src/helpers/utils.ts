export const filterNullable = <T>(items: T[]) => {
  return items.filter((x): x is Exclude<T, null | undefined> => x !== undefined && x !== null);
};

export const changeArrayElementByIdx = <T, U>(idx: number, payload: T, array: U[]) => {
  return [...array.slice(0, idx), payload, ...array.slice(idx + 1)];
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mergeObjectInArray = <T extends Record<string, any>, U extends T>(
  element: T,
  array: U[],
  criteria: keyof T
) => {
  const idx = array.findIndex((el) => el[criteria] === element[criteria]);
  if (idx === -1) {
    return array;
  }
  return [...array.slice(0, idx), { ...array[idx], ...element }, ...array.slice(idx + 1)];
};

export const voidCb = () => {};
