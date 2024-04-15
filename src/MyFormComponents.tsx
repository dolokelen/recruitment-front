import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { red500 } from "./colors";

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
      <FormLabel fontSize={20} color="gray.400">
        {label}
      </FormLabel>
      <Input
        type={type}
        borderRadius={{ base: 8 }}
        border="1px solid skyblue"
        {...register}
      />
      {errorMessage && <Text color={red500}>{errorMessage}</Text>}
      {children}
    </Box>
  );
};

interface MyButtonProps {
  label: string;
  type?: "submit" | "button";
  colorScheme?: string;
  color?: string;
}
export const MyButton = ({
  color,
  label,
  type = "submit",
  colorScheme = "blue",
}: MyButtonProps) => {
  return (
    <Button
      type={type}
      sx={myButtonStyles}
      colorScheme={colorScheme}
      isActive
      color={color}
    >
      {label}
    </Button>
  );
};

interface ButtonWithIconProps extends MyButtonProps {}

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

const myButtonStyles = {
  mt: 2,
  w: { base: "100%", sm: "auto" },
};
