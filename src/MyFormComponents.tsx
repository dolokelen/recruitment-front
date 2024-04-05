import { Box, Button, FormLabel, Input, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { red500 } from "./colors";

interface HProps {
  children: ReactNode;
  bg?: string;
  p?: string;
  color?: string;
  my?: number;
}

export const MyHeading = ({
  bg,
  p,
  children,
  my = 4,
  color = "blue.700",
}: HProps) => {
  return (
    <Heading
      fontSize={{ base: "1.2rem", sm: "1.5rem", md: "2rem" }}
      my={my}
      bg={bg}
      p={p}
      color={color}
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
        // size={{ base: "sm", sm: "md" }}
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

interface BasicButtonProps {
  label: string;
  type?: "submit" | "button";
  colorScheme?: string;
  color?: string;
}
export const MyBasicButton = ({
  color,
  label,
  type = "submit",
  colorScheme = "blue",
}: BasicButtonProps) => {
  return (
    <Button
      type={type}
      sx={basicButton}
      colorScheme={colorScheme}
      isActive
      color={color}
    >
      {label}
    </Button>
  );
};

interface ButtonWithIconProps extends BasicButtonProps {}

export const MyButtonWithIcon = ({
  color,
  label,
  type = "submit",
  colorScheme = "blue",
}: ButtonWithIconProps) => {
  return (
    <Button
      type={type}
      sx={btnWithIconSytle}
      colorScheme={colorScheme}
      isActive
      color={color}
    >
      {label}
    </Button>
  );
};
const btnWithIconSytle = {
  w: { base: "86%", sm: "auto" },
};

const basicButton = {
  mt: 2,
  w: { base: "100%", sm: "auto" },
};
