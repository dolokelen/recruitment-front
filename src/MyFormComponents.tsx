import { Box, Button, FormLabel, Input, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { red500 } from "./colors";

interface HProps {
  children: ReactNode;
}

export const MyHeading = ({ children }: HProps) => {
  return (
    <Heading
      fontSize={{ base: "1.2rem", sm: "1.5rem", md: "2rem" }}
      my={4}
      color="blue.700"
    >
      {children}
    </Heading>
  );
};

interface IProps {
  label: string;
  type?: string;
  w?: string;
  children?: ReactNode;
  errorMessage: string | undefined;
  register: UseFormRegisterReturn;
}

export const MyInput = ({
  label,
  type = "text",
  children,
  errorMessage,
  register,
  w,
}: IProps) => {
  return (
    <Box mb={4} w={w}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        size={{ base: "sm", sm: "md" }}
        borderRadius={{ base: 8 }}
        border="1px solid skyblue"
        {...register}
      />
      {errorMessage && <Text color={red500}>{errorMessage}</Text>}
      {children}
    </Box>
  );
};

interface BProps {
  children: ReactNode;
  type: "submit" | "button";
  colorScheme: string;
  w?: string;
}

export const MyButton = ({
  children,
  type,
  colorScheme,
  w = "100%",
}: BProps) => {
  return (
    <Button
      colorScheme={colorScheme}
      type={type}
      size={{ base: "sm", sm: "md" }}
      fontWeight="bold"
      w={w}
      mb={4}
    >
      {children}
    </Button>
  );
};
