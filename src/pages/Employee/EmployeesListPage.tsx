import { Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useEmployees } from "../../hooks/useEmployees";
import MyCard from "./MyCard";
import MySpinner from "../../components/MySpinner";
import { red } from "../../colors";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  EMPLOYEE_DETAIL_ROUTE,
} from "../../cacheKeysAndRoutes";
import SearchBar from "../SearchBar";
import EmployeeSupervisorFilter from "./EmployeeSupervisorFilter";
import { useEmployeeStore } from "./employeeStore";

const EmployeesListPage = () => {
  const navigate = useNavigate();
  const setSearchText = useEmployeeStore((s) => s.setSearchText);
  const { data: employees, isLoading, error } = useEmployees();
  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;

  return (
    <>
      {/* Employees Filter and Search */}
      <Container mt={4} minW="100vw">
        <Flex justifyContent="space-evenly">
          <SearchBar setSearchText={setSearchText} />
          <EmployeeSupervisorFilter />
        </Flex>
      </Container>

      {/* Employees list */}
      <SimpleGrid spacingY={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {employees?.map((emp) => (
          <MyCard
            image={emp.image}
            fullName={emp.user.full_name}
            email={emp.user.email}
            salary={emp.salary}
            phone={emp.contacts[0]?.phone}
            position={emp.position}
            key={emp.user.id}
            onClick={() =>
              navigate(
                `${AUTH_LAYOUT_ROUTE}/${EMPLOYEE_DETAIL_ROUTE}/${emp.user.id}`
              )
            }
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default EmployeesListPage;
