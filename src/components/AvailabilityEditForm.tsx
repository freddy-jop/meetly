import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Form } from '@/lib/Form';
import { getDayName } from '@/lib/getDayName';
import { AvailabilitySchema, AvailabilityType } from '@/schema/availability.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type AvailabilityEditFormType = {
  initialValues: AvailabilityType;
  onSubmit: (data: AvailabilityType) => void;
  onCancel?: () => void;
};
export const AvailabilityEditForm = ({ initialValues, onSubmit, onCancel }: AvailabilityEditFormType) => {
  const form = useForm<AvailabilityType>({
    resolver: zodResolver(AvailabilitySchema),
    defaultValues: initialValues,
  });
  console.log('initialValues :::: ', initialValues);

  const { setValue } = form;

  async function handleSubmit(data: AvailabilityType) {
    await onSubmit(data);
    form.reset();
  }

  return (
    <Form
      className="grid grid-cols-3 gap-4 items-end"
      form={form}
      onSubmit={async (values) => {
        setValue('dayOfWeek', initialValues.dayOfWeek, { shouldValidate: true });
        await handleSubmit(values);
      }}
    >
      <FormField
        control={form.control}
        name="dayOfWeek"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Jour de la semaine</FormLabel>
            <Select disabled value={String(field.value)} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  {/* Affiche le jour correspondant à la valeur */}
                  {getDayName(Number(field.value))}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Array.from({ length: 7 }).map((_, index) => (
                  <SelectItem key={index} value={String(index)}>
                    {getDayName(index)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heure de début</FormLabel>
            <FormControl>
              <Input placeholder="09:00" {...field} type="time" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heure de fin</FormLabel>
            <FormControl>
              <Input placeholder="10:00" {...field} type="time" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="col-span-3">
        {' '}
        {initialValues ? 'Modifier' : 'Ajouter'}{' '}
      </Button>
      {onCancel && (
        <Button type="button" onClick={onCancel} variant="ghost" className="col-span-3">
          Annuler
        </Button>
      )}
    </Form>
  );
};
