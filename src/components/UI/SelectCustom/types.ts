export interface SelectItem {
  name: string;
  id: number;
}

export interface ISelectCustom {
  dropdowns: SelectItem[];
  onSelect: (item: SelectItem) => void;
  label: string;
  value: SelectItem,
  isError: boolean,
  isSuccess: boolean,
  error: string
}