import {
    Card,
    CardBody,
    Stack,
    Heading,
    Container,
    Text,
  } from "@chakra-ui/react";
  import { ReactNode } from "react";
  
  interface Props {
    stageName: string;
    status: string;
    applicationDate: string | undefined;
    applicantId: string;
    children: ReactNode;
  }
  
  const ApplicantScreeningCard = (props: Props) => {
    //Examiners don't need to know the appliants for transparency.
    const blue = "#000050";
    return (
      <Container centerContent>
        <Card
          maxW={{ base: "100%", md: "sm" }}
          bg="skyblue"
          mt={2}
        >
            <CardBody pt={0} pb={1}>
            <Stack spacing="0.3">
              <Heading mb={2} color='green' fontSize='1.7rem'>{props.stageName} Stage</Heading>
              <Text sx={frontSize} color={blue}>Batch: {props.applicationDate}</Text>
              <Text sx={frontSize} color={blue}>Application Code: {props.applicantId}</Text>
              <Text sx={frontSize} color={blue}>Status: {props.status}</Text>
              {props.children}
            </Stack>
          </CardBody>
        </Card>
      </Container>
    );
  };

  const frontSize = {
    fontSize: { base: ".5rem", sm: "1.2rem" },
  }
  
  export default ApplicantScreeningCard;
  