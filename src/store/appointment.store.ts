import { create } from 'zustand';

export type AppointmentType = {
  checkAppointmentList: boolean;
  setCheckAppointmentList: (checkAppointmentType: boolean) => void;
};

export const useAppointmentStore = create<AppointmentType>((set) => ({
  checkAppointmentList: true,
  setCheckAppointmentList: (checkAppointmentType: boolean) => set({ checkAppointmentList: checkAppointmentType }),
}));
