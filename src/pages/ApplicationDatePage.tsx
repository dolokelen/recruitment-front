import {
  Button,
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { red } from "../colors";
import MySpinner from "../components/MySpinner";
import { useApplicationDates } from "../hooks/useApplicationdate";
import ApplicationDateCreatePage from "./ApplicationDateCreatePage";
import { useState } from "react";

const ApplicationDatePage = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { data, isLoading, error } = useApplicationDates();
  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;
  return (
    <>
      <Container mt={4}>
        <Button
          colorScheme="yellow"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {showDatePicker ? "Hide Dates Form" : "Show Dates Form"}
        </Button>
        {showDatePicker && <ApplicationDateCreatePage />}
      </Container>
      <Container bg="gold" mt={8}>
        <Table>
          <Thead>
            <Tr>
              <Th fontSize="md">Open date</Th>
              <Th fontSize="md">Close date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((data) => (
              <Tr
                key={data.id}
                fontWeight={data.is_current ? "bold" : "normal"}
              >
                <Td>{data.open_date}</Td>
                <Td>{data.close_date}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize=".9rem">Total</Th>
              <Th fontSize=".9rem">{data?.length}</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Container>
    </>
  );
};

export default ApplicationDatePage;
