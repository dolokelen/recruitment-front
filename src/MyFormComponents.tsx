import { Box, Button, FormLabel, Input, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface HProps {
  children: ReactNode;
}

export const MyHeading = ({ children }: HProps) => {
  return (
    <Heading className="heading" id="heading">
      {children}
    </Heading>
  );
};

interface IProps {
  label: string;
  type?: string;
  id: string;
  children: ReactNode;
  register: UseFormRegisterReturn;
}

export const MyInput = ({
  label,
  children,
  id,
  type = "text",
  register,
}: IProps) => {
  return (
    <Box id="input-box-id" className="input-box-class">
      <FormLabel>{label}</FormLabel>
      <Input type={type} id={id} className="input-class" {...register} />
      {children}
    </Box>
  );
};

interface BProps {
  children: ReactNode;
  type: "submit" | "button";
  color: string;
}

export const MyButton = ({ children, type, color }: BProps) => {
  return (
    <Button colorScheme={color} type={type} id="btn-id" className="btn-class">
      {children}
    </Button>
  );
};
