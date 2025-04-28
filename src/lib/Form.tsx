import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type FormProps<T extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> & {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  disabled?: boolean;
};

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  disabled,
  ...props
}: FormProps<T>) => (
  <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
      className={className}
    >
      <fieldset
        disabled={disabled || form.formState.isSubmitting}
        className={className}
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
);
