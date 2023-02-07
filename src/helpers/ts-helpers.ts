type Flavoring<FlavorT> = { _type?: FlavorT };
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

export type NullAble<T> = T | undefined | null;
