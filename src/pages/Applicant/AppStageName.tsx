import { Button, Container, Flex, Select } from "@chakra-ui/react";
import { appStageNames } from "../../utilities/staticData";
import { useApplicationDates } from "../../hooks/useApplicationdate";


const ApplicationStageName = () => {
    const { data: applicationYears } = useApplicationDates();

  const marginTop = 2;
  return (
    <form>
      <Container>
        <Flex>
          <Select mr={2} mt={marginTop}>
            {applicationYears?.map((name) => (
              <option key={name.id} value={name.id}>
                {name.open_date}
              </option>
            ))}
          </Select>

          <Select mr={2} mt={marginTop} placeholder="Stage Name">
            {appStageNames.map((name) => (
              <option key={name.name} value={name.name}>
                {name.name}
              </option>
            ))}
          </Select>
        </Flex>
          <Button mt={marginTop} type="submit" colorScheme="blue">
            Submit
          </Button>
      </Container>
    </form>
  );
};

export default ApplicationStageName;
