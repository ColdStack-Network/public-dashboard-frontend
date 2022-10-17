export interface SelectItemPagination {
  name: number;
  id: number;
}

export interface ISelectCustom {
  dropdowns: SelectItemPagination[];
  onSelect: (item: SelectItemPagination) => void;
  label: string;
  value: SelectItemPagination,
}