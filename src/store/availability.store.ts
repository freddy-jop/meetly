import { Availability } from '@prisma/client';
import { create } from 'zustand';

export type AvailabilityType = {
  checkAvailabilityList: boolean;
  setCheckAvailabilityList: (checkAvailability: boolean) => void;
  availabilityList: Array<Availability> | [];
  setAvailabilityList: (currentAvailability: Array<Availability>) => void;
  updateAvailabilityList: (availabilityUpdated: Array<Availability>) => void;
  disabledDays: number[];
};

export const useAvailabilityStore = create<AvailabilityType>((set) => ({
  checkAvailabilityList: true,
  setCheckAvailabilityList: (checkAvailability: boolean) => set({ checkAvailabilityList: checkAvailability }),
  availabilityList: [],
  setAvailabilityList: (currentAvailability: Array<Availability>) =>
    set((state) => ({
      availabilityList: state.availabilityList
        ? [...currentAvailability, ...state.availabilityList]
        : [...currentAvailability],
    })),
  updateAvailabilityList: (availabilityUpdated: Array<Availability>) =>
    set((state) => ({
      availabilityList: state.availabilityList
        ? [
            ...availabilityUpdated,
            ...state.availabilityList?.filter((availability) => availability.id !== availabilityUpdated[0].id),
          ]
        : [...availabilityUpdated],
    })),
  disabledDays: [],
}));

export const setAvailabilitiesAndDisabledDays = (currentAvailability: Array<Availability>) => {
  useAvailabilityStore.setState((state) => ({
    availabilityList: state.availabilityList
      ? [...currentAvailability, ...state.availabilityList]
      : [...currentAvailability],
    disabledDays: state.availabilityList
      ? [...currentAvailability, ...state.availabilityList].map((a) => a.dayOfWeek)
      : [...currentAvailability].map((a) => a.dayOfWeek),
  }));
};

export const updateAvailabilitiesAndDisabledDays = (availabilityUpdated: Array<Availability>) => {
  useAvailabilityStore.setState((state) => ({
    availabilityList: state.availabilityList
      ? [
          ...availabilityUpdated,
          ...state.availabilityList?.filter((availability) => availability.id !== availabilityUpdated[0].id),
        ]
      : [...availabilityUpdated],
    disabledDays: state.availabilityList
      ? [
          ...availabilityUpdated,
          ...state.availabilityList?.filter((availability) => availability.id !== availabilityUpdated[0].id),
        ].map((a) => a.dayOfWeek)
      : [...availabilityUpdated].map((a) => a.dayOfWeek),
  }));
};

export const deleteAvailabilitiesAndDisabledDays = (availabilityToDeleted: Array<Availability>) => {
  useAvailabilityStore.setState((state) => ({
    availabilityList: state.availabilityList
      ? [...state.availabilityList?.filter((availability) => availability.id !== availabilityToDeleted[0].id)]
      : [...availabilityToDeleted],
    disabledDays: state.availabilityList
      ? [...state.availabilityList?.filter((availability) => availability.id !== availabilityToDeleted[0].id)].map(
          (a) => a.dayOfWeek,
        )
      : [...availabilityToDeleted].map((a) => a.dayOfWeek),
  }));
};
