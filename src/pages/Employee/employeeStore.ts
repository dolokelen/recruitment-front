import { create } from "zustand";

interface EmployeeQuery {
  selectedSupervisorId?: number;
  searchText?: string;
}

interface EmployeeQueryStore {
  employeeQuery: EmployeeQuery;
  setSelectedSupervisorId: (supervisorId?: number) => void;
  setSearchText: (searchText: string) => void;
}

export const useEmployeeStore = create<EmployeeQueryStore>((set) => ({
  employeeQuery: {},
  setSelectedSupervisorId: (supervisorId) =>
    set(() => ({
      employeeQuery: { selectedSupervisorId: supervisorId },
    })),
  setSearchText: (searchText) => set(() => ({ employeeQuery: { searchText } })),
}));
