import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Form } from '@/lib/Form';
import { getDayName } from '@/lib/getDayName';
import { AvailabilitySchema, AvailabilityType } from '@/schema/availability.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, PenLine } from 'lucide-react';
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

  const { setValue } = form;

  async function handleSubmit(data: AvailabilityType) {
    await onSubmit(data);
    form.reset();
  }

  return (
    <Form
      className="space-y-4"
      form={form}
      onSubmit={async (values) => {
        setValue('dayOfWeek', initialValues.dayOfWeek, { shouldValidate: true });
        await handleSubmit(values);
      }}
    >
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <FormField
            control={form.control}
            name="dayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jour de la semaine</FormLabel>
                <Select disabled value={String(field.value)} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">{getDayName(Number(field.value))}</SelectTrigger>
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
        </div>
        <div className="flex-1 min-w-[150px]">
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
        </div>
        <div className="flex-1 min-w-[150px]">
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
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="ghost" className="w-fit">
            <PenLine className="size-5" />
            Modifier
          </Button>
          {onCancel && (
            <Button type="button" onClick={onCancel} variant="ghost" className="w-fit">
              <Ban className="size-5" />
              Annuler
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
};
