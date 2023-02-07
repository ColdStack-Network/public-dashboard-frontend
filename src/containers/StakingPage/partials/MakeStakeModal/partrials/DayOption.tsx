import styles from "./DayOption.module.scss";
import { Control, Controller, Path } from "react-hook-form";
import clsx from "clsx";

type DayOptionProps<T> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
  optionValue: number;
};
export function DayOption<T>(props: DayOptionProps<T>) {
  const { control, name, label, className, optionValue } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const isActive = optionValue === value;
        return (
          <div
            onClick={() => onChange(optionValue)}
            className={clsx(styles.option, className, isActive && styles.optionActive)}
          >
            {label}
          </div>
        );
      }}
    />
  );
}
