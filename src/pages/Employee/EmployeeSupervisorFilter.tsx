import { Select } from "@chakra-ui/react";
import { useEmployeeSupervisors, useEmployees } from "../../hooks/useEmployees";
import { useEmployeeStore } from "./employeeStore";
import { ChangeEvent } from "react";

const EmployeeSupervisorFilter = () => {
  const { data: employees } = useEmployees();
  const { data: supervisors } = useEmployeeSupervisors();
  const setSupervisorId = useEmployeeStore((s) => s.setSelectedSupervisorId);

  const handleSupervisorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSupervisorId = employees?.find(
      (emp) => emp.user.full_name === e.target.value
    )?.user.id;
    setSupervisorId(selectedSupervisorId);
  };

  return (
    <>
      <Select
        onChange={handleSupervisorChange}
        ml={4}
        maxW="12rem"
        border="1px solid #000082"
        placeholder="Select A Supervisor"
      >
        {supervisors?.map((sup) => (
          <option key={sup.id}>{sup.full_name}</option>
        ))}
        <option>All</option>
      </Select>
    </>
  );
};

export default EmployeeSupervisorFilter;
