'use client';

import AvailabilityItem from '@/components/AvailabilityEditItem';
import { useAvailabilityStore } from '@/store/availability.store';
import { Availability } from '@prisma/client';
import { useShallow } from 'zustand/react/shallow';

export const AvailabilityList = () => {
  const availabilityList = useAvailabilityStore(useShallow((state) => state.availabilityList));

  // useEffect(() => {
  //   if (!checkAvailabilityList) setCheckAvailabilityList(true);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkAvailabilityList]);

  // const { data, isPending } = useQuery({
  //   queryKey: ['availability', username],
  //   enabled: !!username,
  //   queryFn: async () => {
  //     try {
  //       const result = await axios.get('/api/availability', {
  //         params: {
  //           username: username,
  //         },
  //       });
  //       const data = result.data ?? [];
  //       setCheckAvailabilityList(false);
  //       return data;
  //     } catch (err) {
  //       const error = err as Error;
  //       toast.error(`Error Appointments: ${error.message}`);
  //       throw err; // Propagation de l'erreur pour que React Query la prenne en compte
  //     }
  //   },
  // });

  if (!availabilityList) return <p>Chargement des disponibilités en cours...</p>;

  return (
    <ul className="space-y-3">
      {availabilityList.map((availability: Availability) => (
        <AvailabilityItem key={availability.id} availability={availability} />
      ))}
    </ul>
  );
};
