import { TextInput } from "components/TextInput/TextInput";
import { Control, Controller, Path } from "react-hook-form";

type Controlled<T> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  labelExtraContent?: JSX.Element;
  className?: string;
  inputSign?: string;
};
export const getError = (formState: { errors: Record<string, any> }, name: string) => {
  const tokens = name.split(".");

  let value = formState.errors;
  for (const token of tokens) {
    if (value[token]) value = value[token];
  }

  return value && value.message ? (value.message as string) : undefined;
};

export function ControlledText<T>(props: Controlled<T> & { type?: "text" | "number" | "password" }) {
  const {
    control,
    name,
    label,
    required,
    placeholder,
    type = "text",
    disabled,
    labelExtraContent,
    className,
    inputSign,
  } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, formState }) => {
        const change = (val: string) => {
          if (type === "number") return onChange(parseFloat(val));
          return onChange(val);
        };

        return (
          <TextInput
            labelExtraContent={labelExtraContent}
            label={label}
            placeholder={placeholder}
            type={type}
            value={(value as string)?.toString()}
            onChange={change}
            error={getError(formState, name)}
            required={required}
            className={className}
            disabled={disabled}
            inputSign={inputSign}
          />
        );
      }}
    />
  );
}
