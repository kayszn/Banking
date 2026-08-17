import { Control, Controller, FieldPath } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

import * as z from "zod";
import { AuthFormSchema } from "@/lib/utils";

const formSchema = AuthFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="form-item">
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={name} className="form-label">
              {label}
            </FieldLabel>
            <div className="flex w-full flex-col">
              <Input
                id={name}
                placeholder={placeholder}
                className="input-class"
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </div>

            {fieldState.error && (
              <FieldError
                errors={[fieldState.error]}
                className="form-message mt-2"
              />
            )}
          </Field>
        </div>
      )}
    />
  );
};

export default CustomInput;
