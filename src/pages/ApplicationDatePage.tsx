import {
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

const ApplicationDatePage = () => {
  const { data, isLoading, error } = useApplicationDates();
  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;
  return (
    <Container bg="gold" mt={4}>
      <Table>
        <Thead>
          <Tr>
            <Th fontSize="md">Open date</Th>
            <Th></Th>
            <Th fontSize="md">Close date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((data) => (
            <Tr key={data.id} fontWeight={data.is_current ? "bold" : "normal"}>
              <Td>
                {data.open_year}/{data.open_month}/{data.open_date}
              </Td>
              <Td></Td>
              <Td>
                {data.close_year}/{data.close_month}/{data.close_date}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th fontSize=".9rem">Total</Th>
            <Th></Th>
            <Th fontSize=".9rem">{data?.length}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Container>
  );
};

export default ApplicationDatePage;
