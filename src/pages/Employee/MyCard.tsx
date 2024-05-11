import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Container,
  Text,
} from "@chakra-ui/react";

interface Props {
  fullName: string;
  image: string;
  email: string;
  salary: number;
  phone: string;
  position: string;
}

const MyCard = (props: Props) => {
  const blue = "#000050";
  return (
    <Container centerContent>
      <Card
        maxW={{ base: "100%", md: "sm" }}
        bg="skyblue"
        mt={2}
        _hover={{ cursor: "pointer" }}
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
            <Text color={blue}>{props.position}</Text>
            <Text color={blue}>{`${props.salary.toFixed(2)} $`}</Text>
            <Text color={blue}>{props.email}</Text>
            <Text color={blue}>{props.phone}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default MyCard;
