import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Container,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  fullName: string;
  image: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  birth_date: string;
  status: string;
  children: ReactNode;
}

const ApplicantCard = (props: Props) => {
  const blue = "#000050";
  return (
    <Container centerContent>
      <Card
        maxW={{ base: "100%", md: "sm" }}
        bg="skyblue"
        mt={2}
      >
        <CardBody>
          <Image
            boxSize="20rem"
            objectFit="cover"
            src={props.image}
            borderRadius="lg"
          />
          <Stack mt="1" spacing="0.3">
            <Heading size="md">{props.fullName}</Heading>
            <Text color={blue}>Gender: {props.gender}</Text>
            <Text color={blue}>Birth date: {props.birth_date}</Text>
            <Text color={blue}>Age: {props.age}</Text>
            <Text color={blue}>Status: {props.status}</Text>
            <Text color={blue}>Email: {props.email}</Text>
            <Text color={blue}>Phone: {props.phone}</Text>
            {props.children}
          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ApplicantCard;
